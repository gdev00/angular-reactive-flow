# Goal:

To display the provided product data within a grid and apply the filtering options.

# Instructions:

- Please use Git locally to commit your changes as you progress

## Enhance the website:

- Given the provided Angular project complete the following instructions.

 - Using the ProductsService class populate the grid with all products when the app component has loaded.
 
- Hook up the search input box to filter down products.
	- The search should match using the name, description and brand properties.
	- The search should not fire unless a minimum of three characters have been typed.
	- The search should only fire a maximum of once per 400 milliseconds.

- Hook up the brand filter drop down.
	- A list of unique brands should be populated as options.  These should be populated from the brand property from the collection of products in the grid and only needs to be populated once.
	- Selecting a brand from the drop down should update the grid and show only products with the selected matching brand.

- Hook up the stock filter.
	- Selecting All should show all products regardless of quantity number. (Default)
	- Selecting In Stock should show only products that have a quantity higher than zero.
	- Selecting Out of Stock should show only products that have a quantity of zero.

- All filters should be inclusive.
	- If searching for “shoe” with the brand selected as “Nike” and In Stock, then only products matching all three filters should be shown in the grid.

## Fix broken test:
- Run the tests to see one of the tests fails
  - Make changes to the logic under test so that it passes.
  
  
# Send code back:
- Zip up the project folder and send it back via email
  - Please make sure the node_modules folder is excluded.
- In the email please mention your favourite book or movie from the last year.

