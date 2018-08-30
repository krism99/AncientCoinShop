
var MaintLibrary = artifacts.require("./MaintLibrary.sol");
var Product = artifacts.require("./Product.sol");
var Admin = artifacts.require("./Admin.sol");
var Coin = artifacts.require("./Coin.sol");
var Shopkeep = artifacts.require("./Shopkeep.sol");
var Shop = artifacts.require("./Shop.sol");
var Shopper = artifacts.require("./Shopper.sol");



module.exports = function(deployer,accounts) { 
  //const acc0 = accounts[0];  
  deployer.deploy(Shop,{gas:6721975,gasprice:1000000}); 
  deployer.deploy(MaintLibrary,{gas:6721975,gasprice:1000000}).then(() => { 
    deployer.link(MaintLibrary,Admin); 
    deployer.deploy(Admin,{gas:6721975,gasprice:1000000}); 
    deployer.link(MaintLibrary,Shopkeep); 
    deployer.deploy(Shopkeep,{gas:6721975,gasprice:1000000});
    deployer.link(MaintLibrary,Coin);
    deployer.deploy(Coin,{gas:6721975,gasprice:1000000});  
    deployer.link(MaintLibrary,Shopper);
    deployer.deploy(Shopper,{gas:6721975,gasprice:1000000});  
    deployer.link(MaintLibrary,Product);   
    return deployer.deploy(Product,{gas:6721975,gasprice:20000000000});    
  }); 
};
