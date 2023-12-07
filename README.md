# token_poc

## Project Overview

token_poc is a proof of concept application designed to demonstrate secure token handling and transaction management in a web application. This project implements a basic payment gateway simulation where users can send and receive virtual tokens.

## Features

- User registration and authentication.
- Secure token generation and decryption.
- Ability to send tokens to other users.
- Viewing transaction history.

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT for authentication

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js
- npm
- MongoDB

### Installing

1. Clone the repository:
   ```
   git clone https://github.com/alihussainiF1/token-poc.git
   ```
2. Navigate to the project directory:
   ```
   cd token_poc
   ```
3. Install dependencies:
   ```
   npm install
   ```
4. Create a `.env` file in the root directory and add the necessary environment variables:
   ```
   MONGODB_URI=<your_mongodb_uri>
   JWT_SECRET=<your_jwt_secret>
   SECRET_DECRYPT=<initial_key_for_users>
   ```
5. Start the server:
   ```
   npm start
   ```

## Usage

After starting the server, you can use the application to:

- Register new users.
- Log in with existing users.
- Send tokens to other registered users.
- View transaction history.

## Authors

- **Ali Hussaini**
