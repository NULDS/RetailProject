Group repository for the project.

# Suggested Structure
## Inventory 
Suchi

#### GET /items/
Gets all items in inventory

#### GET /items/:id
Gets specific item details

#### POST /items/
Add a specific item to inventory

### To be added 
- Search Functionality?
- Image Functionality?
- Authentication for using some endpoints

## Emails 
Avinash

#### GET /emails/
Gets all emails in queue

#### GET /emails/:id
Gets specific email

#### POST /emails/
Add a specific email to queue

- Email sending functionality?
- Asynchronous email sending?
- Authentication for using these endpoints


## User Authentication
Leo
#### GET /users/
Gets information on all users

#### GET /users/:id
Gets specific user detail

#### POST /emails/
Add a specific user

- Authentication Permission Levels
- Authentication Groups
- Email Confirmation Codes


## Vendor Management
Nani
#### GET /vendors/
Gets information on all vendors

#### GET /vendors/:id
Gets specific vendor information

#### POST /vendors/
Add a specific vendor

- Vendor to Stock Mapping
- Automatic ordering when stock low
- Wishlist for new requests

## Order Management 
Harsh
#### GET /orders/
Gets information on all orders

#### GET /orders/:id
Gets specific order information

#### POST /orders/
Add a specific order

- Order Searching
- Delivery Stages System
- Authentication for Order

## Wishlist Management
Anthony
#### GET /wishlist/
Gets information on all wishlist items

#### GET /wishlist/:id
Gets specific wishlist item information

#### POST /wishlist/
Add a specific item to wishlist

- Design new products
- Upvoting System
- Authentication for Wishlist