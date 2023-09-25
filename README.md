# BB Bookstore 📚📔

This Online Bookstore web application developed using the MERN (MongoDB, Express.js, React.js, Node.js) stack. The project was developed as part of the 12-month _**[Software Engineering program](https://www.alxafrica.com/software-engineering/)**_ graduation at **[ALX Africa](https://www.alxafrica.com)**.

## Table of Contents 📄

- [Introduction](#introduction)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Introduction 🤔

The Online BB Bookstore is a web application developed to provide users with the ability to buy books and read them online. Users are required to create an account to access the full functionality of the platform. The application also provides an admin interface to manage the books available on the website, allowing administrators to add and remove books as needed.

## Features ⭐

The BB Online Bookstore web application offers the following features:

1. User Registration and Authentication:
   - Users can create new accounts by providing necessary details like name, email, and password.
   - Users can log in using their registered email and password.
   - Users can edit their profile details including changing their password.
   - Passwords are securely stored using hashing algorithms.

2. Book Listing and Search:
   - Users can browse through a wide range of books available on the website.
   - Books are categorized and can be filtered based on genre, author, or other criteria.
   - Users can search for books using keywords or specific criteria.

3. Book Details and Preview:
   - Users can view detailed information about each book, including the author, description, and price.

4. Shopping Cart and Checkout:
   - Users can add books to their shopping cart for later purchase.
   - Users can view the contents of their shopping cart and update or remove books.
   - Users can proceed to the checkout process to complete their purchase.

5. Online Reading:
   - Users who have purchased a book can access the online reading feature.
   - The application provides a user-friendly interface for reading books directly on the website.

6. Admin Panel:
   - Administrators have access to an admin panel for managing books on the website.
   - Admins can add new users and remove the existing ones.
   - Admins can add new books to the catalog, including details like title, author, genre, description, and price.
   - Admins can remove books from the catalog if they are no longer available.

## Technologies Used 💻

The BB Online Bookstore web application is built using the following technologies:

- **MongoDB**: A NoSQL database used for storing book and user data.
- **Express.js**: A web application framework for Node.js used to build the backend API.
- **React.js**: A JavaScript library used for building the user interface components.
- **Node.js**: A JavaScript runtime environment used for server-side scripting.
- **Mongoose**: An object data modeling (ODM) library for MongoDB and Node.js used to simplify database operations.
- **JWT**: JSON Web Tokens are used for user authentication and authorization.
- **Axios**: A promise-based HTTP client used for making API requests.
- **React Router**: A routing library for React.js used for handling client-side navigation.
- **Bootstrap**: A popular CSS framework used for styling and responsiveness.

## Installation 👨‍💻

To run the Online Bookstore web application locally, follow these steps:

1. Clone the repository from GitHub:

   ```
   git clone https://github.com/Bikilaketema/Bookstore.git
   ````

2. Navigate to the project directory:

   ```
   cd Bookstore
   ````

3. Install the dependencies for both the server and client:

   ```
   cd backend && npm install
   cd frontend && npm install
   ````

4. Configure the environment variables:
   
   - Create a `.env` file in the `server` directory.
   - Set the following environment variables in the `.env` file:
   
     ```
     PORT=<port-number>
     MONGODB_URI=<mongodb-connection-url>
     JWT_SECRET=<jwt-secret-key>
     JWT_SECRET_KEY_EXPIRE=<jst-secret-key-exp-time>
     ```

5. Seed the database with initial data (mandatory):
   
   - Populate the database with placeholder datas yourself

6. Start the application:
   
   - In the `backend` directory, run:
   
     ```
     npm start
     ```
     
   - In the `frontend` directory, run:
   
     ```
     npm start
     ```

7. Access the application in your web browser at `http://localhost:3000`.

## Usage ✅

- Access the application in your web browser at `http://localhost:3000`.
- Register a new user account or log in with an existing account.
- Browse through the available books, search for specific titles or authors, and add books to your shopping cart.
- Proceed to the checkout process to complete your purchase.
- If you have purchased a book, you can access the online reading feature and enjoy reading the book directly on the website.
- As an admin, you can log in to the admin panel and manage the books available on the website. You can add new books and users, remove existing ones...[Currently, Admins are added to the database manually using the create admin account endpoint].
  
## Authors ✍️
[Bikila Ketema](https://twitter.com/bikilaketema) 

[Bekalu Endrias ](https://twitter.com/bekaluendrias)
