# Movies-Rental-Rest-API

This is a Movies Rental Rest API that allows users to rent movies. It is built using Node.js and MongoDB. The API supports basic CRUD operations for movies and users.
Installation

To install and run the application, follow these steps:

Clone the repository using the following command:

    git clone https://github.com/hamzaiqbal2000/Movies-Rental-Rest-API.git

Navigate to the project directory:

    cd Movies-Rental-Rest-API

Install the required packages using the following command:

    npm install

Start the server using the following command:

    npm start

The server will start on port 3000.

# API Endpoints

The API supports the following endpoints:
## Movies

    GET /api/movies: Get a list of all movies.
    GET /api/movies/:id: Get a single movie by ID.
    POST /api/movies: Add a new movie.
    PUT /api/movies/:id: Update an existing movie by ID.
    DELETE /api/movies/:id: Delete a movie by ID.

## Users

    GET /api/users: Get a list of all users.
    GET /api/users/:id: Get a single user by ID.
    POST /api/users: Add a new user.
    PUT /api/users/:id: Update an existing user by ID.
    DELETE /api/users/:id: Delete a user by ID.

## Rentals

    POST /api/rentals: Rent a movie.
    GET /api/rentals: Get a list of all rentals.
    GET /api/rentals/:id: Get a single rental by ID.

## Authentication

The API requires authentication for certain endpoints. To authenticate, send a POST request to /api/auth with a JSON payload containing your email and password. This will return a JSON web token that you can use to authenticate subsequent requests.
License

This project is licensed under the MIT License. See the LICENSE file for details.
