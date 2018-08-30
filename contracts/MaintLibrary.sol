pragma solidity ^0.4.17;

/* @title MaintLibrary*/
library MaintLibrary {

    /* @title bytes32ToStr          */
    /* @dev Converts bytes32 to String
    @param _bytes32
    @return string
    */
    function bytes32ToStr(bytes32 _bytes32) public pure returns (string){
        bytes memory bytesArray = new bytes(32);
        for (uint256 i; i < 32; i++) {
            bytesArray[i] = _bytes32[i];        
        }
        return string(bytesArray); 
    } 
}