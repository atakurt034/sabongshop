# sabongshop
e-commerce site

https://sabongshop.herokuapp.com/

Implemented the following:

- Cancel order - if order is not paid yet.

- Stock decrease upon placing order and increase if order is canceled with reference to the amount of items ordered.

- Added Facebook (only works locally needs facebook approval if deployed) and Google login.

- Improved search results can now search prices, brand, categories and name.

- Added prevention on placing orders with products whose stock recently got depleted.

- Added validation and sanitation on register screen.

- Badges
   1. Cart badges - will show number of products added.
      - cart badge is cleared upon placement of orders.
   2. Profile name badge will show if order is not paid .
      - order menu will show number of orders not paid.
        
- Added admin search on:
   1. Products
      - displays products on sale first
      - id - product id
      - brand
      - category
      - price - will display closes match price range
   
   2. Users
      - name - will display all users with name match
      - id - user id
   
   3. Orders
      - date - year-month-day
      - id - order number
      - prices - will display closes match price range

- Products:
    1. Can add multiple images on a product and set primary picture.
    2. Added option to place product on sale - with sale price.
  
- User Profile:
    1. Added avatar on profile (facebook login will have their profile pics).
    2. Order history for cancelled or paid & delivered orders.

 - Paginations:
    1. Home page
        - Mobile displays 4 products on each page
        - Desktop/laptop 8 products on each page
    2. Reviews readmore/less section
        - Maximum of 2 reviews each product

- Added modal for on sale products with 1hour timer
        - Sale products are set automatically if products are placed on sale.
