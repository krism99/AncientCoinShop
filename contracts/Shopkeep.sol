pragma solidity ^0.4.17;

import { MaintLibrary } from "./MaintLibrary.sol";
/* @title Shopkeep*/
contract Shopkeep {

    struct TableStruct1 {
        bytes32 Name;
        uint index;
    }

    mapping(address => TableStruct1) public shopkeepStructs;
    address[] public shopkeepIndex;
    address owner = msg.sender; 


    event LogNewShopkeep (address indexed shopkeepAddress, uint index, bytes32 Name );
    event LogUpdateShopkeep (address indexed shopkeepAddress, uint index, bytes32 Name );
    event LogDeleteShopkeep (address indexed shopkeepAddress);
 
    //Constructor
    constructor() public {  
        insertShopkeep(msg.sender,"ShopKeep 0"); // Nonsensical entry to test values against.
        insertShopkeep(0xEAf418b2f021C73F77b7506639220a46F65bd7F0,"Shopkeep 1");

    }

    // Kill contract function
    /* @title kill*/
    /* @dev kills contract      
    */  
    function kill() public { 
        if(msg.sender == owner) {
            selfdestruct(owner); 
        }
    }

    // Shopkeep functions  
    /* @title    getShopkeepIndexLength      */
    function getShopkeepIndexLength() public view returns (uint) {
        return  shopkeepIndex.length;
    }

    /* @title   getShopKeepNameAddr       */
    function getShopKeepNameAddr(uint _id) public view returns (string _thisname, address _thisaddress) {
        return (getShopkeepNameAtIndex(_id),getShopkeepAtIndex(_id));       
    }

    /* @title   isShopKeep       */
    function isShopKeep(address _shopkeepAddress) public view returns (bool isIndeed)
    {
        if(shopkeepIndex.length == 0) return false;
        return (shopkeepIndex[shopkeepStructs[_shopkeepAddress].index] == _shopkeepAddress);
    }   

    /* @title   insertShopkeep       */
    function insertShopkeep(address _shopkeepAddress, bytes32 _name) public returns(uint newindex)  {       
        require(!isShopKeep(_shopkeepAddress),"Shopkeep already exists.");
        shopkeepStructs[_shopkeepAddress].Name = _name;
        newindex = shopkeepIndex.push(_shopkeepAddress)-1;
        shopkeepStructs[_shopkeepAddress].index = newindex;
        emit LogNewShopkeep(_shopkeepAddress,newindex,_name);         
        return newindex; 
    }

    /* @title    deleteShopkeep      */
    function deleteShopkeep(address _shopkeepAddress) public returns(uint _index) {
        require(isShopKeep(_shopkeepAddress),"Shopkeep to be deleted does not exist.");  
        uint rowToDelete = shopkeepStructs[_shopkeepAddress].index;
        address keyToMove = shopkeepIndex[shopkeepIndex.length-1];
        shopkeepIndex[rowToDelete] = keyToMove;
        shopkeepStructs[keyToMove].index = rowToDelete;
        shopkeepIndex.length--;      
        emit LogDeleteShopkeep(_shopkeepAddress);      
        emit LogUpdateShopkeep(keyToMove,rowToDelete,shopkeepStructs[keyToMove].Name);
        return rowToDelete;
    }

    /* @title  updateShopkeepName        */
    function updateShopkeepName(address _shopkeepAddress, bytes32 _name) public returns(bool success) {
        require(isShopKeep(_shopkeepAddress),"Shopkeep to be updated does not exist.");      
        shopkeepStructs[_shopkeepAddress].Name = _name;
        emit LogUpdateShopkeep(_shopkeepAddress,shopkeepStructs[_shopkeepAddress].index,_name);
        return success;
    } 

    /* @title   getShopkeepNameAtIndex       */
    function getShopkeepNameAtIndex(uint _index) public view returns (string) {
        return  MaintLibrary.bytes32ToStr(shopkeepStructs[shopkeepIndex[_index]].Name);
    }

    /* @title  getShopkeepAtIndex        */
    function getShopkeepAtIndex(uint _index) public view returns (address) {
        return  shopkeepIndex[_index];        
    }

    /* @title   getShopkeepIdatAddr       */
    function getShopkeepIdatAddr(address _shopkeepaddr) public view returns (uint) {      
        return  shopkeepStructs[_shopkeepaddr].index;       
    }

    // Fallback function - Called if other functions don't match call or
    // sent ether without data
    // Typically, called when invalid data is sent
    // Added so ether sent to this contract is reverted if the contract fails
    // otherwise, the sender's money is transferred to contract

    /* @title Fallback*/    
    /* @dev fallback function if contract called with no function to force it to revert.
        @return revert
    */     
    function () public {
        revert("Contract failure");
    }
}
