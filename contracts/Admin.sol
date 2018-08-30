pragma solidity ^0.4.17;

import { MaintLibrary } from "./MaintLibrary.sol";

/* @title Admin*/
/* @dev Manages Admin functionality, initializes some Admins
*/
contract Admin {

    struct TableStruct {
        bytes32 Name;
        uint index;
    }  

    mapping(address => TableStruct) public adminStructs;
    address[] public adminIndex;
    address owner = msg.sender; 

    event LogNewAdmin (address indexed adminAddress, uint index, bytes32 Name );
    event LogUpdateAdmin (address indexed adminAddress, uint index, bytes32 Name );
    event LogDeleteAdmin (address indexed adminAddress, uint index ); 

    //Constructor
    constructor() public { 
        // Set initiator of contract to 1st admin 
        insertAdmin(msg.sender,"Contract Owner");    
        insertAdmin(0xAb4D7C1F5c7cBd117C58519118972782FDe0B763,"Admin a");    
    }

    /* @title kill*/
    /* @dev kills contract      
    */        
    // Kill contract function
    function kill() public { 
        if(msg.sender == owner) {
            selfdestruct(owner); 
        }
    }

   
    /* @title getAdminIndexLength  */    
    /* @dev retuns length of Admin index            
        @return indexlength
    */
    function getAdminIndexLength() public view returns (uint indexlength) {
        return  adminIndex.length;
    }

    /* @titleisAdmin */    
    /* @dev checks if admin address exists
        @param _adminAddress adminaddress
        @return isIndeed boolean value
    */    
    function isAdmin(address _adminAddress) public view returns(bool isIndeed)
    {
        if(adminIndex.length == 0) return false;
        return (adminIndex[adminStructs[_adminAddress].index] == _adminAddress);
    }

    /* @title insertAdmin */    
    /* @dev inserts admin 
        @param _adminAddress adminAddress
        @param _name name
        @return newindex
    */    
    function insertAdmin(address _adminAddress, bytes32 _name) public returns(uint newindex)  {       
        require(!isAdmin(_adminAddress),"Admin already exists.");
        adminStructs[_adminAddress].Name = _name;
        newindex = adminIndex.push(_adminAddress)-1;
        adminStructs[_adminAddress].index = newindex;
        emit LogNewAdmin(_adminAddress, adminStructs[_adminAddress].index,_name);
        return newindex; 
    } 

    /* @title getAdminNameAtIndex */
    /* @dev returns Admin name via index call
        @param _index index
        @return Name  name
    */    
    function getAdminNameAtIndex(uint _index) public view returns (string Name) {
        return MaintLibrary.bytes32ToStr(adminStructs[adminIndex[_index]].Name);
    }
    
    /* @title deleteAdmin */
    /* @dev deletes admin
        @param _adminAddress            
        @return index
    */        
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

    /* @title getAdminAtIndex  */
    /* @dev gets admin address via index
        @param index            
        @return adminAddres
    */    
    function getAdminAtIndex(uint index) public view returns (address adminAddress) {
        return adminIndex[index];
    }

    /* @title getAdmin */
    /* @dev returns admin struct array  via adminaddress
        @param _adminAddress
        @return adminName
        @return index
    */
    function getAdmin(address _adminAddress) public  view returns (bytes32 adminName, uint index) {
        require(isAdmin(_adminAddress),"Admin does not exist.");   
        return (adminStructs[_adminAddress].Name, adminStructs[_adminAddress].index);        
    }    
    
    /* @title updateAdminName  */    
    /* @dev updates Admin's name 
        @param _adminAddress
        @param _name
        @return success
    */    
    function updateAdminName(address _adminAddress, bytes32 _name) public returns(bool success) {
        require(isAdmin(_adminAddress),"Admin to be updated does not exist.");
        adminStructs[_adminAddress].Name = _name;
        emit LogUpdateAdmin(_adminAddress,adminStructs[_adminAddress].index,_name);
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