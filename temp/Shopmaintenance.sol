pragma solidity ^0.4.17;

import "./Shop.sol";
import "./Shopkeep.sol";

contract Shopmaintenance is Shopkeep,Shop{
   
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

    function getparentShopkeepNameAtShopIndex(uint _index) public view returns (string _shopname) {
        // get shop at index 1, then use that to get its  shopownerid, then use that to get this shop name
        address shopaddress = shopIndex[_index];
        uint shopownerid = shopStructs[shopaddress].Shopownerid;
        address shopowneraddress = shopkeepIndex[shopownerid];
        string storage shopname = shopkeepStructs[shopowneraddress].Name;
        return shopname;
    }  
}