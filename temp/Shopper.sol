pragma solidity ^0.4.17;


contract Shopper{
    // Model a generic table structure
    struct TableStruct {
        string Name;
        uint index; 
    } 

    mapping(address =>  TableStruct) public shopperStructs; 
    address[] public shopperIndex;

    event LogNewShopper (address indexed shopperAddress, uint index, string Name);
    event LogUpdateShopper (address indexed shopperAddress, uint index, string Name);
    event LogDeleteShopper (address indexed  shopperAddress, uint index ); 

    address shopper1 = 0x25677eC6A26c4112E5c77f4dBE5aFA3Bd9ba69AB;
    address shopper2 = 0xED58931ec4596250C40165FB6d2e8EdF3E297B32;

    //Constructor
    constructor() public { 
        insertShopper(shopper1,"Shopper 1");
        insertShopper(shopper2,"Shopper 2"); 
    }

    // Shopper Functions 

    function isShopper(address _shopperAddress) public view returns(bool isIndeed)
    {
        if(shopperIndex.length == 0) return false;
        return (shopperIndex[shopperStructs[_shopperAddress].index] == _shopperAddress);
    }

    function insertShopper(address _shopperAddress, string _name ) public returns(uint index)  {       
        require(!isShopper(_shopperAddress),"Shopper already exists.");
        shopperStructs[_shopperAddress].Name = _name;
        shopperStructs[_shopperAddress].index = shopperIndex.push(_shopperAddress)-1;
        emit LogNewShopper(_shopperAddress, shopperStructs[_shopperAddress].index,_name);
        return shopperIndex.length-1; 
    } 


    function deleteShopper(address _shopperAddress) public returns(uint index) {
        require(isShopper(_shopperAddress),"Shopper to be deleted does not exist.");       
        uint rowToDelete = shopperStructs[_shopperAddress].index;
        address keyToMove = shopperIndex[shopperIndex.length-1];
        shopperIndex[rowToDelete] = keyToMove;
        shopperStructs[keyToMove].index = rowToDelete;
        shopperIndex.length--;
        emit LogDeleteShopper(_shopperAddress,rowToDelete);
        emit LogUpdateShopper(keyToMove,rowToDelete,shopperStructs[keyToMove].Name);
        return rowToDelete;
    }    

    function getShopperAtIndex(uint index) public view returns (address shopperAddress) {
        return shopperIndex[index];
    }

    function getShopper(address _shopperAddress) public  view returns (string shopperName, uint index) {
        require(isShopper(_shopperAddress),"Shopper does not exist.");   
        return (shopperStructs[_shopperAddress].Name, shopperStructs[_shopperAddress].index);        
    }    

    function updateShopperName(address _shopperAddress, string _name) public returns(bool success) {
        require(isShopper(_shopperAddress),"Shopper to be updated does not exist.");
        shopperStructs[_shopperAddress].Name = _name;
        emit LogUpdateShopper(_shopperAddress,shopperStructs[_shopperAddress].index,_name);
        return true;
    }

    function getShopperCount() public view returns(uint count) {
        return shopperIndex.length;
    }
}