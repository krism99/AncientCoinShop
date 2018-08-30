pragma solidity ^0.4.17;

library TestLib {
    struct testIndex {
        address[]  testindex;
    }

    function insertTest(testIndex storage self, address testaddr) public returns (uint newindex) {           
        newindex = self.testindex.push(testaddr)-1;
        return newindex;  
    }

    function showaddratindex(testIndex storage self,uint _index) public view returns (address retaddress) {
        return self.testindex[_index];
    }
}