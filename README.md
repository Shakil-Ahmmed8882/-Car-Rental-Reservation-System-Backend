

# Car Rental Reservation System - Backend

This project is a backend application for a Car Rental Reservation System. It is built using TypeScript, Express.js, MongoDB, and Mongoose.

## Purpose of the System

The purpose of this system is to manage car rentals, including creating, reading, updating, and deleting rental reservations.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Environment Variables](#environment-variables)
- [Project Structure](#project-structure)
- [Technologies Used](#technologies-used)



## Installation

### Prerequisites

- [Node.js](https://nodejs.org/en/)
- [npm](https://www.npmjs.com/)
- [MongoDB](https://www.mongodb.com/)

### Steps

1. **Clone the repository:**

   ```bash
   git clone https://github.com/Shakil-Ahmmed8882/-Car-Rental-Reservation-System-Backend.git
   cd car-rental-reservation-system

### Install the dependencies:

`npm install`

### Set up the environment variables:

Create a `.env`
NODE_ENV = 'development'             
`PORT = 5000`-                 
`DATABASE_URL = mongo URI`    
`BCRYPT_SALT_ROUNDS = "..."`
`JWT_ACCESS_SECRET = "...."`



### npm run dev
`npm run start:dev`

## Role
`user`
`admin`

## API Endpoints
### Car Endpoints
`GET /cars` - Get a list of all available cars.  

`POST /cars` - Add a new car.   

`GET /cars/:id` - Get details of a specific car.  


`PUT /cars/:id` - Update details of a specific car.  

`DELETE /cars/:id` - Delete a specific car.    

### Reservation Endpoints
`GET api/bookings` - Get a list of all reservations.  

`POST api/bookings` - Create a new reservation.   

`GET api/bookings/:id` - Get details of a specific reservation.   

`PUT api/bookings/:id` - Update a specific reservation.  

## Environment Variables
PORT: The port number on which the server will run.
MONGODB_URI: The connection string for the MongoDB database.
Project Structure
The project structure follows a standard Express.js setup with some additional directories:


├── src   
│   ├── app  
│   ├── models ->  route ->  controller -> service  
│   ├── middlewares  
│   ├── services  
│   ├── utils  
│   ├── app.ts  
│   └── server.ts  
├── .env  
├── .gitignore  
├── package.json  
├── tsconfig.json   
└── README.md  

## Live Url 
https://assignment-3-beta-seven.vercel.app/

## Thank you
Thanks for being here. 
