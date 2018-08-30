**Design Pattern requirement:** 


- Each contract has a Kill function in place.

- Some of the important Structs have a 'buddy' bool mapping to be able to quickly find out if data exists, rather than going through an iterative loop (potentially leading to OOG)  to find out.
- I've also used a variable called 'activeproductcount' in Shop.sol which gets updated on inserts and deletes, rather than trying to find out which are active products by looping through a struct.

- To prevent out-of-gas failures, I moved almost all logic out of the Solidity contracts into app.js.

- Some of the contracts make use of the 'MaintLibrary' Library, as per the requirement to make use of a library
.
- Avoided using strings , in favor of bytes32, where possible.

- Made use of event logs for important transactions.

- Did not use multiple inheritance (though I did try at first..)












