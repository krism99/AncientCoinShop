pragma solidity ^0.4.17;

import "./Testcontract1.sol";

contract Testcontract2 is Testcontract1 {
    constructor() public { 
        insertTest(addr1);
    }

    function show2addratindex(uint _index) public view  returns (address retaddr) {
        return (TestLib.showaddratindex(testIndex,_index));
    }
}