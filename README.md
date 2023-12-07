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

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us.

## Authors

- **Ali Hussaini** 

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

---

Feel free to customize this README to add more specific information about your project, such as its structure, how to run tests, detailed usage instructions, screenshots, etc.
