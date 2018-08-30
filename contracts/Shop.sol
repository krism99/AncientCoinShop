pragma solidity ^0.4.17;
/* @title Shop*/
contract Shop  {

    struct ShopStruct {
        string Name;
        uint index;
        uint Shopownerid; 
        bool ActiveStatus;       
    } 

    mapping(address => ShopStruct) public  shopStructs;

    address[]  public shopIndex;

    mapping(address => bool)  public shopExists;

    address owner = msg.sender; 

    mapping(address => uint) public activeProductCount;

    uint public ActiveShopCount;

    event LogNewShop (address indexed shopAddress, uint index, string Name, uint Shopownerid , bool ActiveStatus);
    event LogUpdateShop (address indexed shopAddress, uint index, string Name , uint Shopownerid,bool ActiveStatus);
    event LogFundTransfer(address indexed shop,address shopkeep, uint productid, uint quant, uint value);
    event LogDeleteShop(address indexed shop);

    modifier checkowner() { 
        require(msg.sender == owner);
        _;
    }

    //Constructor
    constructor() public { 
        uint retindex = insertShop(msg.sender,"Shop 0",0,true); // Nonsensical entry to test values against.
        updateShopActiveProductCount(getShopAtIndex(retindex),5,true);             
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

    /* @title   getShopIndexLength()       */ 
    // Shop functions  
    function getShopIndexLength() public view returns (uint) {
        return shopIndex.length;
    }

    /* @title   getShopownerid       */  
    function getShopownerid(address _shopaddress) public view returns (uint) {
        return shopStructs[_shopaddress].Shopownerid;
    }


    /* @title   updateShopActiveProductCount       */  
    function updateShopActiveProductCount(address _shopaddress, uint _additionalvalue, bool _shouldincrement) public {
        require(isShop(_shopaddress),"Shop does not exist.");
        uint curvalue = activeProductCount[_shopaddress];   
        if (_shouldincrement != true) {
            activeProductCount[_shopaddress] = curvalue - _additionalvalue;       
        } else {
            activeProductCount[_shopaddress] = curvalue + _additionalvalue;       
        }      
    }

    /* @title    getShopActiveProductCount       */  
    function getShopActiveProductCount(uint _shopindex) public view returns (uint ) {
        require(isShop(shopIndex[_shopindex]),"Shop does not exist."); 
        return activeProductCount[shopIndex[_shopindex]] ;
    }

    /* @title    isShop       */
    function isShop(address _shopAddress) public view returns (bool isIndeed)
    {
        return shopExists[_shopAddress];       
    }

    /* @title     insertShop      */   
    function insertShop(address _shopAddress, string _name, uint _shopkeepid, bool _activestatus ) public returns(uint index)  {       
        require(!isShop(_shopAddress),"Shop already exists."); 
        shopStructs[_shopAddress].Name = _name;        
        shopStructs[_shopAddress].index = shopIndex.push(_shopAddress)-1;
        shopStructs[_shopAddress].Shopownerid = _shopkeepid;
        shopStructs[_shopAddress].ActiveStatus = _activestatus;  
        shopExists[_shopAddress] = true; 
        if (_activestatus == true) {
            ActiveShopCount++;
        }
        emit LogNewShop(_shopAddress, shopStructs[_shopAddress].index,_name,_shopkeepid,_activestatus);
        return shopStructs[_shopAddress].index;  
    }

    /* @title   getShopIndex       */
    function getShopIndex(address _shopAddress) public view returns (uint index) {
        return shopStructs[_shopAddress].index ;
    } 


    /* @title  updateShop        */
    function updateShop(address _shopAddress, string _name, uint _shopkeepid, bool _activestatus) public returns(bool success) {
        require(shopExists[_shopAddress],"Shop to be updated does not exist.");      
        shopStructs[_shopAddress].Name = _name;
        shopStructs[_shopAddress].index = getShopIndex(_shopAddress);
        shopStructs[_shopAddress].Shopownerid = _shopkeepid;
        if( shopStructs[_shopAddress].ActiveStatus == true && _activestatus == false) {
            ActiveShopCount--;
        }
        if( shopStructs[_shopAddress].ActiveStatus == false && _activestatus == true) {
            ActiveShopCount++;
        }        
        shopStructs[_shopAddress].ActiveStatus = _activestatus;
        emit LogUpdateShop(_shopAddress,shopStructs[_shopAddress].index,_name,_shopkeepid,_activestatus);
        return true;
    }

    /* @title   deleteShop       */
    function deleteShop(address _shopAddress) public returns( uint) {
        require(isShop(_shopAddress),"Shop to be deleted does not exist.");      
        uint rowToDelete = shopStructs[_shopAddress].index;          
        address keyToMove = shopIndex[shopIndex.length-1];
        shopIndex[rowToDelete] = keyToMove;
        shopStructs[keyToMove].index = rowToDelete;
        shopIndex.length--;      
      //  shopExists[_shopAddress] = false;
     //   activeProductCount[_shopAddress] = 0;
     //   emit LogDeleteShop(_shopAddress);              
        return rowToDelete;
    }

    /* @title   getShopName       */
    function getShopName(address _shopaddress) public view returns (string) {
        return  shopStructs[_shopaddress].Name;
    } 
    
    
    /* @title   getActiveShopCount       */
    function getActiveShopCount() public view returns(uint count) {     
        return  ActiveShopCount;
    }  

    /* @title   getShopNameAtIndex       */
    function getShopNameAtIndex(uint _index) public view returns (string shopName) {
        return shopStructs[getShopAtIndex(_index)].Name;
    }  

    /* @title   getShopAtIndex       */ 
    function getShopAtIndex(uint _index) public view returns (address shopAddress) {
        return shopIndex[_index];
    }  

    /* @title  getShop        */ 
    function getShop(address _shopAddress) public  view returns (string shopName, uint index, uint shopkeepid, bool activestatus) {
        require(shopExists[_shopAddress],"Shop does not exist.");  
        return (shopStructs[_shopAddress].Name,
            shopStructs[_shopAddress].index,
            shopStructs[_shopAddress].Shopownerid,
            shopStructs[_shopAddress].ActiveStatus);
    } 

    // make note in documentation, using 'transfer' method as a security implementation
    /* @title    Transfer       */ 
    function Transfer(address _toshopkeep,uint _productid, uint _quant)   public payable  returns (bool) {
        uint amounttotransfer = msg.value;
        _toshopkeep.transfer(amounttotransfer); 
        //  event
        emit LogFundTransfer(msg.sender,_toshopkeep, _productid, _quant, amounttotransfer);  
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