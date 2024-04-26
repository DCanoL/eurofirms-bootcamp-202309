# Ecommerce BBB

## Functional Description

Ecommerce where the Home is the page. main with links to Login and Register and access to the cart, which if there is no logged in user sends you to Login and the display of articles.
The logged in user can add and remove products in the cart and also in their home, in the cart they have their Logout.
The admin in Login goes to his Dashboard where he can delete and create products and has his Logout.

### Data Model

User
- id (string, unique, required)
- name (string, required)
- email (string, unique, required)
- password (string, required)
- role ([regular, admin])
- cartItems (ObjectId)

Product
- id (string, unique, required)
- author (ObjectId, required)
- name (string, required)
- image (string, required)
- description (string, required)
- price (string, required)
- quantity (number, required)

Order
- id (string, unique, required)
- user (ObjectId, required)
- products ([ObjectId, required])
- payment ()
- buyer (string, required)
- statusOrder ([Processing, Sent, Delivered, Cancel])
- date (Date)
- totalPrice (number, required)