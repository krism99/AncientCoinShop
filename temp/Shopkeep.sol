pragma solidity ^0.4.17;

contract Shopkeep {
    // Model a generic table structure
    struct TableStruct {
        string Name;
        uint index;
    }

    mapping(address => TableStruct) public shopkeepStructs;
    address[] public shopkeepIndex;

    event LogNewShopkeep (address indexed shopkeepAddress, uint index, string Name );
    event LogUpdateShopkeep (address indexed shopkeepAddress, uint index, string Name );
    event LogDeleteShopkeep (address indexed shopkeepAddress, uint index );

    address shopkeep0 = 0xe2a1fA5EeCa808e571Ca0A76b1F779969174f735; 
    address shopkeep1 = 0x222850D88318378b2A7e6bcfC3C2A1F70ec7eB03; 
    address shopkeep2 = 0xF4ca86276BDc5a151A368B6628f55B702888D816;

    //Constructor
    constructor() public {          
        insertShopkeep(shopkeep0,"ShopKeep 0"); // Nonsensical entry to test values against.
        insertShopkeep(shopkeep1,"ShopKeep 1");
        insertShopkeep(shopkeep2,"ShopKeep 2");

    }

    // Shopkeep functions  

    function isShopKeep(address _shopkeepAddress) public view returns(bool isIndeed)
    {
        if(shopkeepIndex.length == 0) return false;
        return (shopkeepIndex[shopkeepStructs[_shopkeepAddress].index] == _shopkeepAddress);
    }      

    function insertShopkeep(address _shopkeepAddress, string _name) public returns(uint index)  {       
        require(!isShopKeep(_shopkeepAddress),"Shopkeep already exists.");
        shopkeepStructs[_shopkeepAddress].Name = _name;
        shopkeepStructs[_shopkeepAddress].index = shopkeepIndex.push(_shopkeepAddress)-1;
        emit LogNewShopkeep(_shopkeepAddress, shopkeepStructs[_shopkeepAddress].index,_name);
        return shopkeepIndex.length-1; 
    }

    function deleteShopkeep(address _shopkeepAddress) public returns(uint index) {
        require(isShopKeep(_shopkeepAddress),"Shopkeep to be deleted does not exist.");       
        uint rowToDelete = shopkeepStructs[_shopkeepAddress].index;
        address keyToMove = shopkeepIndex[shopkeepIndex.length-1];
        shopkeepIndex[rowToDelete] = keyToMove;
        shopkeepStructs[keyToMove].index = rowToDelete;
        shopkeepIndex.length--;
        emit LogDeleteShopkeep(_shopkeepAddress,rowToDelete);
        emit LogUpdateShopkeep(keyToMove,rowToDelete,shopkeepStructs[keyToMove].Name);
        return rowToDelete;
    }

    function getShopkeepAtIndex(uint index) public view returns (address shopkeepAddress) {
        return shopkeepIndex[index];
    }

    function getShopkeep(address _shopkeepAddress) public  view returns (string shopkeepName, uint index) {
        require(isShopKeep(_shopkeepAddress),"Shopkeep does not exist.");   
        return (shopkeepStructs[_shopkeepAddress].Name, shopkeepStructs[_shopkeepAddress].index);        
    }

    function updateShopkeepName(address _shopkeepAddress, string _name) public returns(bool success) {
        require(isShopKeep(_shopkeepAddress),"Shopkeep to be updated does not exist.");
        shopkeepStructs[_shopkeepAddress].Name = _name;
        emit LogUpdateShopkeep(_shopkeepAddress,shopkeepStructs[_shopkeepAddress].index,_name);
        return true;
    }

    function getShopkeepCount() public view returns(uint count) {
        return shopkeepIndex.length;
    } 
}
