pragma solidity ^0.4.17;

contract Product {   
    struct ProductStruct {
        uint index;
        uint coinId;
        uint ownerId; 
        bytes32 ownerType ;
        bool ActiveStatus;
        uint Quantity;
        uint Price;  // in wei
    } 
    mapping(bytes32 => ProductStruct) public productStructs;
    bytes32[] public productIndex;
    mapping(bytes32 => bool) public productExists;
    mapping(bytes32 =>bool) public UniqueProds;

    event LogNewProduct (bytes32 indexed productName, uint index, uint coinid, uint ownerid, 
    bytes32 ownertype, bool activestatus, uint quantity, uint price);
    event LogUpdateProduct (bytes32 indexed productName, uint index, uint coinid, uint ownerid, 
    bytes32 ownertype, bool activestatus, uint quantity, uint price);
    event LogDeleteProduct (bytes32 indexed productName, uint index );
  
    //Constructor
    constructor() public { 
                     
         // Adds a nonsensical entry so tests can checked for > 0
        insertProduct("Initial (No) Product",0,0,"SHOP",true,1,1); 
        
        // Adds Coin 1 to Shop 1,  price in wei
        insertProduct("Product a",1,1,"SHOP", true,18,7000);        
        
        // Adds Coin 2 to Shop 1 price in wei
        insertProduct("Product b",2,1,"SHOPPER", true,6,500); 
         
        // Adds coin 1 to Shopper 1,  price in wei
        insertProduct("Product c",1,1,"SHOPPER", true,10,7000); 
        
        // Adds coin 2 to Shopper 1, price in wei      
        insertProduct("Product d",2,1,"SHOP", true,60,500);  

        // Adds coin 2 to Shop2, price in wei      
        insertProduct("Product zz",2,2,"SHOP", true,6,50);                  
      
    }   
    // Product functions   

    function bytes32ToStr(bytes32 _bytes32) public pure returns (string){
        // string memory str = string(_bytes32);
        // TypeError: Explicit type conversion not allowed from "bytes32" to "string storage pointer"
        // thus we should fist convert bytes32 to bytes (to dynamically-sized byte array)
        bytes memory bytesArray = new bytes(32);
        for (uint256 i; i < 32; i++) {
            bytesArray[i] = _bytes32[i];        
        }
        return string(bytesArray); 
    }

    function isProduct(bytes32 _productname) public view returns(bool isIndeed)
    {
        if(productIndex.length == 0) return false;
        return (productIndex[productStructs[_productname].index] > 0);
    }

    function isProductatIndex(uint _productindex) public view returns(bool isIndeed)
    {
        if(productIndex.length == 0) return false;      
        return ( productStructs[productIndex[_productindex]].index   > 0); 
    }


    function DuplicateExists(bytes32 _hashval) public view returns(bool isIndeed)
    {       
        return (UniqueProds[_hashval]);
    }
   
    function insertProduct(
        bytes32 _name, 
        uint _coinid, 
        uint _ownerid, 
        bytes32 _ownertype, 
        bool _activestatus,
        uint _quantity,
        uint _price)
        public returns(uint index)  {     

        // Don't allow duplicate product names   (but ignore the first entry used to populate 0)
        if (keccak256(abi.encodePacked(bytes32ToStr(_name))) == keccak256(abi.encodePacked("Initial (No) Product"))) {
            require(!isProduct(_name),"Product already exists.");
        }
        
        // Do not allow duplicates of Coinid, Ownerid,Ownertype combination.
        bytes32 hashval = keccak256(abi.encodePacked(_coinid,_ownerid, _ownertype));
        require(!DuplicateExists(hashval),"Duplicate of existing Coinid,Ownerid,Ownertype");
        
        uint newindex = productIndex.push(_name)-1;
        productExists[_name] = true;
        productStructs[_name].index = newindex;
        UniqueProds[hashval] = true;
        productStructs[_name].coinId = _coinid; 
        productStructs[_name].ownerId = _ownerid;    
        productStructs[_name].ownerType = _ownertype;
        productStructs[_name].ActiveStatus = _activestatus;
        productStructs[_name].Quantity = _quantity;    
        productStructs[_name].Price = _price;
        emit LogNewProduct(_name, newindex,_coinid,_ownerid,_ownertype, _activestatus,_quantity,_price);       
        return newindex;         
    }

    function getProductCount() public view returns(uint count) {
        return productIndex.length;
    } 

    function getProductAtIndex(uint index) public view returns (bytes32 productName) {
        return productIndex[index];
    }

    function showProductNameAtIndex(uint index) public view returns (string productName) {
        return bytes32ToStr(productIndex[index]);
    }

    function getProduct(bytes32 _name) public  view returns
     ( uint index,  uint coinid, uint ownerid, string ownertype, bool activestatus,  uint quantity,uint price) {
        require(isProduct(_name),"Product does not exist.");   
        return ( productStructs[_name].index, productStructs[_name].coinId,productStructs[_name].ownerId,
        bytes32ToStr(productStructs[_name].ownerType), productStructs[_name].ActiveStatus,productStructs[_name].Quantity,productStructs[_name].Price);
    }

    function getActiveProductCount() public view returns(uint count) {
        // loop through array and its structs , count true values       
        uint ActiveProductCount = 0;
        for (uint i = 0; i < productIndex.length; i++) {
            if(productStructs[productIndex[i]].ActiveStatus) {
                ActiveProductCount++;
            }
        }         
        return  ActiveProductCount;
    } 
}