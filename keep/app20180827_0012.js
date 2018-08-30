App = {
  web3Provider: null,
  contracts: {},

  init: function() {  

    //sets up Web3 provider ,then initializes contracts 
    App.initWeb3(); 

  },

  initPets: function() {
    $.getJSON('../coins.json', function(data) {
      var productsRow = $('#productRow');
      var productTemplate = $('#productTemplate');

      for (i = 0; i < data.length; i ++) {
        productTemplate.find('.panel-title').text(data[i].name);
        productTemplate.find('img').attr('src', data[i].picture);
        productTemplate.find('.price').text(data[i].Price);
        productTemplate.find('.quantity-available').text(data[i].Quantity_available);	       
        productTemplate.find('.btn-adopt').attr('data-id', data[i].id);

        productsRow.append(productTemplate.html());
      }
    });
  },


  initAdmin: function() { 
    document.getElementById('Startbutton').style.visibility = 'hidden';
    $('#PageTitle').find()

    $.getJSON('../coins.json', function(data) {
      var adminRow = $('#adminRow');
      var adminTemplate = $('#adminTemplate');
      var adminaddformTemplate = $('#adminaddformTemplate');
      adminRow.append("<h2>Admin Menu</h2>");
      for (i = 0; i < data.length; i ++) {
        adminTemplate.find('.panel-title').text(data[i].name);
      //  adminTemplate.find('img').attr('src', data[i].picture);
        adminTemplate.find('.admin-name').text(data[i].name);       
        adminTemplate.find('.btn-del-admin').attr('data-id', data[i].id);        
        adminRow.append(adminTemplate.html());
      }
     // adminaddformTemplate.find('.btn-add-new-admin').attr('data-id',99);
      adminaddformTemplate.find('.btn-add-new-admin').text("Add New Admin");
      adminRow.append(adminaddformTemplate.html());
    });
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
    $(document).on('click', '.btn-buy', App.handleTestClick);
    $(document).on('click', '.btn-startit', App.initVisitor);
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

  getAdminCount: function(event) {
    event.preventDefault();
    var adminInstance;
    web3.eth.getAccounts(function(error,accounts) {
      if (error) {
        console.log(error);
      }
      var account = accounts[0];
      App.contracts.Admin.deployed().then(function(instance) {
        adminInstance = instance;
        return adminInstance.getAdminIndexLength({from: account});
      }).then(function(result) {    
        console.log(result.c[0]); 
        var x = "<p>"+ result.c[0] + "</p>";
        $('#adminRow').append(x);
        return result;
      }).catch(function(err) {
        console.log(err.message);
      });
    })  
  },

  showAdmin: function(){
    document.getElementById('PageTitle').innerHTML = '<h2>Admin Menu</h2>'; 
    document.getElementById('PageTitle').style.display = 'inline';  
    web3.eth.getAccounts( async function(error,accounts) {
      if (error) {
        console.log(error);
      }
      var useraccount = accounts[0];
      let adminInstance = await App.contracts.Admin.deployed();
      let admincount = await adminInstance.getAdminIndexLength();
      var adminRow = $('#adminRow');
      var adminTemplate = $('#adminTemplate');  
      var adminaddformTemplate = $('#adminaddformTemplate');
      // show existing addresses
      for (var i = 0; i < admincount; i++ ) {
        let adminaddr = await adminInstance.getAdminAtIndex(i);
        let adminname = await adminInstance. getAdminNameAtIndex(i);
        console.log(adminaddr);  
        adminTemplate.find('.panel-title').text(adminname);        
        adminTemplate.find('.admin-name').text(adminaddr);       
        adminTemplate.find('.btn-del-admin').attr('data-id', i);        
        adminRow.append(adminTemplate.html());  
        $(document).on('click', '.btn-del-admin',  function(){
          App.delAdmin(adminaddr);         
          alert("Triggered by " +$(this).text()+ "ID: "+$(this).attr('data-id'));
        });          
      }
      adminaddformTemplate.find('.btn-add-new-admin').text("Add New Admin");
      adminRow.append(adminaddformTemplate.html());
    })
  },

  delAdmin: function(adminaddr){
    web3.eth.getAccounts( async function(error,accounts) {
      var useraccount = accounts[0];
      if (error) {
        console.log(error);
      }
      let adminInstance = await App.contracts.Admin.deployed();
      let retval = await adminInstance.deleteAdmin(adminaddr,{from: useraccount});
    })
  },


  initVisitor: function() {    
    document.getElementById('btn-startit').style.visibility = 'hidden';     

    web3.eth.getAccounts( async function(error,accounts) {
      if (error) {
        console.log(error);
      }
      // this can only show the current metamask user, no access to other accounts from here. actually makes sense..
      var useraccount = accounts[0] ;
      console.log(useraccount);    
      
      let adminInstance= await App.contracts.Admin.deployed();
      let shopkeepInstance = await App.contracts.Shopkeep.deployed();

      let isAdmin = await adminInstance.isAdmin(useraccount);     
      let isShopKeep = await shopkeepInstance.isShopKeep(useraccount);
      
      if (isAdmin) {
        console.log('Found in admin list');
        App.showAdmin();
      } else {
        if (isShopKeep) {
          console.log('Found in shopkeep list');
          App.showShopkeep();
        } else {         
            console.log('Found nowhere else : so a shopper ');          
            App.showShop();
        }        
      }       

      // Get  index length       
      //let res = await adminInstance.getAdminIndexLength();
      //console.log(res);  

      /*
      // show result
      var testRow = $('#testRow');
      var testTemplate = $('#testTemplate');
      testTemplate.find('.test-test').text(res);	    
      testRow.append(testTemplate.html());
       
      if (res < 2) {       
      let res2 = await adminInstance.insertAdmin(useraccount,"You");
      console.log("did this ok");
      } else {
        console.log('in else');
      }

      // Get  index length again        
      let res3 = await adminInstance.getAdminIndexLength();        
      // display result
      testTemplate.find('.test-text').text(res3);	    
      testRow.append(testTemplate.html());

      // show existing addresses
      for (var i = 0; i < res3; i++ ) {
        let res4 = await adminInstance.getAdminAtIndex(i);
        console.log(res4);
        testTemplate.find('.test-text').text(res4);	
        testRow.append(testTemplate.html());    
      }
      */
      /*
      // test : delete address at index 1
      let res5 = await adminInstance.getAdminAtIndex(1,{from: account});
      console.log('deleted admin at index 1');

      // Get  index length again        
      let res6 = await adminInstance.getAdminIndexLength();        
      // display result
      testTemplate.find('.btn-test').text(res6);	    
      testRow.append(testTemplate.html());

      // show existing addresses
      for (var i = 0; i < res6; i++ ) {
        let res7 = await adminInstance.getAdminAtIndex(i,{from: account});
        console.log(res7);
        testTemplate.find('.btn-test').text(res7);	
        testRow.append(testTemplate.html());    
      }
      */      
        return 0;
      /*  
      }).catch(function(err) {
        console.log(err.message);
      });
      */
    })      
  }


}; //closes App function

$(function() {
  $(window).load(function() {
    App.init();
  });
});
