pragma solidity ^0.4.17;

contract Coin {
    mapping(bytes32 => uint) private coinStructs; 
    bytes32[] private coinIndex;  

    event LogNewCoin (uint indexed coinId, bytes32  coinName);
    event LogUpdateCoin (uint indexed coinId, bytes32  coinName);
    event LogDeleteCoin (uint indexed coinId, bytes32  coinName);

    constructor() public {  
        insertCoin("No Coin"); // Adds a nonsensical entry so tests can be checked  > 0
        insertCoin("AncientCoin a");
        insertCoin("AncientCoin b"); 
    } 

    function bytes32ToStr(bytes32 _bytes32) public pure returns (string){
        bytes memory bytesArray = new bytes(32);
        for (uint256 i; i < 32; i++) {
            bytesArray[i] = _bytes32[i];        
        }
        return string(bytesArray); 
    }

        // Coin Functions
    function isCoin(bytes32 _coinName) public view returns(bool isIndeed)
    {
        if(coinIndex.length == 0) return false;
        return ( coinStructs[_coinName] > 0 );
    }


    function isCoinId(uint _index) public view returns(bool isIndeed)
    {
        if(coinIndex.length == 0) return false;
        return (coinIndex[_index] != "");
    }


    function getCoin(uint index) public view returns (string coinName) {
        return bytes32ToStr(coinIndex[index]);
    }


    function getCoinId(bytes32 _coinName) public view returns(uint coinId) {
        require (isCoin(_coinName),"Coin Name does not exist.");
        return coinStructs[_coinName];
    }


    function getCoinCount() public view returns(uint count) {
        return coinIndex.length;
    }  


    function insertCoin(bytes32 _coinName) public returns(uint index)  {     
        require(!isCoin(_coinName),"Coin already exists.");                  
        uint indexno = coinIndex.push(_coinName)-1;
        emit LogNewCoin(indexno,_coinName);
        return indexno; 
    } 

    /*
    function deleteCoin(bytes32 _coinName) public returns(uint index) {
        require(isCoin(_coinName),"Coin to be deleted does not exist.");  
        // add : should not be allowed to delete a coin if it has an entry in the products struct and quantity > 0 or activestatus = true .
        // will expect UI / JS to handle that limitation.
        // would need to be deleted from products struct first
        // can advise to set it to 'inactive' inside productStructs.activestatus and quantity set to 0
        require(_coinName != "Initializing coin","Not allowed to delete 'Initializing Coin'");
        uint rowToDelete = getCoinId(_coinName);
        string storage keyToMove = coinIndex[coinIndex.length-1];
        coinIndex[rowToDelete] = keyToMove;       
        coinIndex.length--;
        emit LogDeleteCoin(rowToDelete,_coinName);
        emit LogUpdateCoin(rowToDelete,keyToMove);
        return rowToDelete;
    }   
    */   

 

}