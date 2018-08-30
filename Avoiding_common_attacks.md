**Avoiding common attacks**



- The contracts all use very modular logic to simplify 
debugging.

- There are various 'require' statements in the contracts to avoid failures due to attempted actions on non-existent data values.

- Not all variables are public.

- All uint's are uint, not uint8 to avoid overflow or underflow, but I did not go as far as testing each change to an int before increasing or decreasing it. 

- Use of 'transfer' to evade re-entrancy .

- No use of tx.origin anywhere.

- No use of integer division anywhere.- 

- The way the contracts interact with each other (hierarchical structure), avoid the possibility of a transfer of funds from 'shop' to anyone else other than its parent 'shopkeep';
	- Only Admins can create admins or shopkeeps.
	- Only shopkeeps can create shops.
	- Only shops can create products, and can only transfer value to the owning shopkeep.
	- When a product is bought, the only address to which the transfer can be made is to the owning shop.










