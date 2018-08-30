pragma solidity ^0.4.17;

contract Shop {
    struct ShopStruct {
        string Name;
        uint index;
        uint Shopownerid;
        bool ActiveStatus;
    } 

    mapping(address => ShopStruct) public shopStructs;
    address[] public shopIndex;

    event LogNewShop (address indexed shopAddress, uint index, string Name, uint Shopownerid , bool ActiveStatus);
    event LogUpdateShop (address indexed shopAddress, uint index, string Name , uint Shopownerid,bool ActiveStatus);

    address shop0 = 0x79eaE799c912f00d97962160a8Fa9d52541e9A5a;
    address shop1 = 0x9A7A7C84645A119181E1c91d5c5FcDaB220e9776;
    address shop2 = 0x9963ea89487AEe252371521A6DC1A936d7cB5228;
    //address shop2 = 0xca5Bf07D4549c5f597D27c6d5DB9bA46B389f951;

    //Constructor
    constructor() public { 
        insertShop(shop0,"Shop 0",0,true); // Nonsensical entry to test values against.
        insertShop(shop1,"Shop 1",1,true);
        insertShop(shop2,"Shop 2",1,true);
    }

    // Shop functions   
    function isShop(address _shopAddress) public view returns(bool isIndeed)
    {
        if(shopIndex.length == 0) return false;
        return (shopIndex[shopStructs[_shopAddress].index] == _shopAddress);
    }

    function insertShop(address _shopAddress, string _name, uint _shopkeepid, bool _activestatus) public returns(uint index)  {       
        require(!isShop(_shopAddress),"Shop already exists.");
        shopStructs[_shopAddress].Name = _name;        
        shopStructs[_shopAddress].index = shopIndex.push(_shopAddress)-1;
        shopStructs[_shopAddress].Shopownerid = _shopkeepid;
        shopStructs[_shopAddress].ActiveStatus = _activestatus;
        emit LogNewShop(_shopAddress, shopStructs[_shopAddress].index,_name,_shopkeepid,_activestatus);       
        return shopIndex.length-1;  
    }

    function updateShop(address _shopAddress, string _name, uint _shopkeepid, bool _activestatus) public returns(bool success) {
        require(isShop(_shopAddress),"Shop to be updated does not exist.");
        shopStructs[_shopAddress].Name = _name;
        shopStructs[_shopAddress].Shopownerid = _shopkeepid;
        shopStructs[_shopAddress].ActiveStatus = _activestatus;
        emit LogUpdateShop(_shopAddress,shopStructs[_shopAddress].index,_name,_shopkeepid,_activestatus);
        return true;
    }

    function getShopAtIndex(uint index) public view returns (address shopAddress) {
        return shopIndex[index];
    }

    function getShop(address _shopAddress) public  view returns (string shopName, uint index, uint shopkeepid, bool activestatus) {
        require(isShop(_shopAddress),"Shop does not exist.");   
        return (shopStructs[_shopAddress].Name, shopStructs[_shopAddress].index, 
        shopStructs[_shopAddress].Shopownerid, shopStructs[_shopAddress].ActiveStatus);
    }

    function getShopCount() public view returns(uint count) {
        return shopIndex.length;
    }  

    function getActiveShopCount() public view returns(uint count) {
        // loop through array and its structs , count true values       
        uint ActiveShopCount = 0;
        for (uint i = 0; i < shopIndex.length; i++) {
            if(shopStructs[shopIndex[i]].ActiveStatus) {
                ActiveShopCount++;
            }
        }         
        return  ActiveShopCount;
    }    
}