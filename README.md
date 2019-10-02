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

### Application
* `GET /api/v1/applications` => gets the list of all applications
* `POST /api/v1/applications?name=app_name` => creates an app with the name app_name provided in the params {params: name}
* `PUT /api/v1/applications/:token`  => updates an app


### Chat
* `GET /api/v1/applications/:application_token/chats` => gets the list of all chats of a certain application
* `POST /api/v1applications/:application_token/chats` => creates a chat for a certain application
* `PUT /api/v1/applications/:application_token/chats/:number`  => updates the content a chat of a certain application {params: messages_count}

