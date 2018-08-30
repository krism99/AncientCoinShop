var Migrations = artifacts.require("./Migrations.sol");

module.exports = function(deployer) {
 //deployer.deploy(Migrations,{gas:6721975,gasprice:1000000});
 deployer.deploy(Migrations);
};
