pragma solidity ^0.4.17;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/Product.sol";

contract TestProduct {
    function testProductInitialization() public {
        Product meta = Product(DeployedAddresses.Product());         
        uint expectedarraylength = 1;
        uint foundarraylength = meta.getProductCount();    
        Assert.equal(foundarraylength, expectedarraylength, "Should have found 1 admin");   
    } 
}