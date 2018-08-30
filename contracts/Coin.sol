pragma solidity ^0.4.17;

import { MaintLibrary } from "./MaintLibrary.sol";
/* @title Coin*/
contract Coin  {

    mapping(bytes32 => uint) public coinStructs; 
    bytes32[] public coinIndex;  
    mapping(uint => bool) public coinExists;
    address owner = msg.sender; 

    event LogNewCoin (uint indexed coinId, bytes32  coinName);
    event LogUpdateCoin (uint indexed coinId, bytes32  coinName);
    event LogDeleteCoin (uint indexed coinId, bytes32  coinName);
    event debug(uint lineno);

    constructor() public {  
        insertCoin("No Coin"); // Adds a nonsensical entry so tests can be checked  > 0
        insertCoin("Bronze Coin");
        insertCoin("Silver Coin");
        insertCoin("Gold Coin");
    } 

    /* @title kill*/
    /* @dev kills contract      
    */  
    // Kill contract function
    function kill() public { 
        if(msg.sender == owner) {
            selfdestruct(owner); 
        }
    }

    /* @title  getCoinIndexLength        */
    /* @dev returns Coin Index length 
    @return uint
    */
    function getCoinIndexLength() public view returns (uint) {
        return coinIndex.length;
    }


    /* @title    isCoin      */
    /* @dev check if coin exists via coinname
    @param _coinName
    @return bool    
    */  
    function isCoin(bytes32 _coinName) public view returns(bool )
    {
        if(coinIndex.length == 0) return false;
        return ( coinStructs[_coinName] != 0 );
    } 

    /* @title  insertCoin       */
    /* @dev inserts coin details
    @param _coinName
    @return uint
    */
    function insertCoin(bytes32 _coinName) public returns(uint )  {     
        require(!isCoin(_coinName),"Coin already exists.");  
       // emit debug(34);              
        uint indexno = coinIndex.push(_coinName)-1;
       // emit debug(36);
        coinStructs[_coinName] = indexno;
       // emit debug(38);
        coinExists[indexno] = true;
       // emit debug(40);
        emit LogNewCoin(indexno,_coinName);
      //  emit debug(42);
        return indexno; 
    } 

    /* @title   isCoinId       */
    /* @dev checks if coinId exists
    @param _index
    @return bool
    */
    function isCoinId(uint _index) public view returns(bool)
    {
        if(coinIndex.length == 0) return false;
        return (coinExists[_index]);
    }

    /* @title   getCoinNameAtIndex       */
    /* @dev gets coin name via index
    @param index    
    @return string
    */
    function getCoinNameAtIndex(uint index) public view returns (string) {
        return MaintLibrary.bytes32ToStr(coinIndex[index]);
    }

    /* @title   gets coin id        */
    /* @dev _coinname   
    @return uint
    */
    function getCoinid(bytes32 _coinname) public view returns (uint) {
        return (coinStructs[_coinname]);
    }

    /* @title  deleteCoin        */
    /* @dev deletes coin details
    @param _coinName
    @return index
    */
    function deleteCoin(bytes32 _coinName) public returns(uint index) {
        require(isCoin(_coinName),"Coin to be deleted does not exist.");  
        // logical checks expected to be handled by UI (check if it exists as part of product before deletion)
        require(_coinName != "No Coin","Not allowed to delete 'Initial Coin'");
        uint rowToDelete = coinStructs[_coinName];
        bytes32 lastkeyToMove = coinIndex[coinIndex.length-1];       
        coinExists[coinIndex.length-1] = false;        
        coinIndex[rowToDelete] = lastkeyToMove;       
        coinIndex.length--;        
        emit LogDeleteCoin(rowToDelete,_coinName);
        emit LogUpdateCoin(rowToDelete,lastkeyToMove);
        return rowToDelete;
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



    
