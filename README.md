# Chat System API

A REST API for a simple E-Commerce webiste using __nodejs__.

## Getting Started

These instructions will get you the project up and running on your local machine for development and testing purposes

### Prerequisites

Install both docker and docker-compose on your local machine.

To make sure they were installed successfully, type the following on your terminal:

```
$ docker --version
$ docker-compose --version
```



## Setup

navigate to the ecommerce-rest-api directory where we have our docker-compose.yml file
```
$ cd <path_to_docker-compose.yml>
```

build the image
```
$ docker-compose build
```

boot the services
```
$ docker-compose up
```

now you have all your services up and running.

### Testing

To check running containers, type the following on your terminal:
```
$ docker ps
```

if you docker-compose is running on the background, you can check the logs of the app container using the following command
```
$ docker-compose logs app
```

This command will output all the logs since the container has been created


## How to use

First make sure you have postman app on your local machine to be able to construct requests and read responses easily.

`localhost:3000` is the main entry to our api service. For example, request will be in the form `localhost:3000/api/users/`, where `/api/users/` is the route for getting list of users

Following are the routes provided by our service, make sure to set the params and action of each request as stated

### User
* `POST /api/users/login`  
* `POST /api/users/register` 
* `GET /api/users/`
* `POST /api/users/admin`
* `PUT /api/users/activate`
* `PUT /api/users/deactivate`
* `GET /api/users/:userId/orders/`
* `PUT /api/users/:userId/orders/:orderId/status`


### Category
* `GET /api/product-category`  
* `POST /api/product-category` 
* `GET /api/product-category/:categoryId`
* `PUT /api/product-category/:categoryId`
* `DELETE /api/product-category/:categoryId`

### Product
* `GET /api/products`  
* `POST /api/products` 
* `GET /api/products/:productId`
* `PUT /api/products/:productId`
* `DELETE /api/products/:productId`
* `POST /api/products/:productId/upload`
* `GET /api/products/filter`

### Order
* `GET /api/orders`  
* `POST /api/orders` 
* `GET /api/orders/:orderId`
* `DELETE /api/orders/:orderId`
* `PUT /api/orders/:orderId/add`
* `PUT /api/orders/:orderId/remove`
