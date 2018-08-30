pragma solidity ^0.4.17;

contract Admin {

    struct TableStruct {
        string Name;
        uint index;
    } 

    mapping(address => TableStruct) private adminStructs;
    address[] private adminIndex;

    event LogNewAdmin (address indexed adminAddress, uint index, string Name );
    event LogUpdateAdmin (address indexed adminAddress, uint index, string Name );
    event LogDeleteAdmin (address indexed adminAddress, uint index );

    address  admin1 = 0x65793cd72f42BE36d45559448fC8AB0987DA4E27; 
    address  admin2 = 0xfA4Ed4a93014B610668Ab858e2FABda8C57A829D;

    //Constructor
    constructor() public { 
        // Set initiator of contract to 1st admin 
        insertAdmin(msg.sender,"Contract Owner");
        //Populate some default values.
        
        insertAdmin(admin1,"Admin 1");
        insertAdmin(admin2,"Admin 2");    
    }

    // Admin functions
    function isAdmin(address _adminAddress) public view returns(bool isIndeed)
    {
        if(adminIndex.length == 0) return false;
        return (adminIndex[adminStructs[_adminAddress].index] == _adminAddress);
    }

    function insertAdmin(address _adminAddress, string _name) public returns(uint index)  {       
        require(!isAdmin(_adminAddress),"Admin already exists.");
        adminStructs[_adminAddress].Name = _name;
        adminStructs[_adminAddress].index = adminIndex.push(_adminAddress)-1;
        emit LogNewAdmin(_adminAddress, adminStructs[_adminAddress].index,_name);
        return adminIndex.length-1; 
    } 

    function deleteAdmin(address _adminAddress) public returns(uint index) {
        require(isAdmin(_adminAddress),"Admin to be deleted does not exist.");       
        uint rowToDelete = adminStructs[_adminAddress].index;
        address keyToMove = adminIndex[adminIndex.length-1];
        adminIndex[rowToDelete] = keyToMove;
        adminStructs[keyToMove].index = rowToDelete;
        adminIndex.length--;
        emit LogDeleteAdmin(_adminAddress,rowToDelete);
        emit LogUpdateAdmin(keyToMove,rowToDelete,adminStructs[keyToMove].Name);
        return rowToDelete;
    }    

    function getAdminAtIndex(uint index) public view returns (address adminAddress) {
        return adminIndex[index];
    }

    function getAdmin(address _adminAddress) public  view returns (string adminName, uint index) {
        require(isAdmin(_adminAddress),"Admin does not exist.");   
        return (adminStructs[_adminAddress].Name, adminStructs[_adminAddress].index);        
    }    

    function updateAdminName(address _adminAddress, string _name) public returns(bool success) {
        require(isAdmin(_adminAddress),"Admin to be updated does not exist.");
        adminStructs[_adminAddress].Name = _name;
        emit LogUpdateAdmin(_adminAddress,adminStructs[_adminAddress].index,_name);
        return true;
    }

    function getAdminCount() public view returns(uint count) {
        return adminIndex.length;
    }
}