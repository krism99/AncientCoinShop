pragma solidity ^0.4.17;

import "./Shop.sol";
import "./Shopper.sol";
import "./Product.sol";

contract Productmaintenance is Shop , Shopper, Product {
   
    //Constructor
    constructor() public { 
    }

    function bytes32ToStr(bytes32 _bytes32) public pure returns (string){
        bytes memory bytesArray = new bytes(32);
        for (uint256 i; i < 32; i++) {
            bytesArray[i] = _bytes32[i];        
        }
        return string(bytesArray); 
    }

    function isReallyOwnerbyIndex(uint _productid, address _potentialowneraddress) public view returns(bool isIndeed) {
         // get product at index(_id) , confirm that _potentialowner  = realowner.
        uint ownerid = productStructs[getProductAtIndex(_productid)].ownerId;
        bytes32 ownertype = productStructs[getProductAtIndex(_productid)].ownerType;
        bytes32 shoptype = "SHOP";
        bytes32 shoppertype = "SHOPPER";
        address owneraddress;
        if (ownertype == shoptype) {
            owneraddress = shopIndex[ownerid];             
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
            owneraddress = shopIndex[ownerid];             
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
    /*
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