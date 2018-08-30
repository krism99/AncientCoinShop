App = {
  web3Provider: null, 
  contracts: {},

  init: function() {
    // Load pets.
    $.getJSON('../pets.json', function(data) {
      var petsRow = $('#petsRow');
      var petTemplate = $('#petTemplate');

      for (i = 0; i < data.length; i ++) {
        petTemplate.find('.panel-title').text(data[i].name);
        petTemplate.find('img').attr('src', data[i].picture);
        petTemplate.find('.price').text(data[i].Price);
        petTemplate.find('.quantity-available').text(data[i].Quantity_available);
        
        
        App = {
          web3Provider: null,
          contracts: {},
        
          init: function() {
            
            // Load pets.
            $.getJSON('../pets.json', function(data) {
              var petsRow = $('#petsRow');
              var petTemplate = $('#petTemplate');
        
              for (i = 0; i < data.length; i ++) {
                petTemplate.find('.panel-title').text(data[i].name);
                petTemplate.find('img').attr('src', data[i].picture);
                petTemplate.find('.price').text(data[i].Price);
                petTemplate.find('.quantity-available').text(data[i].Quantity_available);
                
                petTemplate.find('.btn-adopt').attr('data-id', data[i].id);
        
                petsRow.append(petTemplate.html());
              }
            });
        
            return App.initWeb3();
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
            $.getJSON('Adoption.json',function(data) {
              var AdoptionArtifact = data;
              App.contracts.Adoption = TruffleContract(AdoptionArtifact);
              App.contracts.Adoption.setProvider(App.web3Provider);
              return App.markAdopted();
            })
        
            return App.bindEvents();
          },
        
          bindEvents: function() {
            $(document).on('click', '.btn-adopt', App.handleAdopt);
          },
        
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
        
          handleAdopt: function(event) {
            event.preventDefault();
            var petId = parseInt($(event.target).data('id'));
            var adoptionInstance;
            web3.eth.getAccounts(function(error,accounts) {
              if (error) {
                console.log(error);
              }
              var account = accounts[0];
              App.constract.Adoption.deployed().then(function(instance) {
                adoptionInstance = instance;
                return adoptionInstance.adopt(petId, {from: account});
              }).then(function(result) {
                return App.markAdopted();
              }).catch(function(err) {
                console.log(err.message);
              });
            })
          }
        };
        
        $(function() {
          $(window).load(function() {
            App.init();
          });
        });
        
        petTemplate.find('.btn-adopt').attr('data-id', data[i].id);
        
        // this is the line which replaces the content of petTemplate in index.html
        petsRow.append(petTemplate.html());
      }
    });

    return App.initWeb3();
  },

  


};

$(function() {
  $(window).load(function() {
    App.init();
  });
});
