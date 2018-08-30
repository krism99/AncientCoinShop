pragma solidity ^0.4.17;

import { MaintLibrary } from "./MaintLibrary.sol";
/* @title Product*/
contract Product  {   

    struct ProductStruct {
        uint index;
        uint coinId; 
        uint ownerId; 
        bytes32 ownerType ;
        bool ActiveStatus;
        uint Quantity;
        uint Price;  // in wei
    } 

    mapping(bytes32=> ProductStruct) productStructs;
    bytes32[] productIndex;
    mapping(bytes32 => bool)  productExists;
    mapping(bytes32 => bool)  uniqueProds; 
    address owner = msg.sender;    

    mapping(address=>ProductStruct) buyerStructs;
    address[] buyerIndex;

    event LogNewProduct (bytes32 indexed productName, uint index, uint coinid, uint ownerid, 
    bytes32 ownertype, bool activestatus, uint quantity, uint price);

    event debug (uint lineno);

    event LogUpdateProduct (bytes32 indexed productName, uint index, uint coinid, uint ownerid, 
    bytes32 ownertype, bool activestatus, uint quantity, uint price);

    event LogDeleteProduct (bytes32 indexed productName );
  
    //Constructor
    constructor() public {            
        // Adds a default entry so tests can checked for > 0
        insertProduct("Initial (No) Product",0,0,"SHOP",true,0,0);                
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

    /* @title  isProduct        */
    /* @dev checks for product existense via productname
    @param  _productname
    @return  isIndeed
    */
    function isProduct(bytes32 _productname) public view returns(bool isIndeed)
    {
        if(productIndex.length == 0) return false;
        return (productExists[_productname]);
    }


    /* @title    getProductCount      */
    /* @dev returns productindex length
    @return uint
    */
    function getProductCount() public view returns(uint ) {
        return productIndex.length;
    } 


    /* @title   UniqueExists        */
    /* @dev  checks if hashval exists
    @param _hashval
    @return bool
    */
    function UniqueExists(bytes32 _hashval) public view returns (bool) {
        return uniqueProds[_hashval];
    }

    /* @title  returnhashval        */
    /* @dev helper function which returns hashval of 3 columns
    @param _coinid
    @param _ownerid
    @param _ownertype
    @return _hashval
    */
    function returnhashval(uint _coinid, uint _ownerid , bytes32 _ownertype) public pure  returns (bytes32 _hashval) {
        return   keccak256(abi.encodePacked(_coinid,_ownerid,_ownertype));     
    }

    /* @title  insertProduct        */
    /* @dev inserts product details
    @param _productname,       
    @param _coinid,
    @param _ownerid,
    @param _ownertype,
    @param _activestatus,
    @param _quantity,
    @param _price
    @return uint
    */
    function insertProduct(        
        bytes32 _productname,       
        uint _coinid,
        uint _ownerid,
        bytes32 _ownertype,
        bool _activestatus,
        uint _quantity,
        uint _price
        )  public returns(uint) {  
        require(!isProduct(_productname),"Product already exists.");
        // referential integrity checking expected to be handled by calling app.
        bytes32 hashval = keccak256(abi.encodePacked(_coinid,_ownerid,_ownertype));
        require(!UniqueExists(hashval),"Product combination of coinid,ownerid and ownertype already exists");
        uint newindex = productIndex.push(_productname)-1;
        productStructs[_productname].index = newindex;
        productStructs[_productname].coinId = _coinid; 
        productStructs[_productname].ownerId = _ownerid;    
        productStructs[_productname].ownerType = _ownertype;
        productStructs[_productname].ActiveStatus = _activestatus;
        productStructs[_productname].Quantity = _quantity;    
        productStructs[_productname].Price = _price;
        uniqueProds[hashval] = true;
        productExists[_productname] = true;      
        return newindex;
    } 

    /* @title   getproductNameAtIndex       */
    /* @dev returns productname via index lookup
    @param index 
    @return string
    */
    function getproductNameAtIndex(uint index) public view returns (string ) {
        return MaintLibrary.bytes32ToStr(productIndex[index]);
    }



    /* @title   getproductQuantAtIndex       */
    /* @dev returns product quantity via index lookup
    @param index
    @return uint
    */
    function getproductQuantAtIndex(uint index) public view returns (uint) {
        return(productStructs[productIndex[index]].Quantity);
    }


    /* @title  getproductPriceAtIndex        */
    /* @dev returns product price via index lookup
    @param index
    @return uint
    */
    function getproductPriceAtIndex(uint index) public view returns (uint) {
        return(productStructs[productIndex[index]].Price);
    }


    /* @title  getproduct        */
    /* @dev returns contents of product struct as array via index lookup
    @param index 
    @return coinId,
    @return ownerId,
    @return ownerType,
    @return ActiveStatus,
    @return Quantity,
    @return Price
    */
    function getproduct(uint _index) public view returns (uint,uint,bytes32,bool,uint,uint) {

        return (
            productStructs[productIndex[_index]].coinId,
            productStructs[productIndex[_index]].ownerId,
            productStructs[productIndex[_index]].ownerType,
            productStructs[productIndex[_index]].ActiveStatus,
            productStructs[productIndex[_index]].Quantity,
            productStructs[productIndex[_index]].Price
        );
    }

    /* @title   updateProduct        */
    /* @dev updates product details
    @param _productname,       
    @param _coinid,
    @param _ownerid,
    @param _ownertype,
    @param _activestatus,
    @param _quantity,
    @param _price
    @return bool
    */
    function updateProduct(    
        bytes32 _productname,       
        uint _coinid,
        uint _ownerid,
        bytes32 _ownertype,
        bool _activestatus,
        uint _quantity,
        uint _price
        )  public returns(bool) {  
        require(isProduct(_productname),"Product does not exist.");        
        // referential integrity checking expected to be handled by calling app.
        // also, ownership address verification would have to be handled by app because it links to shop or shopper..
        bytes32 newhashval = keccak256(abi.encodePacked(_coinid,_ownerid,_ownertype));         
        bytes32 oldhashval = keccak256(
            abi.encodePacked
            ( 
            productStructs[_productname].coinId,
            productStructs[_productname].ownerId,
            productStructs[_productname].ownerType)
            );
        if ( oldhashval != newhashval) {
            require(!UniqueExists(newhashval),"New Product combination of coinid,ownerid and ownertype already exists, rather change quant and price of that one");  
            uniqueProds[oldhashval] = false; 
            uniqueProds[newhashval] = true; 
        }  
        productStructs[_productname].coinId = _coinid; 
        productStructs[_productname].ownerId = _ownerid;    
        productStructs[_productname].ownerType = _ownertype;
        productStructs[_productname].ActiveStatus = _activestatus;
        productStructs[_productname].Quantity = _quantity;    
        productStructs[_productname].Price = _price;
        return true;
        // emits
    }

    /* @title     deleteProductatIndex     */
    /* @dev deletes product based on index access
    @param  _productindex
    @return bool
    */
    function deleteProductatIndex(uint _productindex) public returns (bool) {
        bytes32 prodName = productIndex[_productindex];
        require(productExists[prodName], "Product to be deleted does not exist."); 
        deleteProduct(prodName);  
        return true;
    }

    /* @title  deleteProduct        */
    /* @dev deletes product based on Name access
    @param _productname
    @return retindex
    */
    function deleteProduct(bytes32 _productname) public returns(uint retindex) {
        // referential integrity checking expected to be handled by calling app.
        // also, ownership address verification would have to be handled by app because it links to shop or shopper..
        require(isProduct(_productname),"Product to be deleted does not exist.");       
        uint rowToDelete = productStructs[_productname].index;
        bytes32 lastkeyToMove = productIndex[productIndex.length-1];
        productExists[_productname] = false; 
        bytes32 oldhashval = keccak256(
            abi.encodePacked
            ( 
            productStructs[_productname].coinId,
            productStructs[_productname].ownerId,
            productStructs[_productname].ownerType)
            );  
        uniqueProds[oldhashval] = false;
        productIndex[rowToDelete] = lastkeyToMove; 
        productIndex.length--;        
        emit LogDeleteProduct(_productname);        
        emit LogUpdateProduct(
            lastkeyToMove,
            rowToDelete,
            productStructs[lastkeyToMove].coinId, 
            productStructs[lastkeyToMove].ownerId,
            productStructs[lastkeyToMove].ownerType,
            productStructs[lastkeyToMove].ActiveStatus,
            productStructs[lastkeyToMove].Quantity,
            productStructs[lastkeyToMove].Price);        
        return rowToDelete;
    }

    /* @title   incrementProduct       */
    /* @dev increments quantity of a product (owned by shopper) when purchased
    @param _productname
    @param _coinid,
    @param _ownerid,
    @param _ownertype,
    @param _activestatus,
    @param _quantity,
    @param _price
    */
    function incrementProduct(bytes32 _productname,uint _coinid,uint _ownerid,bytes32 _ownertype,bool _activestatus,uint _quantity,uint _price) public  
    {
        bytes32 hashval = keccak256(abi.encodePacked(_coinid, _ownerid,_ownertype));
        // event log handled by called function
        if (UniqueExists(hashval)) {  
            // update existing product
            uint newquant = productStructs[_productname].Quantity + _quantity;
            updateProduct(_productname,_coinid,_ownerid,_ownertype,_activestatus,newquant,_price);
        } else {  
           // insert new product       
            insertProduct(_productname, _coinid, _ownerid, _ownertype, _activestatus,_quantity, _price);
        }
    } 

    /* @title   decrementProduct       */
    /* @dev decrements quantity of a product (owned by shop) when sold
    @param _productname
    @param _coinid,
    @param _ownerid,
    @param _ownertype,
    @param _activestatus,
    @param _quantity,
    @param _price
    */
    function decrementProduct(
        bytes32 _productname,uint _coinid,uint _ownerid,bytes32 _ownertype,bool _activestatus,uint _quantity,uint _price) public  
    {
        bytes32 hashval = keccak256(abi.encodePacked(_coinid, _ownerid,_ownertype));
        require(UniqueExists(hashval),"Product to be decremented does not exist.");  
        // update existing product
        uint newquant = productStructs[_productname].Quantity - _quantity;
        // event log handled by called function
        updateProduct(_productname,_coinid,_ownerid,_ownertype,_activestatus,newquant,_price);       
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