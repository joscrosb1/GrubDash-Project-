# GrubDash Project

This project implements a backend API for managing dishes and orders in a food delivery application called GrubDash.


## Project Structure

The project consists of the following main files:

- **src/dishes/dishes.controller.js**: In this file, you'll find the handlers and middleware functions responsible for creating, reading, updating, and listing dishes. Please note that dishes cannot be deleted.

- **src/dishes/dishes.router.js**: This file defines two routes: `/dishes` and `/dishes/:dishId`. It attaches the handlers exported from `dishes.controller.js` to handle create, read, update, and list operations.

- **src/orders/orders.controller.js**: Here, you'll find the handlers and middleware functions for creating, reading, updating, deleting, and listing orders.

- **src/orders/orders.router.js**: This file defines two routes: `/orders` and `/orders/:orderId`. It attaches the handlers exported from `orders.controller.js` to handle create, read, update, delete, and list operations.

- **src/utils/nextId.js**: This file exports the `nextId` function, which can be used to assign a new ID to an order or dish.

Feel free to explore the code in these files to understand the implementation details.

## Usage

Once the server is running, you can interact with the API using the provided routes and operations:

### Dishes

- **/dishes**: This endpoint handles CRUD operations for dishes.
- **POST**: Create a new dish.
- **GET**: Retrieve all dishes.
- **PUT**: Update a dish.

- **/dishes/:dishId**: This endpoint handles CRUD operations for a specific dish identified by `dishId`.
- **GET**: Retrieve a dish.
- **PUT**: Update the dish.

### Orders

- **/orders**: This endpoint handles CRUD operations for orders.
- **POST**: Create a new order.
- **GET**: Retrieve all orders.
- **PUT**: Update an order.
- **DELETE**: Delete an order.

- **/orders/:orderId**: This endpoint handles CRUD operations for a specific order identified by `orderId`.
- **GET**: Retrieve an order.
- **PUT**: Update the order.
- **DELETE**: Delete the order.

Please make sure to include the necessary request payloads and parameters as specified in the API documentation.

