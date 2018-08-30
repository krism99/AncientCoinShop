pragma solidity ^0.4.17;

import { TestLib } from "./TestLib.sol";

contract Testcontract1  {

    TestLib.testIndex testIndex;

    address addr1 = 0x25677eC6A26c4112E5c77f4dBE5aFA3Bd9ba69AB;

    constructor() public { 
        insertTest(addr1);
    }

    function insertTest(address _insertaddress) public  {
        TestLib.insertTest(testIndex,_insertaddress);
    }

    function showaddratindex(uint _index) public view  returns (address retaddr) {
        return (TestLib.showaddratindex(testIndex,_index));
    }

}    