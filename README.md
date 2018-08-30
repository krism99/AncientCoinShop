**Project Description**

The Ancient Coin Shop is an imaginary website where people can sell ancient tokens that they have access to.

A walk-through PDF file (Walkthrough.pdf) with images has also been provided in this zip file, it is in the root directory, same as this README.md

**Prerequisites requirements**

- A webbrowser (Chrome or Firefox ) with the MetaMask extension , and unlocked.
- This project zip file has been downloaded and been unzipped in a directory (for example AncientCoinShop)
- Ganache and The truffle suite must have been installed. (and npm)
- This application successfully runs in a VirtualBox environment (Ubuntu)

**Installation**

To start Ganache:  start a Terminal, and type :
 `$ ganache-cli.`

Both the application and tests expect to connect to    127.0.0.1:8545   , so your Metamask extension will have be connected to that local RPC address once you start using the web browser ).


**Run the tests**

Inside the directory where the zip file has been unzipped, type :  

     ~/AncientCoinShop$ truffle compile

    :~/AncientCoinShop$ ganache-cli

----------

>Ganache CLI v6.1.6 (ganache-core: 2.1.5)
> 
> Available Accounts
> ==================
> (0) 0x912eeffbb9be14032978e5740c49091bb9070de1 (~100 ETH)
> (1) 0xf65002530d46d5a3c71ebdd5f194e88ad91baa62 (~100 ETH)
> (2) 0x5cd3028719e23b82660dc95380da8405eb1ce6ec (~100 ETH)
> (3) 0x4955d7b17e7fad8cca5024c94a66b7508bc8cd6a (~100 ETH)
> (4) 0x2f26db5dae4856996c87acd8f88c60ffaf67656d (~100 ETH)
> (5) 0xdae02079e1b0ac73dde374767b7b229789d0f730 (~100 ETH)
> (6) 0xf5fed11f361de8d91d91631c0ac20784581da672 (~100 ETH)
> (7) 0xf2016811349b747820d875a72e1208bc52007ec5 (~100 ETH)
> (8) 0x14b75427a9b7fc36e92e63c26012369bcd5a3a5a (~100 ETH)
> (9) 0x808c981bbdf860f245a41a8965f446092ed3506f (~100 ETH)
> 
> !! KEEP TRACK OF THESE !!
> 
> Private Keys
> ==================
> (0) 0x2f36cd9765bbece9c4b10d3a8a10eabd00c60213e67fe677c60a7a304ed924f4
> (1) 0x7c311ff51fb626a5ce3d7bcc9c48ed8d37fd695587d4e55ce81d44bde894f7e1
> (2) 0xeaca5cbe58f96ca2ce9a5a4a4ba04f68da24344de1b3f20cee4fc13de7823b2f
> (3) 0xd0dc1e954ac1613d21a46a15d652d01d8c1538b7092d159a0581ebb3c5c52d4d
> (4) 0xc8f9430b6063f19cb0218c1dcc227388fc2943a4c412aed81c1062da916229b5
> (5) 0xda3c247212fba465f51cc2e95f198bdf5f0092b0b5c59396357955e550e5c1ba
> (6) 0x2cec0267f68ba9cb844947a645e304c9e50003c94c0f6b8f1b29b544abe878f6
> (7) 0x32eb8dde56c1d760da4c3c194c07956ef37d76a0b97a81af31b4194982a6dd96
> (8) 0xba26dbf6f1a39c866e4fd7cbf3c43415fbb48c6f961ba85165d92191e03b0891
> (9) 0x3f72d022f402a3713211e78c28a1d939442ea643a77a4fdfbeb41eba5f5f2e7a
> 
> 
> !! KEEP TRACK OF THESE, YOURS will be different !!
> 
> 
> HD Wallet
> ==================
> Mnemonic:      grow impulse bounce abstract air language gallery dune brick panic spot puzzle
> Base HD Path:  m/44'/60'/0'/0/{account_index}
> 
> Gas Price
> ==================
> 20000000000
> 
> Gas Limit
> ==================
> 6721975
> 
> Listening on 127.0.0.1:8545
> net_version
> eth_accounts
> eth_accounts
> net_version
> net_version
> eth_sendTransaction
> 
>   Transaction: 0x48bb652befa881a40273a00ef4380de666bb68ebf937955808a751f011d11b26
>   Contract created: 0x385c16
> 
  
  

----------

**Start a new Terminal**

cd to the unzipped directory 

  
    kris@kris-VirtualBox:~/AncientCoinShop$ truffle compile

> Compiling ./contracts/Admin.sol...
> 
> Compiling ./contracts/Coin.sol...
> 
> Compiling ./contracts/MaintLibrary.sol...
> 
> Compiling ./contracts/Migrations.sol...
> 
> Compiling ./contracts/Product.sol...
> 
> Compiling ./contracts/Shop.sol...
> 
> Compiling ./contracts/Shopkeep.sol...
> 
> Compiling ./contracts/Shopper.sol...
> 
> Writing artifacts to ./build/contracts
> 
> 


    ~/AncientCoinShop$ truffle migrate 




> Using network 'development'.
> 
> Running migration: 1_initial_migration.js
>   Deploying Migrations...
>   ... 0x48bb652befa881a40273a00ef4380de666bb68ebf937955808a751f011d11b26
>   Migrations: 0x385c168a8b7acb22cad4f1ecb494c91456f7a60d
> Saving successful migration to network...
>   ... 0xaefb90116a50414a0010c5e2fd7570ec61806539caafb789ae1098bcfaa0730a
> Saving artifacts...
> Running migration: 2_deploy_contracts.js
>   Deploying Shop...
>   ... 0x34ec48b79497f9de67e4f289a62f5405598aade7e92c4963116b8e84ea9d756d
>   Shop: 0x36ac4d3bc95661b51279799df639482e1d41994b
>   Deploying MaintLibrary...
>   ... 0xe5cfd42f56e331ba4bbb1cff0cc69c014d9d2c54b45e967e608e81b9ebe6fc24
>   MaintLibrary: 0xec11477e3731a2137e38117f1e8f0b061deeeb96
>   Linking MaintLibrary to Admin
>   Linking MaintLibrary to Shopkeep
>   Linking MaintLibrary to Coin
>   Linking MaintLibrary to Product
>   Deploying Admin...
>   Deploying Shopkeep...
>   Deploying Coin...
>   Deploying Product...
>   Deploying Shopper...
>   ... 0x81b22bd4f2fb9bef3ac4be0bfe697f82cbade639f9b3789639ee3d781fcbcbdd
>   ... 0x5af8019567c7ec23b8df60d902d6a6d99c5838ea77a626644cea323e41082e0c
>   ... 0xde20750d94cd0b50e70f16888f8110bcca343a673d2e8d8628e2090fec3a5407
>   ... 0xcf8981695bdec052e30ca6644351e5bd0a26492d4472fdd2594049068ee4a3e3
>   ... 0x01d4ed9076a79714141dacb00d94d1ac6836ac2d59063c30085aead6b89abca4
>   Admin: 0x94d1c99c18bf4acfab92330d7fa8a153f0f3567c
>   Shopkeep: 0xcf18a57fc0ddf0217e25d651fadd6197a3a633c6
>   Coin: 0xc075f7a4d5eb458ecc02ed6534eb346b212906fc
>   Product: 0x603708db9316f43535cf9982e3d24f5bdfb62682
> Saving successful migration to network...
>   ... 0x47d5fb952119a5368f0deb56fa065d223aca44192f93b538f0fe1ccd4436944e
>   Shopper: 0xb4e2a7c227bb6078c5d43b24377b6501b4aa676a
> Saving artifacts...
> 



    ~/AncientCoinShop$ truffle test




Using network 'development'.

Compiling ./contracts/MaintLibrary.sol...

Compiling ./contracts/Product.sol...

Compiling ./test/TestProduct.sol...

Compiling truffle/Assert.sol...

Compiling truffle/DeployedAddresses.sol...


  TestProduct
    ✓ testProductInitialization (150ms)

  Contract: Admin   


...
...
...
...

  37 passing (11s)



  
**Test logic**

The Tests are made to check the validity of the functions in the Solidity Contracts.

Most are related to checking whether inserts, updates and deletes are effective.

The first test  (TestProduct) is a simple initialization verification, and it is done in Solidity, all the others are JS files.

I have added output logs to the assertions (they appear in the output before the Test shows up , to explain what each test does as can be seen above.

The last 3 Contract tests were done to assert that 'financial' transactions could be made, from different accounts, and the last test was to verify that it is possible to access multiple contracts in the same 'it' block.

I've implemented 'security' in the application by using a hierarchy of user types to avoid potential problems with transfer of funds.

For example a shop is owned by a shopkeeper, and the shop cannot transfer money out to anyone other than the shopkeeper.

The shop is a 'child' of the shopkeeper.

The tests above show how the hierarchy fits :
Top level : Admin, then Shopkeeper, then Shop, which owns Products (containing different types of coins).   THe products can be purchased by the last  type of user : a Shopper.
These usertypes are represented by the contracts above.



**Front-end**

In another Terminal, type : 


    $ npm run dev


(if you are seeing errors like this :
npm ERR! code ELIFECYCLE
npm ERR! errno 126
npm ERR! AncientCoinShop@1.0.0 dev: `lite-server`
npm ERR! Exit status 126
npm ER

Try this : 

    $rm -rf node_modules/*
    $npm install

and then 

    $npm run dev


This will start the lite-server webserver which renders the app front-end pages.

Open a Web browser (Chrome or Firefox) and go to URL :  http://127.0.0.1:3000
(You may be asked to enter a password to unlock your login keyring).


Before we start , we need to import the seed key from ganache-cli into the Metamask extension to get access to those accounts.

(screenshots )

The process and structure of the application is as follows:

The contract owner (account[0] in the Truffle environment) has automatically been added to the infrastructure as an admin,
so make sure you have unlocked Metamask and are logged in as the first account.

Make sure you're connected to the local RPC network:


We'll need 4 additional addresses to work with , so let's create those:

**There is another document : Workflow.pdf  in the root folder which contains screenshots along with these textual steps.**


Admin X

Shopkeep X

Shop X

Shopper X



Select Account 1 again (the default account) because that address has been automatically added to the ADMINs list.

Go to the home page :

http://localhost:3000 (do a refresh)

Click on the central button.


You will now see a screen that only allows ADMIN accounts to access. (Note how some of the buttons are greyed out).
Each role in this application has access to certain functions.

**Let's add a Admin**

In the 'Add New Admin' section,
Type : Admin X  in the Name textfield, and paste the address of Admin X in the Address field.
! Be careful, to go copy the address of another account, it is easy to forget that you need to activate/ be the account that you're testing..)

For example :  go to the Metamask tab,  select account Admin X, copy its address , but then also remember to go back and change the account again to Account 1

Now go back to the Ancient Coins Shop tab, paste the address in the 'Address' menu.
Click 'Add New Admin'

Confirm, the MetaMask transaction.

I didn't implement a handy spinner to wait for the Metamask transaction to completed, so regular refreshes are what will show the changes.
You will be shown the first 'Click Button to get started' screen again. (Click on it)

The next time the Admin panel shows up, our new admin is part of the list.


By the way : the top panel shows the current users' address and balance , and gets updated everytime a page refreshes.


Let's now 'become' Admin X and go and create a ShopKeep

**We will be creating Shopkeep X**, so will need his address again :

So : Metamask -> Become Shopkeep X -> Copy that address for later use -> Become Admin X again so we can see the right functionality. (refresh the Ancient Coins Shop page, and Click the button again to get started)

Now click on the Shopkeep Maintenance button in the top menu.

Type in 'Shopkeep X' -> paste the address -> click 'Add New Shopkeep' -> Confirm the Ethereum transaction.

Go through the start page (click Button to get started) again and see if your shopkeep has been added to the shopkeep list. (You'll have to navigate to the Shopkeep Maintenance by clicking on the button in the top nav bar).

**Now we want to create a SHOP.**

So: go copy the address of 'Shop X' (by becoming it temporarily) , then  change your account to 'Shopkeep X' and go back to the Ancient Coins Shop page, refresh the page ,  which will lead you to the central button again.
Click the central button, and see how the menu options have changed because you are now a 'shopkeep'.

Let's create a new shop: 
Name = Shop X
Address = paste from your clipboard.
Click the 'Add New Shop' button.
Confrm the Metamask transaction

You wil see the new Shop's details when next you go to the Shop Maintenance window as this shopkeep.
You will only see 'your' shops.
Each shop has only 1 owner, which will be important in terms of limiting who can draw funds from the shop later.

Let's become the Shop, by changing the Metamask account to 'Shop 1'. (be sure to refresh the Ancient Coins Shop page).

Now when you get there, you will see a 'Product Maintenance' page.

Before we create a product, let's see which Coins we can sell : click on the 'Available Coins' button in the Navigation menu at the top.

There are 3 types of coins that can be traded.
Take note of the  Coin Id of the coin you want to use as your first Product to have in your shop. (One day I'll learn how to populate drop-downs...)

Go back to the Product Maintenance screen (use the button)

Let's add a product to the shop (a product isn't just the coin, it's the coin, the quantity of the coins you possess and the price you want to sell them for).

Name : Product X
Product ID : 1
Quantity: 100
Price: 2
Click 'Add New Product to your Shop'

Confirm the MetaMask transaction.

Go back through the Start page to see how your product has been added to your shop.

You can update your product's details using the 'Update' section of the page:
for example:
Product ID: 1
Quantity: 200
Price: 3
Status  (either True or False) - this means you can set a product to 'Inactive' status. (there is another page which shows a list of shops and their count of Active Products).

Note that you (as the shop) will only ever see 'your' products on this page to edit, you can't edit other shops' products, nor can they access yours.


Click "Update Your Product" and confirm the MetaMask transaction.

**Now let's pay our owner.. the shopkeep.**

After you've gone through the central button /start page again, put an amount in the 'Amount' text box and click 'Send Funds to Shopkeep'.
Note the balance of your account before and after the transaction.
I'll add some screenshots of the shopkeep's account balance from before and after this 'withdrawal' too.

You may need to refresh the page after a small pause.
You can also click on the 'Product Maintenance' button to achieve the same result.


And finally : let's become a shopper. (this is any address who does not turn up in any of the 'Admin','Shopkeep' or 'Shop' structs).

Change the Metamask account to become 'Shopper X', refresh the Ancient Coins Shop page , and peruse all the products in all the shops (ok, the one product in the one shop at this stage, but you would be able to see a list of all the products in all the shops  when we addmore content)

**And finally: let's buy a product.**

Take note of the balance of this Shopper's account (top of window), and go look at the balance of Shop 1's account before buying a quantity of Product 1's coins.
Also take note of the quantity available for sale before and after the purchase.

Let's buy 8 x Product 1 coins.
Confirm the transaction and compare the balances of Shopper1, Shop1 and the quantity of Product 1 before and after the 'buy'.

This is going to ask for Metamask 3 Confirmations.. 

Refresh the page, and you should a different quantity, a different balance for the shopper and when you go look for it, a different balance for Shop 1.


Library usage requirements : Several of the contracts do make use of a (tiny) library, just tosee how that works.

Design Pattern requirements: each contract does have a Kill function in place.


That's pretty much it, there are some delete functions higher up the hierarchy to look at, but this pretty much sums up the functionality of the application.

**Thanks for your time !**














































