//var Coinshop = artifacts.require("./Coinshop.sol");
//contract("Coinshop",function(accounts){
//    var coinshopInstance;
    /*  ------------------------ old   start -----------------------
    it("initializes with two candidates", function() {
        return Election.deployed().then(function(instance) {
            return instance.candidatesCount();
        }).then(function(count) {
            assert.equal(count,2);
        });
    });

   it("initializes the candidates with the correct values", function() {
       return Election.deployed().then(function(instance) {
           electionInstance = instance;
           return electionInstance.candidates(1);
       }).then(function(candidate) {
           assert.equal(candidate[0],1,"contains the correct id");
           assert.equal(candidate[1], "Candidate 1","contains the correct name");
           assert.equal(candidate[2],0,"contains the correct votes count");
           return electionInstance.candidates(2);
       }).then(function(candidate) {
           assert.equal(candidate[0],2,"contains the correct id");
           assert.equal(candidate[1], "Candidate 2","contains the correct name");
           assert.equal(candidate[2],0,"contains the correct votes count");
       });
    });

    it("allows a voter to cast a vote", function() {
        return Election.deployed().then(function(instance) {
            electionInstance = instance;
            candidateId = 1;
            return electionInstance.vote(candidateId, {from:accounts[0] });
        }).then(function(receipt) {
            assert.equal(receipt.logs.length,1,"an event was triggered");
            assert.equal(receipt.logs[0].event,"votedEvent","the event type is correct");
            assert.equal(receipt.logs[0].args._candidateId.toNumber(),candidateId,"the candidate id is correct");
            return electionInstance.voters(accounts[0]);
        }).then(function(voted) {
            assert(voted, "the voter was marked as voted");
            return electionInstance.candidates(candidateId);
        }).then(function(candidate) {
            var voteCount = candidate[2];
            assert.equal(voteCount,1,"increments the candidate's vote count");
        })
    });


    it("throws an exception for invalid candidates", function() {
        return Election.deployed().then(function(instance) {
            electionInstance = instance;
            return electionInstance.vote(99, {from: accounts[1] })
       }).then(assert.fail).catch(function(error) {
           assert(error.message.indexOf('revert') >= 0 , "error message must contain revert");
           return electionInstance.candidates(1);
       }).then(function(candidate1){
           var voteCount = candidate1[2];
           assert.equal(voteCount,1,"candidate 1 did not receive any votes");
           return electionInstance.candidates(2);
       }).then(function(candidate2){
           var voteCount = candidate2[2];
           assert.equal(voteCount,0,"candidate 2 did not receive any votes");
       });
    });

    it("throws an exception for double voting", function(){
        return Election.deployed().then(function(instance) {
            electionInstance = instance;
            candidateId = 2;
            electionInstance.vote(candidateId, {from: accounts[1] });
            return electionInstance.candidates(candidateId);
        }).then(function(candidate) {
            var voteCount = candidate[2];
            assert.equal(voteCount,1,"accepts first vote");
            // try to vote again
            return electionInstance.vote(candidateId, {from: accounts[1] });
        }).then(assert.fail).catch(function(error) {
            assert(error.message.indexOf('revert') >= 0, "error message must contain revert");
            return electionInstance.candidates(1);
        }).then(function(candidate1) {
            var voteCount = candidate1[2];
            assert.equal(voteCount ,1,"candidate 1 did not receive any votes");
            return electionInstance.candidates(2);
        }).then(function(candidate2) {
            var voteCount = candidate2[2];
            assert.equal(voteCount,1,"candidate 2 did not receive any votes");
        });
    });
    */
    /*
    it("shows admin list", function(){
        return Election.deployed().then(function(instance) {
            electionInstance = instance;
            //adminId = 1;
            return electionInstance.adminsCount();
        }).then(function(cadminscount){    
            var cadminsCount = cadminscount;       
            console.log("cadminsCount: " + cadminsCount );
            return electionInstance.getAdmins.call();            
        }).then(function(admins){
            for (var i = 0; i < admins.length; i++) {
                console.log("i: " + i);
             //   if (admins[i] != '0x0000000000000000000000000000000000000000') {
                    console.log("Address at " + i + ": " + admins[i]);
            //    }
            }
        });
    });
    it("removes an admin", function(){
        return Election.deployed().then(function(instance) {
            electionInstance = instance;
            adminId = 1;
            electionInstance.removeAdmin(adminId, {from: accounts[0] });
            return electionInstance.adminarray(adminId);
        }).then(function(admin) {
            var adminaddr = admin;
            assert.equal(adminaddr,0x0,"admin has not been deleted");
        });
    });

        ------------------------ old  end -----------------------------
    */
   
   /* --------------- Tests for Admins  ------------- */
/*   
var Admin = artifacts.require("./Admin.sol");
contract("Admin",function(){
    it("Shows default admin count (should be 3)", async function() {
        let meta = await Admin.deployed();
        let admincount = await meta.getAdminCount();
        console.log("        Admin count: " + admincount);
        assert.equal(admincount.valueOf(),3,"There should be 3 default admins");
    });
    
    it("Shows admins struct contents",  async function(){
        let meta = await Admin.deployed();
        let admincount = await meta.getAdminCount();
        for (let  i=0; i < admincount; i++){ 
            let adminAddr = await  meta.getAdminAtIndex(i);              
            console.log("        i: "+ i + " Address = " + adminAddr );
            let anAdmin = await meta.getAdmin(adminAddr);
            // Assign first element in struct to AdminName
            AdminName = anAdmin[0];
            console.log("        Name: " + AdminName);
        }
    });
  
    it("Deletes Admin 2", async function(){
        let meta = await Admin.deployed();       
        let adminAddr = await meta.getAdminAtIndex(2);         
        await meta.deleteAdmin(adminAddr);  
    });       

    it("Shows admins struct contents",  async function(){
        let meta = await Admin.deployed();
        let admincount = await meta.getAdminCount();
        for (let  i=0; i < admincount; i++){ 
            let adminAddr = await  meta.getAdminAtIndex(i);              
            console.log("        i: "+ i + " Address = " + adminAddr );
            let anAdmin = await meta.getAdmin(adminAddr);
            // Assign first element in struct to AdminName
            AdminName = anAdmin[0];
            console.log("        Name: " + AdminName);
        }
    });

    it("Tests post-delete admin count (should be 2)", async function() {
        let meta = await Admin.deployed();
        let admincount = await meta.getAdminCount();
        console.log("      Admin count: " + admincount);
        assert.equal(admincount.valueOf(),2,"there should be 2 admins left")
    });

   it("Adds an admin", async function(){
       let meta = await Admin.deployed();
       await meta.insertAdmin("0x8ebeb47bed606bfa6b0ba49256f291dd575ef1f3","Admin 3");       
   });

   it("Shows admins struct contents",  async function(){
    let meta = await Admin.deployed();
    let admincount = await meta.getAdminCount();
    for (let  i=0; i < admincount; i++){ 
        let adminAddr = await  meta.getAdminAtIndex(i);              
        console.log("        i: "+ i + " Address = " + adminAddr );
        let anAdmin = await meta.getAdmin(adminAddr);
        // Assign first element in struct to AdminName
        AdminName = anAdmin[0];
        console.log("        Name: " + AdminName);
    }
    });

    it("Tests post-insert admin count (should be 3)", async function() {
        let meta = await Admin.deployed();
        let admincount = await meta.getAdminCount();
        console.log("      Admin count: " + admincount);
        assert.equal(admincount.valueOf(),3,"there should be 3 admins ");
    });

    it("Updates an admin", async function(){
        let meta = await Admin.deployed();
        let adminAddr = await meta.getAdminAtIndex(2);
        await meta.updateAdminName(adminAddr,"Pete");           
    });
 
    it("Shows admins struct contents",  async function(){
        let meta = await Admin.deployed();
        let admincount = await meta.getAdminCount();
        for (let  i=0; i < admincount; i++){ 
            let adminAddr = await  meta.getAdminAtIndex(i);              
            console.log("        i: "+ i + " Address = " + adminAddr );
            let anAdmin = await meta.getAdmin(adminAddr);
            // Assign first element in struct to AdminName
            AdminName = anAdmin[0];
            console.log("        Name: " + AdminName);
        }
    });     
});

*/

/* --------------- Tests for Shopkeeps ---------------*/
/*
var Shopkeep = artifacts.require("./Shopkeep.sol");
contract("Shopkeep",function(){
    it("Shows default shopkeep counts (should be 3)", async function() {
        let meta = await Shopkeep.deployed();
        let shopkeepcount = await meta.getShopkeepCount();
        console.log("        Shopkeep count: " + shopkeepcount);
        assert.equal(shopkeepcount.valueOf(),3,"There should be 3 default shop keepers");
    });

    it("Shows shopkeep struct contents",  async function(){
        let meta = await Shopkeep.deployed();
        let shopkeepcount = await meta.getShopkeepCount();
        for (let  i=0; i < shopkeepcount; i++){ 
            let shopkeepAddr = await  meta.getShopkeepAtIndex(i);              
            console.log("        i: "+ i + " Address = " + shopkeepAddr );
            let aShopkeep = await meta.getShopkeep(shopkeepAddr);
            // Assign first element in struct to AdminName
            shopkeepName = aShopkeep[0];
            console.log("        Name: " + shopkeepName);
        }
    });

    it("Deletes Shopkeep 1", async function(){
        let meta = await Shopkeep.deployed();       
        let shopkeepAddr = await meta.getShopkeepAtIndex(1);         
        await meta.deleteShopkeep(shopkeepAddr);  
    });        

    it("Tests post-delete shopkeep count (should be 2)", async function() {
        let meta = await Shopkeep.deployed();
        let shopkeepcount = await meta.getShopkeepCount();
        console.log("      Shopkeep count: " + shopkeepcount );
        assert.equal(shopkeepcount .valueOf(),2,"there should be 2 shopkeeps left")
    });


    it("Adds a shopkeep", async function(){
    let meta = await Shopkeep.deployed();
    await meta.insertShopkeep("0x9640b9a7eA454F59c259454E4940A0cCE2c193c4","Shopkeep 3");       
    });

    it("Tests post-insert shopkeep count (should be 3)", async function() {
        let meta = await Shopkeep.deployed();
        let shopkeepcount = await meta.getShopkeepCount();
        console.log("      Shopkeep count: " + shopkeepcount );
        assert.equal(shopkeepcount .valueOf(),3,"there should be 3 shopkeeps ")
    });
    
    it("Updates a shopkeep", async function(){
        let meta = await Shopkeep.deployed();
        let shopkeepAddr = await meta.getShopkeepAtIndex(1);
        await meta.updateShopkeepName(shopkeepAddr,"Mary");           
    });

    it("Shows shopkeep struct contents",  async function(){
        let meta = await Shopkeep.deployed();
        let shopkeepcount = await meta.getShopkeepCount();
        for (let  i=0; i < shopkeepcount; i++){ 
            let shopkeepAddr = await  meta.getShopkeepAtIndex(i);              
            console.log("        i: "+ i + " Address = " + shopkeepAddr );
            let aShopkeep = await meta.getShopkeep(shopkeepAddr);
            // Assign first element in struct to AdminName
            shopkeepName = aShopkeep[0];
            console.log("        Name: " + shopkeepName);
        }
    });
    
});

*/

/* --------------- Test for shops -------------- */

var Shop = artifacts.require("./Shop.sol");
contract("Shop",function(){
    
    it("Shows default shop counts (should be 3)", async function() {
        let meta = await Shop.deployed();
        let shopcount = await meta.getShopCount();
        console.log("        Shop count: " + shopcount);
        assert.equal(shopcount.valueOf(),3,"There should be 3 default shops");
    });
    /*
    it("Tests for fake shop address",  async function(){
        let meta = await Shop.deployed();
        let boolreturn = await meta.isShop("0xCFEe947BC712602c43eC2773E787aDdb55E4696b" )    ;           
        console.log("        Result:" + boolreturn );
        assert.equal(false,boolreturn,"Fake address should not be part of admins.");
    });

    it("Tests for correct shop address",  async function(){
        let meta = await Shop.deployed();
        let boolreturn = await meta.isShop("0x79eaE799c912f00d97962160a8Fa9d52541e9A5a" )    ;           
        console.log("        Result:" + boolreturn );
        assert.equal(true,boolreturn,"This address should be in shops list.");
    });

    it("Shows shop address at index 2", async function(){
        let meta = await Shop.deployed();       
        let shopAddr = await meta.getShopAtIndex(2);  
        console.log("        shopAddress:" + shopAddr );       
        //await meta.updateShop(shopAddr,"Shop 2",0,false);  
    });

    it("Shows active shop count", async function() {
        let meta = await Shop.deployed();
        let Activeshopscount = await meta.getActiveShopCount();
        console.log("        Active Shops count: " + Activeshopscount );
       // assert.equal(Activeshopscount.valueOf(),3,"there should be active 3 shops ")
    }); 


    it("Deactivate Shop2", async function(){
        let meta = await Shop.deployed();       
        let shopAddr = await meta.getShopAtIndex(2);         
        await meta.updateShop(shopAddr,"Shop 2",0,false);  
    });

    it("Shows active shop count", async function() {
        let meta = await Shop.deployed();
        let Activeshopscount = await meta.getActiveShopCount();
        console.log("        Active Shops count: " + Activeshopscount );
       // assert.equal(Activeshopscount.valueOf(),3,"there should be active 3 shops ")
    }); 

*/
    it("Shows shop struct contents",  async function(){
        let meta = await Shop.deployed();
        let shopcount = await meta.getShopCount();
        for (let  i=0; i < shopcount; i++){ 
            let shopAddr = await  meta.getShopAtIndex(i);              
            console.log("        i: "+ i + " Address = " + shopAddr );
            let aShop = await meta.getShop(shopAddr);
            // Assign  elements in struct to variables
            shopName = aShop[0];
            shopOwnerid = aShop[2];
            shopActiveStatus = aShop[3];
            console.log("        Name: " + shopName + " Ownerid: " + shopOwnerid + " ActiveStatus: " + shopActiveStatus);
        }
    });
    /*
    it("Adds a shop", async function(){
    let meta = await Shop.deployed();
    await meta.insertShop("0x3957172A731d988f479E23b9ed0338e3BdCA535e","Shop z",0,true);       
    });   
    
    it("Shows shop struct contents",  async function(){
        let meta = await Shop.deployed();
        let shopcount = await meta.getShopCount();
        for (let  i=0; i < shopcount; i++){ 
            let shopAddr = await  meta.getShopAtIndex(i);              
            console.log("        i: "+ i + " Address = " + shopAddr );
            let aShop = await meta.getShop(shopAddr);
            // Assign  elements in struct to variables
            shopName = aShop[0];
            shopOwnerid = aShop[2];
            shopActiveStatus = aShop[3];
            console.log("        Name: " + shopName + " Ownerid: " + shopOwnerid + " ActiveStatus: " + shopActiveStatus);
        }
    });

    it("Shows shop z's (index=3) parent shopkeep ID",  async function(){
        let meta = await Shop.deployed();
        let parentid = await meta.getparentShopkeepNameAtShopIndex(3);
        console.log("       ParentShopKeepId = " + parentid ); 
    });
    */
});


    
// --------------- Tests for Coins  -------------
/*
var Coin = artifacts.require("./Coin.sol");
contract("Coin",function(){  
    /*
    it("Shows default Coin count (should be 3)", async function() {
            let meta = await Coin.deployed();
            let coincount = await meta.getCoinCount();
            console.log("        Coin count: " + coincount);
            assert.equal(coincount.valueOf(),3,"There should be 3 initial coins");
    });  
    
    it("Adds a Coin", async function() {
        let meta = await Coin.deployed();
        await meta.insertCoin("Coin ZZ");  
    });  

    it("Shows Coin count (should be 4)", async function() {
        let meta = await Coin.deployed();
        let coincount = await meta.getCoinCount();
        console.log("        Coin count: " + coincount);
        assert.equal(coincount.valueOf(),4,"There should be 4 coins");
    });  

    // Still need to add : delete a coin (build in exception if coin still exists in products struct)


    // Test coin count post-delete

    // Test : try to delete a coin that still exists in product struc. -- track event/log to grab revert and content of error
    
    it("Shows coin struct contents",  async function(){
        let meta = await Coin.deployed();
        let coincount = await meta.getCoinCount();
        for (let  i=0; i < coincount; i++){ 
            let coinName = await meta.getCoin(i);
            console.log("        i: "+ i + " Coin Name = " + coinName );
        }
    });

    it("Adds a Coin", async function() {
        let meta = await Coin.deployed();
        await meta.insertCoin("Coin Xxx");  
    });  
    
    
   
});
*/



   
// --------------- Tests for Shoppers  -------------*/
/*    
var Shopper = artifacts.require("./Shopper.sol");
contract("Shopper",function(){
    it("Shows default shopper count (should be 2)", async function() {
        let meta = await Shopper.deployed();
        let shoppercount = await meta.getShopperCount();
        console.log("        Shopper count: " + shoppercount);
        assert.equal(shoppercount.valueOf(),2,"There should be 2 default shoppers");
    });
    
    it("Shows shopper structs contents",  async function(){
        let meta = await Shopper.deployed();
        let shoppercount = await meta.getShopperCount();
        for (let  i=0; i < shoppercount; i++){ 
            let shopperAddr = await  meta.getShopperAtIndex(i);              
            console.log("        i: "+ i + " Address = " + shopperAddr );
            let aShopper = await meta.getShopper(shopperAddr);
            // Assign first element in struct to AdminName
            ShopperName = aShopper[0];
            console.log("        Name: " + ShopperName);
        }
    });

    it("Delete Shopper 2", async function(){
        let meta = await Shopper.deployed();       
        let shopperAddr = await meta.getShopperAtIndex(1);         
        await meta.deleteShopper(shopperAddr);  
    });     

    it("Tests post-delete shopper count (should be 1)", async function() {
        let meta = await Shopper.deployed();
        let shoppercount = await meta.getShopperCount();
        console.log("        Shopper count: " + shoppercount);
        assert.equal(shoppercount.valueOf(),1,"there should be 1 shopper left")
    });

   it("Adds a shopper", async function(){
       let meta = await Shopper.deployed();
       await meta.insertShopper("0xdeE1EC8E71ebbfBcCCa4cDb070d95930CBa36681","Shooper 3");       
   });

    it("Tests post-insert shopper count (should be 2)", async function() {
    let meta = await Shopper.deployed();
    let shoppercount = await meta.getShopperCount();
    console.log("        Shopper count: " + shoppercount);
    assert.equal(shoppercount.valueOf(),2,"there should be 2 Shopper ");
    });

    it("Updates a shopper", async function(){
        let meta = await Shopper.deployed();
        let shopperAddr = await meta.getShopperAtIndex(1);
        await meta.updateShopperName(shopperAddr,"Bob");           
    });

    it("Shows shopper structs contents",  async function(){
        let meta = await Shopper.deployed();
        let shoppercount = await meta.getShopperCount();
        for (let  i=0; i < shoppercount; i++){ 
            let shopperAddr = await  meta.getShopperAtIndex(i);              
            console.log("        i: "+ i + " Address = " + shopperAddr );
            let aShopper = await meta.getShopper(shopperAddr);
            // Assign first element in struct to AdminName
            ShopperName = aShopper[0];
            console.log("        Name: " + ShopperName);
        }
    });
});
*/


// Test Products
/*
var Product = artifacts.require("./Product.sol");
contract("Product",function(){
         
    it("Shows default product counts (should be 6)", async function() {
        let meta = await Product.deployed();
        let productcount = await meta.getProductCount();
        console.log("        Product count: " + productcount);
        assert.equal(productcount.valueOf(),6,"There should be 6 default products");
    });      

    it("Shows Product struct contents",  async function(){
        let meta = await Product.deployed();
        let productcount = await meta.getProductCount();
        for (let  i=0; i < productcount; i++)
        { 
            let cleanproductname = await meta.showProductNameAtIndex(i);
            let productname = await  meta.getProductAtIndex(i);              
            console.log("        i: "+ i + " Product Name = " + cleanproductname );
            let aProduct = await meta.getProduct(productname);
            // Assign  elements in struct to Variables            
            productindex = aProduct[0];            
            productCoinId = aProduct[1];
            productOwnerId = aProduct[2];     
            productOwnerType = aProduct[3];      
            productActiveStatus = aProduct[4];            
            productQuantity = aProduct[5];
            productPrice = aProduct[6];
            console.log("        index: " + productindex
                        + " CoinId: " + productCoinId 
                        + " OwnerId: " + productOwnerId
                        + " OwnerType: " + productOwnerType                    
                        + " ActiveStatus: " + productActiveStatus
                        + " Price: " + productPrice
                        + " Quantity: " + productQuantity
            );
                                
        }        
        });  
    
    it("Adds a product", async function(){        
        let meta = await Product.deployed();
        await meta.insertProduct("Product y",3,1,"SHOP",true,300,20);       
    });
    
    it("Tests post-addition active product count (should be 7)", async function() {
            let meta = await Product.deployed();
            let Activeproductscount = await meta.getActiveProductCount();
            console.log("        Active Products count: " + Activeproductscount );
            assert.equal(Activeproductscount.valueOf(),7,"there should be 7 active products left")
    });    


    it("Shows Product struct contents",  async function(){
        let meta = await Product.deployed();
        let productcount = await meta.getProductCount();
        for (let  i=0; i < productcount; i++)
        { 
            let cleanproductname = await meta.showProductNameAtIndex(i);
            let productname = await  meta.getProductAtIndex(i);              
            console.log("        i: "+ i + " Product Name = " + cleanproductname );
            let aProduct = await meta.getProduct(productname);
            // Assign  elements in struct to Variables            
            productindex = aProduct[0];            
            productCoinId = aProduct[1];
            productOwnerId = aProduct[2];     
            productOwnerType = aProduct[3];      
            productActiveStatus = aProduct[4];            
            productQuantity = aProduct[5];
            productPrice = aProduct[6];
            console.log("        index: " + productindex
                        + " CoinId: " + productCoinId 
                        + " OwnerId: " + productOwnerId
                        + " OwnerType: " + productOwnerType                    
                        + " ActiveStatus: " + productActiveStatus
                        + " Price: " + productPrice
                        + " Quantity: " + productQuantity
            );
                                
        }        
    }); 
     
});  
*/

// Test ProductMaintenance
var Productmaintenance = artifacts.require("./Productmaintenance.sol");
contract("Productmaintenance",function(accounts){
/*    
    it("Tests if product 1's owner is address 0x153474eCd4e573E960a2a54e6e37315CCEEfa084",  async function(){
        let meta = await Productmaintenance.deployed();
        let boolreturn = await meta.isReallyOwnerbyIndex(1,"0x153474eCd4e573E960a2a54e6e37315CCEEfa084" )    ; 
        console.log("        Boolreturn = " + boolreturn );            
        assert.equal(true,boolreturn,"owner address is different from the value passed.");
    });
*/
it("Shows ShopIndex length, from productmaintenance contract",  async function(){
    let meta = await Productmaintenance.deployed();
    let shopidxlength = await meta.showShopIndexLength();   ; 
    console.log("        Shop index length = " + shopidxlength  );          
});
    
/*
    it("Tests if Product a's owner is address 0xCFEe947BC712602c43eC2773E787aDdb55E4696b",  async function(){
            let meta = await Productmaintenance.deployed();
            let boolreturn = await meta.isReallyOwnerbyName("Product a","0xCFEe947BC712602c43eC2773E787aDdb55E4696b" )    ; 
            console.log("        Boolreturn = " + boolreturn );            
            assert.equal(true,boolreturn,"owner address is different from the value passed.");
    }); 

    it("Adds a product", async function(){
        let meta = await Productmaintenance.deployed();
        await meta.insertProduct("Product yy",3,1,"SHOP",true,300,20);        
    });
    */
    
    it("Shows Product struct contents",  async function(){
        let meta = await Productmaintenance.deployed();
        let productcount = await meta.getProductCount();
        for (let  i=0; i < productcount; i++){ 
            let cleanproductname = await meta.showProductNameAtIndex(i);
            let productname = await  meta.getProductAtIndex(i);              
            console.log("        i: "+ i + " Product Name = " + cleanproductname );
            let aProduct = await meta.getProduct(productname);
            // Assign  elements in struct to Variables                
            productindex = aProduct[0];            
            productCoinId = aProduct[1];
            productOwnerId = aProduct[2];     
            productOwnerType = aProduct[3];      
            productActiveStatus = aProduct[4];            
            productQuantity = aProduct[5];
            productPrice = aProduct[6];
            console.log("        index: " + productindex
                        + " CoinId: " + productCoinId 
                        + " OwnerId: " + productOwnerId
                        + " OwnerType: " + productOwnerType                    
                        + " ActiveStatus: " + productActiveStatus
                        + " Price: " + productPrice
                        + " Quantity: " + productQuantity
            );
                                
        }
    });
    
    /*
    it("Deletes Product d",  async function(){
        let meta = await Productmaintenance.deployed();
        await meta.deleteProduct("Product d" );                                
    });   
           
    it("Updates Product yy : reduce quantity",  async function(){
        let meta = await Productmaintenance.deployed();
        await meta.updateProduct("Product yy" ,2,2,'SHOP',true,70,17);                              
    });

    
    it("Shows Product struct contents",  async function(){
        let meta = await Productmaintenance.deployed();
        let productcount = await meta.getProductCount();
        for (let  i=0; i < productcount; i++){ 
            let cleanproductname = await meta.showProductNameAtIndex(i);
            let productname = await  meta.getProductAtIndex(i);              
            console.log("        i: "+ i + " Product Name = " + cleanproductname );
            let aProduct = await meta.getProduct(productname);
            // Assign  elements in struct to Variables                
            productindex = aProduct[0];            
            productCoinId = aProduct[1];
            productOwnerId = aProduct[2];     
            productOwnerType = aProduct[3];      
            productActiveStatus = aProduct[4];            
            productQuantity = aProduct[5];
            productPrice = aProduct[6];
            console.log("        index: " + productindex
                        + " CoinId: " + productCoinId 
                        + " OwnerId: " + productOwnerId
                        + " OwnerType: " + productOwnerType                    
                        + " ActiveStatus: " + productActiveStatus
                        + " Price: " + productPrice
                        + " Quantity: " + productQuantity
            );
                                
        }
    });
    */    
});



// Still to add (productmaintenance)
// upon 'buy' transaction,
// change the Ownerid of the x number of coins from the shopid to the shopper id
// transfer money from shopper to shop
// reduce quantity of product
// need another function: transfer money from shop to shopkeep
// Do a lot of 'can't do this functionality still' and tests.


    /* sample code for event / log tracking
        return electionInstance.vote(candidateId, {from:accounts[0] });
        }).then(function(receipt) {
        assert.equal(receipt.logs.length,1,"an event was triggered");
        assert.equal(receipt.logs[0].event,"votedEvent","the event type is correct");
        assert.equal(receipt.logs[0].args._candidateId.toNumber(),candidateId,"the candidate id is correct");
    */

// Still to test
    /*    
    it("Adds quantity to new owner",  async function(){
        let meta = await Productmaintenance.deployed();
        await meta.incrementProduct("Product a" ,1,1,'SHOPPER',true,7000,1);                              
    });

    // edit this, still works with product, not prodmaint
    it("Deletes product at index 5", async function() {
        let meta = await Product.deployed();
        let resultval = await meta.deleteProduct(5);
        console.log("        Product 5 deletion result " + resultval );       
    }); 

    it("Tests post-deletion product count (active+inactive) (should be 5)", async function() {
        let meta = await Product.deployed();
        let Productscount = await meta.getProductCount();
        console.log("        Products count: " +Productscount );
        assert.equal(Productscount.valueOf(),5,"there should be 5 (active + inactive) products left")
    });  
    
    */
