App = {
  web3Provider: null,
  contracts: {},

  init: function() {  
    //sets up Web3 provider ,then initializes contracts 
    App.initWeb3(); 
  },

  initWeb3: function() {
    if (typeof web3 !== 'undefined') {
      App.web3Provider = web3.currentProvider;
    } else {
      App.web3Provider = new Web3.providers.HttpProvider('http://localhost:8545');
    }
    web3 = new Web3(App.web3Provider);
    return App.initContract();
  },

  initContract: function() {
    $.getJSON('Shop.json',function(data1) {
      var ShopArtifact = data1;
      App.contracts.Shop = TruffleContract(ShopArtifact);
      App.contracts.Shop.setProvider(App.web3Provider);
      //console.log("Shop contract loaded");   
      //return App.consolelog();
    })

    $.getJSON('MaintLibrary.json',function(data2) {
      var MaintLibraryArtifact = data2;
      App.contracts.MaintLibrary = TruffleContract(MaintLibraryArtifact);
      App.contracts.MaintLibrary.setProvider(App.web3Provider);
      //return App.consolelog();
    })

    $.getJSON('Admin.json',function(data3) {
      var AdminArtifact = data3;
      App.contracts.Admin = TruffleContract(AdminArtifact);
      App.contracts.Admin.setProvider(App.web3Provider);
      //return App.consolelog();
    })

    $.getJSON('Shopkeep.json',function(data4) {
      var ShopkeepArtifact = data4;
      App.contracts.Shopkeep = TruffleContract(ShopkeepArtifact);
      App.contracts.Shopkeep.setProvider(App.web3Provider);
      //return App.consolelog();
    })

    $.getJSON('Coin.json',function(data5) {
      var CoinArtifact = data5;
      App.contracts.Coin = TruffleContract(CoinArtifact);
      App.contracts.Coin.setProvider(App.web3Provider);
      //return App.consolelog();
    })

    $.getJSON('Shopper.json',function(data6) {
      var ShopperArtifact = data6;
      App.contracts.Shopper = TruffleContract(ShopperArtifact);
      App.contracts.Shopper.setProvider(App.web3Provider);
      //return App.consolelog();
    })

    $.getJSON('Product.json',function(data7) {
      var ProductArtifact = data7;
      App.contracts.Product = TruffleContract(ProductArtifact);
      App.contracts.Product.setProvider(App.web3Provider);
      //return App.consolelog();
    })
    return App.bindEvents();
  },

  bindEvents: function() {
    $(document).on('click', '.btn-startit', App.initVisitor);

    $(document).on('click', '.btn-adminm', App.showAdmin);
    $(document).on('click', '.btn-add-new-admin', App.addAdmin);
    $(document).on('click', '.btn-del-admin', App.delAdmin); 

    $(document).on('click', '.btn-shopkpm', App.showShopkeep);
    $(document).on('click', '.btn-add-new-shopkeep', App.addShopkeep);
    $(document).on('click', '.btn-del-shopkeep', App.delShopkeep); 
  
    $(document).on('click', '.btn-shopm', App.showShop);
    $(document).on('click', '.btn-add-new-shop', App.addShop);
    $(document).on('click', '.btn-del-shop', App.delShop); 

    $(document).on('click', '.btn-coinm', App.showCoins);

    $(document).on('click', '.btn-productm', App.showProduct);
    $(document).on('click', '.btn-add-new-product', App.addProduct);
    $(document).on('click', '.btn-update-product', App.updateProduct);
    $(document).on('click', '.btn-withdraw', App.withdrawFunds);

    
    $(document).on('click', '.btn-browse', App.browseProduct); 
    $(document).on('click', '.btn-buy-product', App.buyProduct); 

   // $(document).on('click', '.btn-shopper', App.showshoppercoins); 

          
  },

  /* // Good example of handling address array returned ?
  markAdopted: function(adopters, account) {
    var adoptionInstance;
    App.contracts.Adoption.deployed().then(function(instance) {
      adoptionInstance = instance;
      return adoptionInstance.getAdopters.call();
    }).then(function(adopters) {
      for (i=0; i< adopters.length; i++) {
        if (adopters[i] !== '0x0000000000000000000000000000000000000000') {
          $('.panel-pet').eq(i).find('button').text('Success').attr('disabled',true);
        }
      }
    }).catch(function(err) {
      console.log(err.message);
    });
  },
*/
showAdmin: function(){     
    document.getElementById('PageTitle').innerHTML = '<h2>Admin Menu</h2>'; 
    document.getElementById('PageTitle').style.display = 'inline'; 
    document.getElementById('adminRow').style.display = 'none'; 
    document.getElementById('adminRow').style.display = 'inline';        

    // Clean the page
    var adminRow = $('#adminRow');   
    adminRow.html(' ');
    var shopkeepRow = $('#shopkeepRow');
    shopkeepRow.html(' ');
    var shopRow = $('#shopRow');
    shopRow.html(' '); 
    var coinRow = $('#coinRow');
    coinRow.html(' '); 
    var productRow = $('#productRow');
    productRow.html(' ');
    var shopperRow = $('#shopperRow');
    shopperRow.html(' ');
    var productbuyRow = $('#productbuyRow');
    productbuyRow.html(' ');


    web3.eth.getAccounts( async function(error,accounts) {
      if (error) {
        console.log(error);
      }
      var useraccount = accounts[0];
      var accstatus=$('#acc-status');

      web3.eth.getBalance(useraccount, function(err, balance) {
        if (err === null) {
          var accbalance = web3.fromWei(balance, "ether") + " ETH";
          accstatus.html(' ');
          accstatus.append('Your address: '+useraccount+'<br>');
          accstatus.append(' Your Balance: '+accbalance);
          document.getElementById('acc-status').style.display = 'inline'; 
        }
      })

      let adminInstance = await App.contracts.Admin.deployed();
      let shopkeepInstance = await App.contracts.Shopkeep.deployed();

      let admincount = await adminInstance.getAdminIndexLength();
      //console.log("Admin count:" + admincount);
      var adminRow = $('#adminRow');
      adminRow.html(' ');
      var adminTemplate = $('#adminTemplate');  
      var adminaddformTemplate = $('#adminaddformTemplate');
      var admindelformTemplate = $('#admindelformTemplate');
     
      // show existing addresses
      adminaddformTemplate.find('.btn-add-new-admin').text("Add New Admin");
      adminRow.append(adminaddformTemplate.html());
      admindelformTemplate.find('.btn-del-admin').text("Delete Admin");
      adminRow.append(admindelformTemplate.html());

      for (var i = 0; i < admincount; i++ ) {
        let adminaddr = await adminInstance.getAdminAtIndex(i);
        let adminname = await adminInstance.getAdminNameAtIndex(i);
        //console.log(adminaddr);  
        adminTemplate.find('.panel-title').text(adminname);        
        adminTemplate.find('.admin-name').text(adminaddr);      
        if (adminaddr != '0x0000000000000000000000000000000000000000') {      
          adminRow.append(adminTemplate.html());         
        }        
      }
     
    })
},

addAdmin: function(adminaddr,adminname){    
  web3.eth.getAccounts( async function(error,accounts) {
    var useraccount = accounts[0];
    if (error) {
      console.log(error);
    }
    let newadminaddress = document.getElementById("adminaddformaddr").value;
    let newadminname = document.getElementById("adminaddformname").value
    //console.log("New admin address: " + newadminaddress);
    adminInstance = await App.contracts.Admin.deployed();
    let retval = await adminInstance.insertAdmin(newadminaddress, newadminname);
    window.location.reload();
  })
},

  delAdmin: function(adminaddr){    
    web3.eth.getAccounts( async function(error,accounts) {
      var useraccount = accounts[0];
      if (error) {
        console.log(error);
      }
      let deladminaddress = document.getElementById("admindelformaddr").value;     
      //console.log(" admin addres to be deleted: " + deladminaddress);
      //adminInstance = await App.contracts.Admin.deployed();
      adminInstance = await App.contracts.Admin.deployed();
      let retval = await adminInstance.deleteAdmin(deladminaddress);
      //console.log("deletion done " );
      window.location.reload();
    })
  },


  showShopkeep: function(){     
    document.getElementById('PageTitle').innerHTML = '<h2>Shopkeep Menu</h2>'; 
    document.getElementById('PageTitle').style.display = 'inline'; 
    document.getElementById('shopkeepRow').style.display = 'none'; 
    document.getElementById('shopkeepRow').style.display = 'inline';  

    // Clean the page
    var adminRow = $('#adminRow');   
    adminRow.html(' ');
    var shopkeepRow = $('#shopkeepRow');
    shopkeepRow.html(' ');
    var shopRow = $('#shopRow');
    shopRow.html(' '); 
    var coinRow = $('#coinRow');
    coinRow.html(' '); 
    var productRow = $('#productRow');
    productRow.html(' ');
    var shopperRow = $('#shopperRow');
    shopperRow.html(' ');
    var productbuyRow = $('#productbuyRow');
    productbuyRow.html(' ');

    var accstatus=$('#acc-status');
    web3.eth.getAccounts( async function(error,accounts) {
      if (error) {
        console.log(error);
      }
      var useraccount = accounts[0];
      web3.eth.getBalance(useraccount, function(err, balance) {
        if (err === null) {
          var accbalance = web3.fromWei(balance, "ether") + " ETH";
          accstatus.html(' ');
          accstatus.append('Your address: '+useraccount+'<br>');
          accstatus.append(' Your Balance: '+accbalance);
          document.getElementById('acc-status').style.display = 'inline'; 
        }
      })

      let shopkeepInstance = await App.contracts.Shopkeep.deployed();     

      let shopkeepcount = await shopkeepInstance.getShopkeepIndexLength();
      //console.log("Shopkeep count:" + shopkeepcount);
      //var shopkeepRow = $('#shopkeepRow');
      var shopkeepTemplate = $('#shopkeepTemplate');  
      var shopkeepaddformTemplate = $('#shopkeepaddformTemplate');
      var shopkeepdelformTemplate = $('#shopkeepdelformTemplate');
      //shopkeepRow.html(' ');
      // show existing addresses
      shopkeepaddformTemplate.find('.btn-add-new-shopkeep').text("Add New shopkeep");
      shopkeepRow.append(shopkeepaddformTemplate.html());
      shopkeepdelformTemplate.find('.btn-del-shopkeep').text("Deleteshopkeep");
      shopkeepRow.append(shopkeepdelformTemplate.html());

      for (var i = 0; i < shopkeepcount; i++ ) {
        let shopkeepaddr = await shopkeepInstance.getShopkeepAtIndex(i);
        let shopkeepname = await shopkeepInstance.getShopkeepNameAtIndex(i);
        //console.log(adminaddr);  
        shopkeepTemplate.find('.panel-title').text(shopkeepname);        
        shopkeepTemplate.find('.shopkeep-name').text(shopkeepaddr);      
        if (shopkeepaddr != '0x0000000000000000000000000000000000000000') {      
          shopkeepRow.append(shopkeepTemplate.html());         
        }        
      }
      
    })
},

  delShopkeep: function(shopkeepaddr){
    web3.eth.getAccounts( async function(error,accounts) {
      var useraccount = accounts[0];
      if (error) {
        console.log(error);
      }

      let delshopkeepaddress = document.getElementById("shopkeepdelformaddr").value;    
      console.log("returned value:" +  delshopkeepaddress);

      var vdelshopkeepaddress =  delshopkeepaddress;
      console.log("changed value:" +  vdelshopkeepaddress);


     // let shopkeepInstance = await App.contracts.Shopkeep.deployed();
    //  let retval = await shopkeepInstance.deleteShopkeep(delshopkeepaddress);
    //  window.location.reload();
    })
  },

  delShopkeep: function(shopkeepaddr){    
    web3.eth.getAccounts( async function(error,accounts) {
      var useraccount = accounts[0];
      if (error) {
        console.log(error);
      }
      let delshopkeepaddress = document.getElementById("shopkeepdelformaddr").value;      
      shopkeepInstance = await App.contracts.Shopkeep.deployed();
      let retval = await shopkeepInstance.deleteShopkeep(delshopkeepaddress);
      //console.log("deletion done " );
      window.location.reload();
    })
  },

  addShopkeep: function(shopkeepaddr,shopkeepname){    
    web3.eth.getAccounts( async function(error,accounts) {
      var useraccount = accounts[0];
      if (error) {
        console.log(error);
      }
      let newshopkeepaddress = document.getElementById("shopkeepaddformaddr").value;
      let newshopkeepname = document.getElementById("shopkeepaddformname").value
      //console.log("New shopkeep address: " + newshopkeepaddress);
      let shopkeepInstance = await App.contracts.Shopkeep.deployed();
      let retval2 = await shopkeepInstance.insertShopkeep(newshopkeepaddress, newshopkeepname);
      window.location.reload();
    })
  },

  showShop: function(){     
    document.getElementById('PageTitle').innerHTML = '<h2>Shop Menu of the Shops You Own</h2>'; 
    document.getElementById('PageTitle').style.display = 'inline'; 
    document.getElementById('shopRow').style.display = 'none'; 
    document.getElementById('shopRow').style.display = 'inline';  
    var shopRow = $('#coinRow');
    shopRow.html(' ');

    // Clean the page
    var adminRow = $('#adminRow');   
    adminRow.html(' ');
    var shopkeepRow = $('#shopkeepRow');
    shopkeepRow.html(' ');
    var shopRow = $('#shopRow');
    shopRow.html(' '); 
    var coinRow = $('#coinRow');
    coinRow.html(' '); 
    var productRow = $('#productRow');
    productRow.html(' ');
    var shopperRow = $('#shopperRow');
    shopperRow.html(' ');
    var productbuyRow = $('#productbuyRow');
    productbuyRow.html(' ');


    var accstatus=$('#acc-status');
    web3.eth.getAccounts( async function(error,accounts) {
      if (error) {
        console.log(error);
      }
      var useraccount = accounts[0];
      web3.eth.getBalance(useraccount, function(err, balance) {
        if (err === null) {
          var accbalance = web3.fromWei(balance, "ether") + " ETH";
          accstatus.html(' ');
          accstatus.append('Your address: '+useraccount+'<br>');
          accstatus.append(' Your Balance: '+accbalance);
          document.getElementById('acc-status').style.display = 'inline'; 
        }
      })

      let shopInstance = await App.contracts.Shop.deployed(); 
      let shopkeepInstance = await App.contracts.Shopkeep.deployed(); 

      let shopcount = await shopInstance.getShopIndexLength();

      //console.log("Shop count:" + shopcount);  

      var shopTemplate = $('#shopTemplate');  
      var shopaddformTemplate = $('#shopaddformTemplate');
      var shopdelformTemplate = $('#shopdelformTemplate');     
      // show existing addresses
      //console.log("Reached line 311");  
      // Forms
      shopaddformTemplate.find('.btn-add-new-shop').text("Add New shop");
      shopRow.append(shopaddformTemplate.html());

      console.log("Reached line 359");  

      // need to revisit later 
      //shopdelformTemplate.find('.btn-del-shop').text("Delete Shop");
     // shopRow.append(shopdelformTemplate.html());
      
      console.log("Reached line 365");  

      // Data
      for (var i = 0; i < shopcount; i++ ) {
        let shopaddr = await shopInstance.getShopAtIndex(i);
        let shopname = await shopInstance.getShopNameAtIndex(i); 
        let shopownerid = await shopInstance.getShopownerid(shopaddr);
        //console.log("Reached line 326");  
        let shopproductcount = await shopInstance.getShopActiveProductCount(i);  
        let arrresult = await shopkeepInstance.getShopKeepNameAddr(shopownerid);
        var shopownername = arrresult[0];
        var shopowneraddress = arrresult[1];
        //console.log("Reached line 328");  
        //console.log(adminaddr);  
        shopTemplate.find('.panel-title').text(shopname);        
        shopTemplate.find('.shop-id').text(i);    
        shopTemplate.find('.shop-name').text(shopaddr);    
        shopTemplate.find('.productcount').text(shopproductcount);         
        shopTemplate.find('.shop-owner-id').text(shopownerid);  
        shopTemplate.find('.shop-owner-name').text(shopownername);  
        shopTemplate.find('.shop-owner-address').text(shopowneraddress);  
        //console.log(useraccount);
        //console.log(shopowneraddress);
        if (shopaddr != '0x0000000000000000000000000000000000000000') {   
          if (shopowneraddress == useraccount) {
            shopRow.append(shopTemplate.html());         
          }
        }        
      }
      
    })
},

  delShop: function(shopaddr){
    web3.eth.getAccounts( async function(error,accounts) {
      var useraccount = accounts[0];
      if (error) {
        console.log(error);
      }

      let delshopaddress = document.getElementById("shopdelformaddr").value;  
      console.log("returned value:" +  delshopaddress); 
      var vdelshopaddress = delshopaddress; 
      console.log("returned value:" +  vdelshopaddress); 

      let shopInstance = await App.contracts.Shop.deployed();


        let retval = await shopInstance.isShop(vdelshopaddress);        
        console.log("returned value:" +  retval); 

       let retval2 = await shopInstance.deleteShop(vdelshopaddress);

      window.alert('wait');
      window.location.reload();
    })
  },

  addShop: function(shopaddr,shopname){   
    web3.eth.getAccounts( async function(error,accounts) {
      var useraccount = accounts[0];
      if (error) {
        console.log(error);
      }
      let newshopaddress = document.getElementById("shopaddformaddr").value;
      let newshopname = document.getElementById("shopaddformname").value
      //console.log("New shop address: " + newshopaddress);
      let shopInstance = await App.contracts.Shop.deployed();
      let shopkeepInstance = await App.contracts.Shopkeep.deployed();
      let ownershopkeep = await shopkeepInstance.getShopkeepIdatAddr(useraccount);
      //console.log("Inserting owner shopkeep id as:" + ownershopkeep);
      let retval3 = await shopInstance.insertShop(newshopaddress, newshopname,ownershopkeep,true);
      //window.alert("Result, New shop id: "+ retval3);
      window.location.reload();
    })
  },


  showProduct: function(){     
    document.getElementById('PageTitle').innerHTML = '<h2>Product Maintenance</h2>'; 
    document.getElementById('PageTitle').style.display = 'inline'; 
    document.getElementById('productRow').style.display = 'none'; 
    document.getElementById('productRow').style.display = 'inline'; 

    // Clean the page    
    var adminRow = $('#adminRow');   
    adminRow.html(' ');
    var shopkeepRow = $('#shopkeepRow');
    shopkeepRow.html(' ');
    var shopRow = $('#shopRow');
    shopRow.html(' '); 
    var coinRow = $('#coinRow');
    coinRow.html(' '); 
    var productRow = $('#productRow');
    productRow.html(' ');
    var shopperRow = $('#shopperRow');
    shopperRow.html(' ');
    var productbuyRow = $('#productbuyRow');
    productbuyRow.html(' ');

    // handle account info at top
    var accstatus=$('#acc-status');
    web3.eth.getAccounts( async function(error,accounts) {
      if (error) {
        console.log(error);
      }      
      var useraccount = accounts[0];
      web3.eth.getBalance(useraccount, function(err, balance) {
        if (err === null) {
          var accbalance = web3.fromWei(balance, "ether") + " ETH";
          accstatus.html(' ');
          accstatus.append('Your address: '+useraccount+'<br>');
          accstatus.append(' Your Balance: '+accbalance);
          document.getElementById('acc-status').style.display = 'inline'; 
        }
      })
      let productInstance = await App.contracts.Product.deployed();      

      let productcount = await productInstance.getProductCount();
      console.log("Product count:" + productcount); 

      var withdrawTemplate = $('#withdrawTemplate');
      
      var productTemplate = $('#productTemplate');  
      var productaddformTemplate = $('#productaddformTemplate');
      var productupdateformTemplate = $('#productupdformTemplate');     
      //console.log("Linked forms");  
      // show existing addresses
      //console.log("Reached line 311");  
      // Forms

      withdrawTemplate.find('.btn-withdraw').text("Send Funds to Shopkeep");
      productRow.append( withdrawTemplate.html());

      productaddformTemplate.find('.btn-add-new-product').text("Add New Product to your Shop");
      productRow.append(productaddformTemplate.html());

      productupdateformTemplate.find('.btn-update-product').text("Update Your Product");      
      productRow.append(productupdateformTemplate.html());
      
      //console.log("Before 1st loop");  

      // Data
      for (var i = 0; i < productcount; i++ ) {

        let product = await productInstance.getproduct(i); // index, coinid,ownerid, ownertype, activestatus, quantity, price
        let productname = await productInstance.getproductNameAtIndex(i);        
        var productid = i;     
        var coinid = product[0];
        var ownerid = product[1];       
        var ownertype = product[2];
        var activestatus = product[3];        
        var quantity = product[4];
        var price = product[5];
        

        
        if (ownertype = "SHOP" ) {          
          let shopInstance = await App.contracts.Shop.deployed();         
          let owneraddress = await shopInstance.getShopAtIndex(ownerid);
          var owneraddressvar = owneraddress;         
          let ownerstruct = await shopInstance.getShop(owneraddress);
          var ownername = ownerstruct[0];
        } else { // shopper
          
          let shopperInstance = await App.contracts.Shopper.deployed();
          let owneraddress = await shopperInstance.getShopperAtIndex(ownerid);
          var owneraddressvar = owneraddress;        
          let ownername1 = await shopperInstance.getShopperNameAtIndex(ownerid);    
          var ownername = ownername1;    
        }

        //console.log("After IF"); 

        //console.log("Reached line 328");  
        //console.log(adminaddr);  
        productTemplate.find('.panel-title').text(productname);              
        productTemplate.find('.product-id').text(productid);
        productTemplate.find('.coin-id').text(coinid);         
        productTemplate.find('.quantity').text(quantity);  
        productTemplate.find('.price').text(price);  
        productTemplate.find('.status').text(activestatus);  
        productTemplate.find('.owner-name').text(ownername);  
        productTemplate.find('.owner-address').text(owneraddressvar); 
        productTemplate.find('.owner-type').text(ownertype);  
        //console.log(useraccount);
        //console.log(shopowneraddress);
              
          if (owneraddressvar == useraccount) {
            productRow.append(productTemplate.html());         
          }
                
      }
      
    })
},

addProduct: function(){   
  web3.eth.getAccounts( async function(error,accounts) {
    var useraccount = accounts[0];
    if (error) {
      console.log(error);
    }
    
    let newproductname = document.getElementById("productaddformname").value
    let coinid = document.getElementById("productaddformcoinid").value
    let quantity = document.getElementById("productaddformquantity").value
    let price = document.getElementById("productaddformprice").value

    let shopInstance = await App.contracts.Shop.deployed();
    let ownershopid = await shopInstance.getShopIndex(useraccount);

    var ownertype = 'SHOP';
    var activestatus = true;
      // need to restrict access to product maintenance to a shop only. -- done
    console.log("Inserting owner id as:" + ownershopid);

    let productInstance = await App.contracts.Product.deployed();

    let retval3 = await productInstance.insertProduct(
      newproductname, 
      coinid,
      ownershopid,
      ownertype,
      activestatus,
      quantity,
      price);    

    window.location.reload();
  })
},


  updateProduct: function(){   
    web3.eth.getAccounts( async function(error,accounts) {
      var useraccount = accounts[0];
      if (error) {
        console.log(error);
      }    
      
      let prodid = document.getElementById("productupdformid").value ; 
      var vprodid = prodid;     

      let shopInstance = await App.contracts.Shop.deployed();   
      let productInstance = await App.contracts.Product.deployed();
            
           
      let productname = await productInstance.getproductNameAtIndex(vprodid);
      console.log("prodname:" + productname); 

      let resarray = await productInstance.getproduct(vprodid); 
    
          
      var coinid = resarray[0];
      console.log("coinid:" + coinid); 
      
      let ownershopid = await shopInstance.getShopIndex(useraccount);
      console.log("ownershopid:" + ownershopid); 

      var ownertype = 'SHOP';
      
      let status = document.getElementById("productupdformstatus").value
      if (status == "TRUE" || status == "true") {
        var bstatus = true;
      }
      console.log("bstatus:" + bstatus);     
      let quantity = document.getElementById("productupdformquant").value
      console.log("quant:" + quantity);
      let price = document.getElementById("productupdformprice").value       
      console.log("price: " + price);
      
       // need to restrict access to product maintenance to a shop only. -- done
      console.log("Inserting owner id as:" + ownershopid);

     

      let retval3 = await productInstance.updateProduct(
        productname, 
        coinid,
        ownershopid,
        ownertype,
        bstatus,
        quantity,
        price); 
          

      window.location.reload();
    })
},

withdrawFunds: function() {
    // Get money from shop to shopkeep, no product updates.

  // Tie it all together
  //need acces to product contract, transfer money, update product ownership
 
  let withdrawamount = document.getElementById("withdrawamount").value;  
  web3.eth.getAccounts( async function(error,accounts) {
    if (error) {
      console.log(error);
    }
    var useraccount = accounts[0];   
    // get my owner
    let shopInstance = await App.contracts.Shop.deployed(); 
    let shopkeepid = await shopInstance.getShopownerid(useraccount);
    let shopkeepInstance = await App.contracts.Shopkeep.deployed(); 
    let shopkeepaddress = await shopkeepInstance.getShopkeepAtIndex(shopkeepid) ;


    web3.eth.getBalance(useraccount,  function(err, balance) {
      if (err === null) {
        var accbalance = web3.fromWei(balance, "ether");  
        if (withdrawamount > accbalance )  {
          console.log("error:" + err);
        } ;       
      }
    });
  
    web3.eth.sendTransaction({to:shopkeepaddress, from:useraccount, value:web3.toWei(withdrawamount,"ether")} , function(err, balance) {
        if (err === null) {    
          console.log("all good");
        }  else {
          console.log("error:" + err);
        }
    }); 
  }); 
},

browseProduct: function(){     
  document.getElementById('PageTitle').innerHTML = '<h2>Shops and their Products</h2>'; 
  document.getElementById('PageTitle').style.display = 'inline'; 
  document.getElementById('productRow').style.display = 'none'; 
  document.getElementById('productRow').style.display = 'inline'; 
  document.getElementById('productbuyRow').style.display = 'none'; 
  document.getElementById('productbuyRow').style.display = 'inline'; 

  // Clean the page    
  var adminRow = $('#adminRow');   
  adminRow.html(' ');
  var shopkeepRow = $('#shopkeepRow');
  shopkeepRow.html(' ');
  var shopRow = $('#shopRow');
  shopRow.html(' '); 
  var coinRow = $('#coinRow');
  coinRow.html(' '); 
  var productRow = $('#productRow');
  productRow.html(' ');
  var productbuyRow = $('#productbuyRow');
  productbuyRow.html(' ');
  var shopperRow = $('#shopperRow');
  shopperRow.html(' ');

  // handle account info at top
  var accstatus=$('#acc-status');
  web3.eth.getAccounts( async function(error,accounts) {
    if (error) {
      console.log(error);
    }      
    var useraccount = accounts[0];
    web3.eth.getBalance(useraccount, function(err, balance) {
      if (err === null) {
        var accbalance = web3.fromWei(balance, "ether") + " ETH";
        accstatus.html(' ');
        accstatus.append('Your address: '+useraccount+'<br>');
        accstatus.append(' Your Balance: '+ accbalance);
        document.getElementById('acc-status').style.display = 'inline'; 
      }
    })

    let productInstance = await App.contracts.Product.deployed();    
    let productcount = await productInstance.getProductCount();
    console.log("Product count:" + productcount);  

    var browseproductTemplate = $('#browseproductTemplate');
    var productbuyTemplate = $('#productbuyTemplate');  
    productbuyTemplate.find('.btn-buy-product').text("Buy a Product");      
    productbuyRow.append(productbuyTemplate.html());
    
    //console.log("Before 1st loop");  

    // Data
    for (var i = 0; i < productcount; i++ ) {

      let product = await productInstance.getproduct(i); // index, coinid,ownerid, ownertype, activestatus, quantity, price
      let productname = await productInstance.getproductNameAtIndex(i);        
      var productid = i;     
      var coinid = product[0];
      var ownerid = product[1];       
      var ownertype = product[2];
      var activestatus = product[3];        
      var quantity = product[4];
      var price = product[5];     
      
      if (ownertype = "SHOP" ) {          
        let shopInstance = await App.contracts.Shop.deployed();         
        let owneraddress = await shopInstance.getShopAtIndex(ownerid);
        var owneraddressvar = owneraddress;         
        let ownerstruct = await shopInstance.getShop(owneraddress);
        var ownername = ownerstruct[0];     
        //console.log("After IF"); 
        //console.log("Reached line 328");  
        //console.log(adminaddr);  
        browseproductTemplate.find('.panel-title').text(productname);              
        browseproductTemplate.find('.product-id').text(productid);
        browseproductTemplate.find('.coin-id').text(coinid);         
        browseproductTemplate.find('.quantity').text(quantity);  
        browseproductTemplate.find('.price').text(price);  
        browseproductTemplate.find('.status').text(activestatus);  
        browseproductTemplate.find('.owner-name').text(ownername);  
        browseproductTemplate.find('.owner-address').text(owneraddressvar); 
        browseproductTemplate.find('.owner-type').text(ownertype);  
        //console.log(useraccount);
        //console.log(shopowneraddress);
              
        if (activestatus == true) {
          if (productid > 0) {
          productbuyRow.append(browseproductTemplate.html());         
        }
        }
      }              
    }    
  })
},

showshoppercoins: function() {    
  document.getElementById('PageTitle').innerHTML = '<h2>My Coins</h2>'; 
  document.getElementById('PageTitle').style.display = 'inline'; 
  document.getElementById('productRow').style.display = 'none'; 
  document.getElementById('productRow').style.display = 'inline'; 
  document.getElementById('productbuyRow').style.display = 'none'; 
  document.getElementById('productbuyRow').style.display = 'inline'; 
  document.getElementById('shopperRow').style.display = 'none'; 
  document.getElementById('shopperRow').style.display = 'inline'; 

  // Clean the page    
  var adminRow = $('#adminRow');   
  adminRow.html(' ');
  var shopkeepRow = $('#shopkeepRow');
  shopkeepRow.html(' ');
  var shopRow = $('#shopRow');
  shopRow.html(' '); 
  var coinRow = $('#coinRow');
  coinRow.html(' '); 
  var productRow = $('#productRow');
  productRow.html(' ');
  var productbuyRow = $('#productbuyRow');
  productbuyRow.html(' ');
  var shopperRow = $('#shopperRow');
  shopperRow.html(' ');

  
  // handle account info at top
  var accstatus=$('#acc-status');
  web3.eth.getAccounts( async function(error,accounts) {
    if (error) {
      console.log(error);
    }      
    var useraccount = accounts[0];
    web3.eth.getBalance(useraccount, function(err, balance) {
      if (err === null) {
        var accbalance = web3.fromWei(balance, "ether") + " ETH";
        accstatus.html(' ');
        accstatus.append('Your address: '+useraccount+'<br>');
        accstatus.append(' Your Balance: '+ accbalance);
        document.getElementById('acc-status').style.display = 'inline'; 
      }
    })  
    console.log(1);
    var myproductTemplate = $('#myproductTemplate');  

    let productInstance = await App.contracts.Product.deployed();    
    let productcount = await productInstance.getProductCount();

    console.log("Product count:" + productcount);       

    // Data
    for (var i = 0; i < productcount; i++ ) {
      let product = await productInstance.getproduct(i); // index, coinid,ownerid, ownertype, activestatus, quantity, price
      let productname = await productInstance.getproductNameAtIndex(i);        
      var productid = i;     
      var coinid = product[0];
      var ownerid = product[1];       
      var ownertype = product[2];
      var activestatus = product[3];        
      var quantity = product[4];
      var price = product[5];          
      console.log(2);
      if (ownertype = "SHOPPER" ) {          
        let shopperInstance = await App.contracts.Shopper.deployed();         
        let owneraddress = await shopperInstance.getShopperAtIndex(ownerid);
        var owneraddressvar = owneraddress;         
        let shoppername = await shopperInstance.getShopperNameAtIndex(ownerid);
        let shoppernamevar = shoppername;

        myproductTemplate.find('.panel-title').text(productname);              
        myproductTemplate.find('.product-id').text(productid);
        myproductTemplate.find('.coin-id').text(coinid);         
        myproductTemplate.find('.quantity').text(quantity);  
        myproductTemplate.find('.price').text(price);  
        myproductTemplate.find('.status').text(activestatus);  
        myproductTemplate.find('.owner-name').text(shoppernamevar);  
        myproductTemplate.find('.owner-address').text(owneraddressvar); 
        myproductTemplate.find('.owner-type').text(ownertype);  
        //console.log(useraccount);
        //console.log(shopowneraddress);
        console.log(3);      
        if (owneraddressvar == useraccount) {
        shopperRow.append(myproductTemplate.html());         
        }
      }              
    }    
  });
  window.location.reload();
},


buyProduct: function() {
  // Still need to do the product update !
  // Tie it all together
  //need acces to product contract, transfer money, update product ownership
  let productid = document.getElementById("productbuyid").value;
  let productquant = document.getElementById("productbuyquant").value;
  web3.eth.getAccounts( async function(error,accounts) {
    if (error) {
      console.log(error);
    }
    var useraccount = accounts[0];   
    let shopperInstance = await App.contracts.Shopper.deployed();
    let shopInstance = await App.contracts.Shop.deployed(); 
    let productInstance = await App.contracts.Product.deployed();       
          
    let resultarray = await productInstance.getproduct(productid);
    let ownerid = resultarray[1];
    let owneraddress = await shopInstance.getShopAtIndex(ownerid);

    console.log("owneraddress: " +owneraddress);
    let productprice = resultarray[5];        
    console.log("product price: " + productprice);

    let finalcost = productprice * productquant ;
/*
    web3.eth.getBalance(useraccount,  function(err, balance) {
      if (err === null) {
        var accbalance = web3.fromWei(balance, "ether");  
        if (finalcost > accbalance )  {
          console.log("inside getBalance error:" + err);
        } ;       
      }
    }); 
  */ 
    // Change ownership of product
    let productname = await productInstance.getproductNameAtIndex(productid);
    console.log("productname fetched");
    let coinid =  resultarray[0]; 
    console.log("coinid fetched");

    console.log("??????????????????");
    console.log("useraccount: " + useraccount);
    // if shopper doesn't own coins yet, need to create.
  
    /*
    let shopperexists = await shopperInstance.isShopper(useraccount);
    console.log('shpperexists: ' + shopperexists );


    if (shopperexists) { 
      console.log("shopper exists"  );
      let shopperid = await shopperInstance.insertShopper(useraccount );      
    } else {
      console.log("shopper does note exist"  );
      let shopperid = await shopperInstance.getShopperid(useraccount);       
    }  
    */
    // Just reduce quantity from  original product
    let decrementOK = productInstance.decrementProduct(productname, coinid, ownerid,'SHOP',true,productquant,productprice);  

    // First see if this new owner already has a unique setup , in which case, go increase quant of the productid and decrease old one
    // If new owner does not already have a unique hash, insert this as a new product id  and decrease quant of old one.
    //let oldhashval = keccak256(abi.encodePacked(coinid,ownerid,'SHOP'));       
    /*  
    let newhashval = await productInstance.returnhashval(coinid,shopperid,'SHOPPER');

    //if newhashval does not exist
    let newhashvalexists = productInstance.UniqueExists(newhashval);
    if (!newhashvalexists ) {
      // insert a new product
      let insertOK = productInstance.insertProduct(productname, coinid, shopperid,'SHOPPER',true,productquant,productprice);
      // update old product (decrement)
      let decrementOK = productInstance.decrementProduct(productname, coinid, ownerid,'SHOP',true,productquant,productprice);  
    } else {
      //increment new product
      let incrementOK = productInstance.incrementProduct(productname, coinid, shopperid,'SHOPPER',true,productquant,productprice);
      // decrement old product
    
    } 
*/
    console.log("Did get here");
    web3.eth.sendTransaction({to:owneraddress, from:useraccount, value:web3.toWei(finalcost,"ether")} , function(err, balance) {
        if (err === null) {    
          console.log("all good");
        }  else {
          console.log("error:" + err);
        }
    }); 
    console.log("Never gets here ?");


  }); 
},    

transferMoney: function() {
  // Tie it all together
  //need acces to product contract, transfer money, update product ownership
  let productid = document.getElementById("productbuyid").value;
  let productquant = document.getElementById("productbuyquant").value;
  web3.eth.getAccounts( async function(error,accounts) {
    if (error) {
      console.log(error);
    }
    var useraccount = accounts[0];   
    let shopperInstance = await App.contracts.Shopper.deployed();
    let shopInstance = await App.contracts.Shop.deployed(); 
    let productInstance = await App.contracts.Product.deployed();       
          
    let resultarray = await productInstance.getproduct(productid);
    let ownerid = resultarray[1];
    let owneraddress = await shopInstance.getShopAtIndex(ownerid);

    console.log("owneraddress: " +owneraddress);
    let productprice = resultarray[5];        
    console.log("product price: " + productprice);

    let finalcost = productprice * productquant ;

    web3.eth.getBalance(useraccount,  function(err, balance) {
      if (err === null) {
        var accbalance = web3.fromWei(balance, "ether");  
        if (finalcost > accbalance )  {
          console.log("error:" + err);
        } ;       
      }
    });
  
    web3.eth.sendTransaction({to:owneraddress, from:useraccount, value:web3.toWei(finalcost,"ether")} , function(err, balance) {
        if (err === null) {    
          console.log("all good");
        }  else {
          console.log("error:" + err);
        }
    }); 
  
  });  
},    


showCoins: function(){     
  document.getElementById('PageTitle').innerHTML = '<h2>Coin List</h2>'; 
  document.getElementById('PageTitle').style.display = 'inline'; 
  document.getElementById('shopRow').style.display = 'none'; 
  document.getElementById('shopRow').style.display = 'inline';  
  document.getElementById('coinRow').style.display = 'none';  
  document.getElementById('coinRow').style.display = 'inline';  

  // Clean the page
  var adminRow = $('#adminRow');   
  adminRow.html(' ');
  var shopkeepRow = $('#shopkeepRow');
  shopkeepRow.html(' ');
  var shopRow = $('#shopRow');
  shopRow.html(' '); 
  var productRow = $('#productRow');
  productRow.html(' '); 
  var coinRow = $('#coinRow');
  coinRow.html(' '); 
  var shopperRow = $('#shopperRow');
  shopperRow.html(' ');
  var productbuyRow = $('#productbuyRow');
  productbuyRow.html(' ');

  web3.eth.getAccounts( async function(error,accounts) {
    if (error) {
      console.log(error);
    }
    var useraccount = accounts[0];
    console.log('in getaccounts');
    let coinInstance = await App.contracts.Coin.deployed(); 
    let coincount = await coinInstance.getCoinIndexLength();
    console.log('Coins Count: ' + coincount);
    var coinTemplate = $('#coinTemplate');        
    // show existing Coins 
    // Don't show default coin , so start loop from 1, not 0
    for (var i = 1; i < coincount; i++ ) {       
      console.log('in loop1');
      console.log("i: " + i);
      let coinid = i; 
      let coinname = await coinInstance.getCoinNameAtIndex(i);            
      coinTemplate.find('.panel-title').text(coinname);        
      coinTemplate.find('.coin-id').text(i); 
      //coinTemplate.find('img').attr('src',data[i].picture);
      coinTemplate.find('img').attr('src', "./images/coin00"+i+".jpg");
      coinRow.append(coinTemplate.html());       
    
      console.log('out loop2');
        
    }      
  })
},

enableButton: function (buttonclass) {
  var buttongroup = $('#btn-group');
  var buttonclassname ="";
  switch(buttonclass){
    case "Admin":
      //buttonclassname=".btn-adminm"; 
      //buttongroup.find('.btn-adminm').attr("disabled",'');
      buttongroup.find('.btn-adminm').prop("disabled",false);
      break;
    case "Shopkeep":
      //buttonclassname=".btn-shopkpm";
      buttongroup.find('.btn-shopkpm').prop("disabled",false);
      break;
    case "Shop":
      //buttonclassname=".btn-shopm";
      buttongroup.find('.btn-shopm').prop("disabled",false);
      break;
    case "Product":
      //buttonclassname=".btn-productm";
      buttongroup.find('.btn-productm').prop("disabled",false);
      break;
   // case "Shopper":
      //buttonclassname=".btn-productm";
     // buttongroup.find('.btn-shopper').prop("disabled",false);
   //   break;
    case "Coin":
      //buttonclassname=".btn-coinm";
      buttongroup.find('.btn-coinm').prop("disabled",false);
    }
},

initVisitor: function() {    
    document.getElementById('btn-startit').style.visibility = 'hidden';   
    document.getElementById('btn-group').style.display = 'inline';  
   

    web3.eth.getAccounts( async function(error,accounts) {
      if (error) {
        console.log(error);
      }
      // this can only show the current metamask user, no access to other accounts from here. actually makes sense..
      var useraccount = accounts[0] ;
      console.log(useraccount);    
      
      let adminInstance= await App.contracts.Admin.deployed();
      let shopkeepInstance = await App.contracts.Shopkeep.deployed();
      let shopInstance = await App.contracts.Shop.deployed();

      let isAdmin = await adminInstance.isAdmin(useraccount);     
      let isShopKeep = await shopkeepInstance.isShopKeep(useraccount);
      let isShop = await shopInstance.isShop(useraccount);
      
      if (isAdmin) {
        console.log('Found in admin list');
        App.enableButton("Admin");
        App.enableButton("Shopkeep");
        App.showAdmin();
      } else {
        if (isShopKeep) {
          console.log('Found in shopkeep list');          
          App.enableButton("Shop");
          App.enableButton("Coin");
          App.showShop();
        } else {     
          if (isShop) {
            console.log('Found in shop list');          
            App.enableButton("Product");
            App.enableButton("Coin");
            App.showProduct();
          } else {
            console.log('Found nowhere else : so a shopper ');       
            App.enableButton("Shopper");   
            App.browseProduct();
          }        
        }       
      }          
        return 0;
    })      
  }
}; //closes App function

$(function() {
  $(window).load(function() {
    App.init();
  });
});
