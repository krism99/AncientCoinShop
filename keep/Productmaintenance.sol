pragma solidity ^0.4.17;

//
//import { MaintLibrary } from "./MaintLibrary.sol" -- done in Shop.sol, no need to do it here;
//
import "./Shop.sol";
import "./Shopper.sol";

import { MaintLibrary } from "./MaintLibrary.sol";

 


//contract Productmaintenance is Shop , Shopper, Product {
contract Productmaintenance is Shop , Shopper {  
    MaintLibrary.productStructs productStructs;
    MaintLibrary.productIndex productIndex;
    MaintLibrary.productExists productExists;
    MaintLibrary.uniqueProds uniqueProds ;   
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
/*
    function bytes32ToStr(bytes32 _bytes32) public pure returns (string){
        bytes memory bytesArray = new bytes(32);
        for (uint256 i; i < 32; i++) {
            bytesArray[i] = _bytes32[i];        
        }
        return string(bytesArray); 
    }  
*/
    function isReallyOwnerbyIndex(uint _productid, address _potentialowneraddress) public view returns(bool isIndeed) {
         // get product at index(_id) , confirm that _potentialowner  = realowner.
        uint ownerid = productStructs[getProductAtIndex(_productid)].ownerId;
        bytes32 ownertype = productStructs[getProductAtIndex(_productid)].ownerType;
        bytes32 shoptype = "SHOP";
        bytes32 shoppertype = "SHOPPER";
        address owneraddress;
        if (ownertype == shoptype) {
            owneraddress = shopIndex.shopindex[ownerid];             
        }
        if (ownertype == shoppertype) {
            owneraddress = shopperIndex[ownerid];
        }
        return (owneraddress == _potentialowneraddress);
    }

    function isReallyOwnerbyName(bytes32 _productname, address _potentialowneraddress) public view returns(bool isIndeed) {
         // get product at struct(_productname) , confirm that _potentialowneraddress  = realowner.
        uint ownerid = productStructs[_productname].ownerId;
        bytes32 ownertype = productStructs[_productname].ownerType;
        bytes32 shoptype = "SHOP";
        bytes32 shoppertype = "SHOPPER";
        address owneraddress;
        if (ownertype == shoptype) {
            owneraddress = shopIndex.shopindex[ownerid];               
        }
        if (ownertype == shoppertype) {
            owneraddress = shopperIndex[ownerid];
        }
        return (owneraddress == _potentialowneraddress);
    }

   
    function deleteProductatIndex(uint _productindex) public {
        bytes32 prodName = getProductAtIndex(_productindex);
        require(productExists[prodName], "Product to be deleted does not exist."); 
        deleteProduct(prodName);  
    }
  

    function deleteProduct(bytes32 _productname) public returns(uint index) {
        require(isProduct(_productname),"Product to be deleted does not exist.");  
        require(isReallyOwnerbyName(_productname,msg.sender),"Cannot delete if not owner of product");    
        bytes32 hashval = 
            keccak256(
                abi.encodePacked(
                    productStructs[_productname].coinId,
                    productStructs[_productname].ownerId,
                    productStructs[_productname].ownerType
                )
            );
        UniqueProds[hashval] = false; 
        productExists[_productname] = false;
        uint rowToDelete = productStructs[_productname].index;
        bytes32 keyToMove = productIndex[productIndex.length-1];
        productIndex[rowToDelete] = keyToMove;
        productStructs[keyToMove].index = rowToDelete;
        productIndex.length--;
        emit LogDeleteProduct(_productname,rowToDelete);
        emit LogUpdateProduct(
            keyToMove,rowToDelete,
            productStructs[keyToMove].coinId, productStructs[keyToMove].ownerId,productStructs[keyToMove].ownerType,
            productStructs[keyToMove].ActiveStatus,productStructs[keyToMove].Quantity,
            productStructs[keyToMove].Price);        
        return rowToDelete;
    }
    
    function insertProduct(bytes32 _productname,uint _coinid,uint _ownerid,bytes32 _ownertype,bool _activestatus,uint _quantity,uint _price) 
        public returns(uint _index) {   
        // Don't allow duplicate product names   (but ignore the first entry used to populate 0)
        if (keccak256(abi.encodePacked(MaintLibrary.bytes32ToStr(_productname))) == keccak256(abi.encodePacked("Initial (No) Product"))) {
            require(!isProduct(_productname),"Product already exists.");
        }    

        // Require a new test to see if the coin exists already !    

        // Do not allow duplicates of Coinid, Ownerid,Ownertype combination.
        bytes32 hashval = keccak256(abi.encodePacked(_coinid,_ownerid, _ownertype));
        require(!DuplicateExists(hashval),"Duplicate of existing Coinid,Ownerid,Ownertype");        
        UniqueProds[hashval] = true;
        uint newindex = productIndex.push(_productname)-1;
        productExists[_productname] = true;
        productStructs[_productname].index = newindex;
        productStructs[_productname].coinId = _coinid; 
        productStructs[_productname].ownerId = _ownerid;    
        productStructs[_productname].ownerType = _ownertype;
        productStructs[_productname].ActiveStatus = _activestatus;
        productStructs[_productname].Quantity = _quantity;    
        productStructs[_productname].Price = _price;
        emit LogNewProduct(_productname, newindex,_coinid,_ownerid,_ownertype, _activestatus,_quantity,_price);       
        return newindex;         
    } 
    
    function updateProduct(bytes32 _productname,uint _coinid,uint _ownerid,bytes32 _ownertype,bool _activestatus,uint _quantity,uint _price) 
        public returns(uint _index) 
        {
        // presumes app has worked out what the new quantity needs to be so the quant. passed has is the new quantity balance
        require(isProduct(_productname),"Product to be updated does not exist.");  
        require(isReallyOwnerbyName(_productname,msg.sender),"Cannot update or delete if not owner of product");    
        // Get old values
        // Update indexes if relevant
        // Update this table
        bytes32 oldhashval = 
            keccak256(
                abi.encodePacked(
                    productStructs[_productname].coinId,
                    productStructs[_productname].ownerId,
                    productStructs[_productname].ownerType
                )
            ) ;
        bytes32 newhashval = 
            keccak256(
                abi.encodePacked(
                    _coinid,
                    _ownerid,
                    _ownertype
                )
            );
        if (oldhashval != newhashval) {
            UniqueProds[oldhashval] = false; 
            UniqueProds[newhashval] = true; 
        }
        productStructs[_productname].coinId = _coinid;
        productStructs[_productname].ownerId = _ownerid;
        productStructs[_productname].ownerType = _ownertype;
        productStructs[_productname].ActiveStatus = _activestatus;
        productStructs[_productname].Quantity = _quantity;
        productStructs[_productname].Price = _price;

        emit LogUpdateProduct(
            _productname,
            productStructs[_productname].index,
            _coinid, 
            _ownerid,
            _ownertype,
            _activestatus,
            _quantity,
            _price);
        return productStructs[_productname].index;
    } 

    /*
    function incrementProduct(
        bytes32 _productname,uint _coinid,uint _ownerid,bytes32 _ownertype,bool _activestatus,uint _quantity,uint _price) public  
    {
        bytes32 hashval = keccak256(abi.encodePacked(_coinid, _ownerid,_ownertype));
        // event log handled by called function
        if (DuplicateExists(hashval)) {  
            // update existing product
            uint newquant = productStructs[_productname].Quantity + _quantity;
            updateProduct(_productname,_coinid,_ownerid,_ownertype,_activestatus,newquant,_price);
        } else {  
           // insert new product       
            insertProduct( _productname, _coinid, _ownerid, _ownertype, _activestatus,_quantity, _price);
        }
    } 

    function decrementProduct(
        bytes32 _productname,uint _coinid,uint _ownerid,bytes32 _ownertype,bool _activestatus,uint _quantity,uint _price) public  
    {
        bytes32 hashval = keccak256(abi.encodePacked(_coinid, _ownerid,_ownertype));
        require(DuplicateExists(hashval),"Product to be decremented does not exist.");  
        // update existing product
        uint newquant = productStructs[_productname].Quantity - _quantity;
        // event log handled by called function
        updateProduct(_productname,_coinid,_ownerid,_ownertype,_activestatus,newquant,_price);        
    } 
    */              
}