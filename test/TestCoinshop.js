// ---- Test Admin ----

var Admin = artifacts.require("./Admin.sol");
contract("Admin",function(){    
    it("Tests admin contract initialization", async function(){   
        let meta = await Admin.deployed();
        let adminindexlen = await  meta.getAdminIndexLength();
        console.log("        Admin index length: " +  adminindexlen);        
        assert.equal(adminindexlen,2,"Initial admins should be created");
    })
    it("Tests admin insert", async function(){   
        let meta = await Admin.deployed();
        await  meta.insertAdmin(0x65793cd72f42BE36d45559448fC8AB0987DA4E27,"Admin 1");
        let newadminindexlen = await  meta.getAdminIndexLength();
        console.log("        Post-insert Admin index length: " +  newadminindexlen);
        assert.equal(newadminindexlen,3,"Additional admin should be created");
    })
    it("Tests admin update", async function(){   
        let meta = await Admin.deployed();
        let adminname = await meta.getAdminNameAtIndex(2);
        console.log("        Admin 3's name (pre-update): " + adminname);
        await  meta.updateAdminName(0x65793cd72f42BE36d45559448fC8AB0987DA4E27,"Admin zz");
        let newadminname = await meta.getAdminNameAtIndex(2);
        console.log("        Admin 3's name (post-update): " + newadminname);
        assert.equal(newadminname,"Admin zz","Admin 3's Name should be different");
    })
    it("Tests admin delete", async function(){   
        let meta = await Admin.deployed();
        await  meta.deleteAdmin(0x65793cd72f42BE36d45559448fC8AB0987DA4E27);
        let latestadminindexlen = await  meta.getAdminIndexLength();
        console.log("        Post-delete Admin index length: " +  latestadminindexlen);  
        assert.equal(latestadminindexlen,2,"Admin count should have decreased.");    
    })
    it("Tests Admin creation log event", async function(){
        let meta = await Admin.deployed();
        let res = await meta.insertAdmin(0x35866F1203064A7252C5Cd90170e2A5ba8c5304C,"Admin cc");       
        assert.equal(res.logs.length,1,"an event has been triggered");
        assert.equal(res.logs[0].event,"LogNewAdmin","LogNewAdmin event should have triggered");
    })
});     

// ---- Test Shopkeep ----
var Shopkeep = artifacts.require("./Shopkeep.sol");
contract("Shopkeep",function(){
    it("Tests Shopkeep Initialization", async function(){       
        let meta = await Shopkeep.deployed();
        let indexlen0 = await  meta.getShopkeepIndexLength();
        console.log("        Initial Shopkeep index length: " +  indexlen0);   
        assert.equal(indexlen0,2,"Initial Shopkeep should be created"); 
    }) 
    it("Tests Shopkeep Insert", async function(){       
        let meta = await Shopkeep.deployed();            
        await  meta.insertShopkeep(0x65793cd72f42BE36d45559448fC8AB0987DA4E27,"Shopkeep a");
        let indexlen1 = await  meta.getShopkeepIndexLength();
        console.log("        Post-insert Shopkeep index length: " +  indexlen1);
        assert.equal(indexlen1,3,"Additional Shopkeep should be created"); 
    })
    it("Tests Shopkeep Update", async function(){       
        let meta = await Shopkeep.deployed();
        let name = await meta.getShopkeepNameAtIndex(2);
        console.log("        Shopkeep 3's name: " + name);
        await  meta.updateShopkeepName(0x65793cd72f42BE36d45559448fC8AB0987DA4E27,"Shopkeep zz");
        let newname = await meta.getShopkeepNameAtIndex(2);
        console.log("        Shopkeep 3's name: " + newname);
        assert.equal(newname,"Shopkeep zz","Shopkeep 3's Name should be different");
    })
    it("Tests Shopkeep Delete", async function(){       
        let meta = await Shopkeep.deployed();
        await  meta.deleteShopkeep(0x65793cd72f42BE36d45559448fC8AB0987DA4E27);
        let indexlen2 = await  meta.getShopkeepIndexLength();
        console.log("        Post-delete Shopkeep index length: " +  indexlen2); 
        assert.equal(indexlen2,2,"A Shopkeep should have been deleted"); 
    })
    it("Tests shopkeep event logging", async function(){       
        let meta = await Shopkeep.deployed(); 
        let res2 = await  meta.insertShopkeep(0x8bbd7977862715128f093e9afC9b8841e995FdB3,"Shopkeep ccc");
        assert.equal(res2.logs.length,1,"an event has been triggered");     
        assert.equal(res2.logs[0].event,"LogNewShopkeep","LogNewShopkeep event should have triggered");
    })
});

// ---- Test Shop ----
var Shop = artifacts.require("./Shop.sol");
contract("Shop",function(){
    it("Tests shop Initialization", async function(){       
        let meta = await Shop.deployed();
        let indexlen0 = await  meta.getShopIndexLength();
        console.log("        Initial Shop index length: " +  indexlen0);    
        assert.equal(indexlen0,1,"Shop index length should be 1"); 
    })
    it("Tests shop addition", async function(){       
        let meta = await Shop.deployed();
        await  meta.insertShop(0x65793cd72f42BE36d45559448fC8AB0987DA4E27,"Shop a",1,true);
        let indexlen1 = await  meta.getShopIndexLength();
        console.log("        Additional Shop index length " +  indexlen1);
        assert.equal(indexlen1,2,"Shop index length should be 2"); 
    })
    it("Tests shop 2's retrieval (address)", async function(){       
        let meta = await Shop.deployed();
        newaddr = await meta.getShopAtIndex(1);
        console.log("        Shows Shop 2's address: " + newaddr);        
        assert.equal(newaddr,0x65793cd72f42BE36d45559448fC8AB0987DA4E27,"New shop's address should match 0x65793cd72f42BE36d45559448fC8AB0987DA4E27"); 
    })
    it("Tests shop 2's retrieval (name)", async function(){       
        let meta = await Shop.deployed();
        newname0 = await meta.getShopName(0x65793cd72f42BE36d45559448fC8AB0987DA4E27);
        console.log("        Shows Shop 2's name: " + newname0);
        assert.equal(newname0,"Shop a","New shop's name should be 'Shop a'"); 
    })
    it("Tests active shops counts", async function(){       
        let meta = await Shop.deployed();
        activecount0 = await meta.getActiveShopCount();
        console.log("        Shows Active Shops count: " + activecount0);
        assert.equal(activecount0,2,"There should be 2 active shops"); 
    })
    it("Tests deactivation and change name of a shop", async function(){       
        let meta = await Shop.deployed();
        await  meta.updateShop(0x65793cd72f42BE36d45559448fC8AB0987DA4E27,"Shop zz",1,false);
        newname = await meta.getShopName(0x65793cd72f42BE36d45559448fC8AB0987DA4E27);
        console.log("        Post-update Shop 2's name: " + newname);
        assert.equal(newname,"Shop zz","Shop 2's Name should be 'Shop zz'"); 
    })
    it("Tests active shops counts (post-deactivation)", async function(){       
        let meta = await Shop.deployed();
        activecount1 = await meta.getActiveShopCount();
        console.log("        Post-update Active Shops count: " + activecount1);
        assert.equal(activecount1,1,"There should be 1 active shop"); 
    })
});



// ---- Test Coin ----
var Coin = artifacts.require("./Coin.sol");
contract("Coin",function(){
    it("Tests Coin Initialization", async function(){       
        let meta = await Coin.deployed();
        let indexlen0 = await  meta.getCoinIndexLength();
        console.log("        Coin index length: " +  indexlen0); 
        assert.equal(indexlen0,4,"There should be 4 default coins"); 
    })
    it("Tests Coin Name retrieval", async function(){       
        let meta = await Coin.deployed();
        let firstcoinname = await meta.getCoinNameAtIndex(0) ;      
        console.log("        Coin[0] Name: " + firstcoinname);  
        assert.equal(firstcoinname,"No Coin","Coin[0] Name should be 'No Coin'"); 
    })
     it("Tests additional Coin insert, shows Name", async function(){       
        let meta = await Coin.deployed();
        await meta.insertCoin("AncientCoin a"); 
        let nextcoinname = await meta.getCoinNameAtIndex(4) ;      
        console.log("        Coin[4] Name: " + nextcoinname); 
        assert.equal(nextcoinname,"AncientCoin a","Coin[4] Name should be 'AncientCoin a'"); 
    })
    it("Tests post-insert index length", async function(){       
        let meta = await Coin.deployed();
        let indexlen1 = await  meta.getCoinIndexLength();
        console.log("        Coin index length " +  indexlen1);
        assert.equal(indexlen1,5,"There should be 5 coins"); 
    })
    it("Tests Coin deletion and shows reduced index count", async function(){       
        let meta = await Coin.deployed();
        await meta.deleteCoin("AncientCoin a");
        let indexlen2 = await  meta.getCoinIndexLength();
        console.log("       Coin index length : " +  indexlen2);  
        assert.equal(indexlen2,4,"There should be 4 coins"); 
    })

}); 



// ---- Test Product ----
var Product = artifacts.require("./Product.sol");
contract("Product",function(accounts){
    it("Tests Product Initialization", async function(){       
        let meta = await Product.deployed();
        let indexlen0 = await  meta.getProductCount();
        console.log("        Product index count: " +  indexlen0); 
        assert.equal(indexlen0,1,"There should be 1 default product"); 
    })        
    it("Tests Product Name retrieval", async function(){       
        let meta = await Product.deployed();        
        let thisname = await meta.getproductNameAtIndex(0)   
        console.log("        Product[0] Name: " + thisname);  
        assert.equal(thisname,"Initial (No) Product","Product[0] Name should be 'Initial (No) Product'"); 
    })
    it("Tests Product Insertion", async function(){       
        let meta = await Product.deployed();     
        await  meta.insertProduct("Product a",1,1,"SHOP",true,500,30);            
        thisname = await meta.getproductNameAtIndex(1)   
        console.log("        Product[1] Name: " + thisname); 
        assert.equal(thisname,"Product a","Product[1] Name should be 'Product a'"); 
    })
    it("Tests Product Quantity retrieval", async function(){       
        let meta = await Product.deployed();
        let quant = await meta.getproductQuantAtIndex(1)   
        console.log("        Product[1] quantity: " + quant); 
        assert.equal(quant,500,"Product[1] quantity should be 500"); 
    })
    it("Tests Post-insert Product Count", async function(){       
        let meta = await Product.deployed();
        indexlen0 = await  meta.getProductCount();
        console.log("        Product index count: " +  indexlen0); 
        assert.equal(indexlen0,2,"There should be 2 Products"); 
    })
    it("Tests Product Update", async function(){       
        let meta = await Product.deployed();
        await meta.updateProduct("Product a",1,1,"SHOP",true,500,44);          
        let price = await meta.getproductPriceAtIndex(1);  
        console.log("        Product[1] price : " + price); 
        assert.equal(price,44,"Product[1]'s price should be 44"); 
    })
    it("Tests Product quantity increment", async function(){       
        let meta = await Product.deployed();
        await meta.incrementProduct("Product a",1,1,"SHOP",true,1000,44);          
        quant = await meta.getproductQuantAtIndex(1)   
        console.log("        Product[1] quantity: " + quant); 
        assert.equal(quant,1500,"Product[1]'s quantity should be 1500"); 
    })
    it("Tests Product quantity decrement", async function(){       
        let meta = await Product.deployed();
        await meta.decrementProduct("Product a",1,1,"SHOP",true,100,44);          
        quant = await meta.getproductQuantAtIndex(1)   
        console.log("        Product[1] quantity: " + quant); 
        assert.equal(quant,1400,"Product[1]'s quantity should be 1400"); 
    })
    it("Tests Product deletion", async function(){       
        let meta = await Product.deployed();
        await meta.deleteProductatIndex(1);
        indexlen0 = await  meta.getProductCount();
        console.log("        Product index count: " +  indexlen0);
        assert.equal(indexlen0,1,"There should be 1 product"); 
    })
});



// ---- Test Shopper ----
var Shopper = artifacts.require("./Shopper.sol");
contract("Shopper",function(accounts){
    const price = web3.toWei(1, "ether")
    it("Tests Shopper initialization ", async function(){       
        let meta = await Shopper.deployed();
        let indexlen0 = await  meta.getShopperIndexLength();
        console.log("        Shopper index count: " +  indexlen0); 
        assert.equal(indexlen0,1,"There should be 1 default Shopper");         
    })
    it("Tests Shopper money transfer", async function(){       
        let meta = await Shopper.deployed();       

        let acc0bal = await web3.eth.getBalance(accounts[0]).toNumber();
        console.log("        Acc0 address: " +  accounts[0]); 
        console.log("        Acc0 balance: " +  acc0bal); 

        let acc1bal = await web3.eth.getBalance(accounts[1]).toNumber();
        console.log("        Acc1 address: " +  accounts[1]); 
        console.log("        Acc1 balance: " +  acc1bal); 

        let transferresult = await  meta.Transfer(accounts[1],1, 20, {from: accounts[0], value:price});
        console.log("        Shopper transfer done"); 

        acc0bal = await web3.eth.getBalance(accounts[0]).toNumber();
        console.log("        Acc0 balance: " +  acc0bal); 
        acc1bal = await web3.eth.getBalance(accounts[1]).toNumber();
        console.log("        Acc1 balance: " +  acc1bal);          
    })
});



// ---- Tests Shop money transfer  ----
var Shop = artifacts.require("./Shop.sol");
contract("Shop",function(accounts){
    const price = web3.toWei(2, "ether")
    it("Tests Shop initialization", async function(){       
        let meta = await Shop.deployed();
        let indexlen0 = await  meta.getShopIndexLength();
        console.log("        Shop index count: " +  indexlen0); 
        assert.equal(indexlen0,1,"There should be 1 default Shop");         
    })
    it("Tests Shop money transfer", async function(){       
        let meta = await Shop.deployed();       

        let acc0bal = await web3.eth.getBalance(accounts[0]).toNumber();
        console.log("        Acc0 address: " +  accounts[0]); 
        console.log("        Acc0 balance: " +  acc0bal); 

        let acc1bal = await web3.eth.getBalance(accounts[1]).toNumber();
        console.log("        Acc1 address: " +  accounts[1]); 
        console.log("        Acc1 balance: " +  acc1bal); 

        let transferresult = await  meta.Transfer(accounts[1],1, 20,  {from: accounts[0], value:price});
        console.log("        Shop transfer result done"); 

        acc0bal = await web3.eth.getBalance(accounts[0]).toNumber();
        console.log("        Acc0 balance: " +  acc0bal); 
        acc1bal = await web3.eth.getBalance(accounts[1]).toNumber();
        console.log("        Acc1 balance: " +  acc1bal);          
    })
});




// ---- Test Multi-contract access ----
var Shop = artifacts.require("./Shop.sol");
var Shopkeep = artifacts.require("./Shopkeep.sol");
contract("Multi-Contract",function(accounts){    
    it("Tests Multi-contract", async function(){       
        let meta = await Shop.deployed();
        let indexlen0 = await  meta.getShopIndexLength();
        console.log("        Shop index count: " +  indexlen0);         
        let meta2 = await Shopkeep.deployed();
        let indexlen = await  meta2.getShopkeepIndexLength();
        console.log("        Initial Shopkeep index length: " +  indexlen);  
        assert.equal(indexlen0+indexlen0,11,"Managed to access the storage of 2 contracts.");      
    })
});


