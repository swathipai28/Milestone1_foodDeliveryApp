Food Delivery Backend
This project is a Node.js-based backend application for managing a food delivery service. It provides APIs for managing restaurant menus, handling orders, and simulating order status updates using a queue system and node-cron.

Features
Menu Management:

Add or update menu items with details like name, price, and category.
Retrieve the list of menu items.
Order Management:

Place orders by selecting multiple menu items.
Retrieve details of a specific order.
Order Status Automation:

Order statuses update automatically (Preparing → Out for Delivery → Delivered) via a queue system and periodic node-cron jobs.
Installation
Prerequisites
Node.js installed on your machine.
A tool like Postman or cURL for testing the APIs.
Steps
Clone the repository:

bash
Copy code
git clone https://github.com/your-username/food-delivery-backend.git
cd food-delivery-backend
Install dependencies:

bash
Copy code
npm install
Start the server:

bash
Copy code
node index.js
The server will run on http://localhost:3000.

Endpoints
Menu Management
Add/Update Menu Item

POST /menu
Request Body:
json
Copy code
{
    "name": "Item Name",
    "price": 100,
    "category": "main"
}
Response:
Adds the item if it doesn't exist.
Updates the item if it already exists.
Get Menu

GET /menu
Response:
json
Copy code
[
    {
        "id": 1,
        "name": "Gulab Jamun",
        "price": 80,
        "category": "dessert"
    }
]
Order Management
Place Order

POST /orders
Request Body:
json
Copy code
{
    "itemIds": [1, 2]
}
Response:
json
Copy code
{
    "message": "Order placed.",
    "order": {
        "id": 1,
        "items": [
            {
                "id": 1,
                "name": "Gulab Jamun",
                "price": 80,
                "category": "dessert"
            }
        ],
        "status": "Preparing",
        "createdAt": "2024-12-04T08:48:27.060Z"
    }
}
Get Order by ID

GET /orders/:id
Response:
json
Copy code
{
    "order": {
        "id": 1,
        "items": [
            {
                "id": 1,
                "name": "Gulab Jamun",
                "price": 80,
                "category": "dessert"
            }
        ],
        "status": "Out for Delivery",
        "createdAt": "2024-12-04T08:48:27.060Z"
    }
}
Automated Order Status Updates
A node-cron job updates order statuses every 10 seconds:
Preparing → Out for Delivery → Delivered.
Folder Structure
bash
Copy code
food-delivery-backend/
│
├── controllers/
│   ├── menuController.js   # Logic for menu-related APIs
│   ├── orderController.js  # Logic for order-related APIs
│
├── models/
│   ├── menu.js             # In-memory data for menu items
│   ├── order.js            # In-memory data for orders and queue
│
├── routes/
│   ├── menuRoutes.js       # Routes for menu APIs
│   ├── orderRoutes.js      # Routes for order APIs
│
├── index.js                # Entry point of the application
├── package.json            # Dependencies and project metadata
└── README.md               # Project documentation
Testing
Using Postman:

Add menu items using /menu (POST).
Retrieve menu items using /menu (GET).
Place orders using /orders (POST).
Retrieve order details using /orders/:id (GET).
Check Automated Updates:

Observe the terminal logs to see the node-cron job processing order statuses.
Technologies Used
Node.js: Backend runtime.
Express.js: Web framework for handling routes and APIs.
node-cron: Job scheduling for automated status updates.
In-memory data: Simplified storage (can be replaced with a database).