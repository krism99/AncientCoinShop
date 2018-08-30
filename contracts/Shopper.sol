pragma solidity ^0.4.17;

import { MaintLibrary } from "./MaintLibrary.sol";

/* @title Shopper*/
contract Shopper{
    // Model a generic table structure
    struct TableStruct2 {
        bytes32 Name;
        uint index; 
    } 

    mapping(address =>  TableStruct2) public shopperStructs; 
    address[] public shopperIndex;
    address owner = msg.sender; 

    event LogNewShopper (address indexed shopperAddress, uint index);
    event LogUpdateShopper (address indexed shopperAddress, uint index);
    event LogDeleteShopper (address indexed  shopperAddress, uint index ); 
    event LogBuy(address indexed buyer,address seller, uint productid, uint quant, uint value);

    //modifier checkowner() { 
    //    require(msg.sender == owner);  
    //    _;
    //}

    //Constructor
    constructor() public { 
        insertShopper(msg.sender);
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

    // Shopper Functions 
    /* @title  getShopperIndexLength        */
    function getShopperIndexLength() public view returns (uint) {
        return  shopperIndex.length;
    }
    /* @title  isShopper         */
    function isShopper(address _shopperAddress) public view returns(bool)
    {
        if(shopperIndex.length == 0) return false;
        return (shopperIndex[shopperStructs[_shopperAddress].index] == _shopperAddress);
    }
    /* @title insertShopper         */
    function insertShopper(address _shopperAddress ) public returns(uint )  {       
        require(!isShopper(_shopperAddress),"Shopper already exists.");
       
        shopperStructs[_shopperAddress].index = shopperIndex.push(_shopperAddress)-1;
        emit LogNewShopper(_shopperAddress, shopperStructs[_shopperAddress].index);
        return  shopperStructs[_shopperAddress].index; 
    } 
 
     /* @title   getShopperAtIndex       */
    function getShopperAtIndex(uint index) public view returns (address) {
        return shopperIndex[index];
    }
    /* @title  getShopperid        */
    function getShopperid(address _shopperAddress) public view returns (uint) {
        return shopperStructs[_shopperAddress].index;
    }
    /* @title updateShopperName         */
    function updateShopperName(address _shopperAddress) public returns(bool success) {
        require(isShopper(_shopperAddress),"Shopper to be updated does not exist.");
        emit LogUpdateShopper(_shopperAddress,shopperStructs[_shopperAddress].index);
        return true;
    }

// make note in documentation, using 'transfer' method as a security implementation
// if time : would be better security consideration if the seller could 'pull' money from buyer..need to read up how this is done.
// need to 'vet' if the transfer is allowable (who could call it ?) how does the owner thing work ?
// do checks in js, or better here ?  Owner=here, but perhaps referential integrity handled in js.
// removed checkowner, doesn't make sense
    /* @title  Transfer      */
    function Transfer(address _toseller,uint _productid, uint _quant)   public  payable  returns (bool) {
        uint amounttotransfer = msg.value;
        _toseller.transfer(msg.value); 
        //  event
        emit LogBuy(msg.sender,_toseller,_productid,_quant, amounttotransfer);          
        return true;
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