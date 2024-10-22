# Comic Book Inventory Management

## Project Overview

This project involves developing the backend for a React-based e-commerce store that facilitates the management and display of comic books as inventory items. The primary goal is to implement CRUD (Create, Read, Update, Delete) functionality, enabling the store manager to efficiently create, manage, and organize comic books available for sale. The backend system supports essential operations such as adding new comic books, retrieving existing inventory, updating details, and deleting items from the inventory. This robust functionality ensures smooth operation and enhances user experience in managing comic book sales.


**Author:** Sharanu Mesta  
**Repository:** [comic-book-inventory](https://github.com/Sharanumesta/comic-book-inventory)

## Key Technologies
- **Server**: Node.js with Express.js for building a REST API.
- **Database**:  MongoDB for data storage of comic book details.
- **Version Control**: GitHub for version control and collaboration.
- **API Testing**:  Postman Collection for testing API endpoints.

## Prerequisites

- **Node.js**: Make sure Node.js is installed on your machine. You can download it from [Node.js Official Website](https://nodejs.org/).
- **MongoDB**: Install MongoDB for the database. You can download it from [MongoDB Official Website](https://www.mongodb.com/try/download/community).

## Features and Requirements

### A. Comic Book Management API

- **Create a Comic Book**: 
  - API to add new comic books with details:
    - Book Name
    - Author Name
    - Year of Publication
    - Price
    - Discount (if applicable)
    - Number of Pages
    - Condition (e.g., new, used)
    - Description (optional)

- **Edit a Comic Book**: 
  - The API allows updates to existing comic book attributes, enabling the manager to modify fields such as price, condition, or discount.

- **Delete a Comic Book**: 
  - A delete operation is included to remove comic books from the inventory as needed.

### B. Comic Book List API

- **Fetch Inventory List**: 
  - API to retrieve all available comic books, including pagination, filtering, and sorting options.

### C. Comic Book Details API

- **Get Comic Book Details**: 
  - Endpoint to return full details of a specific comic book.

## Folder Structure
The project directory is organized as follows:

- **comic_books_inventory_REST/**
  - **client/**
    - **node_modules/**         # Contains project dependencies for the client-side
    - **public/**               # Static assets for the client
    - **src/**                  # Source code for the client-side application
      - **Components/**         # Reusable components
      - **Pages/**              # Pages of the application
  - **server/**
    - **controller/**           # Contains controllers for handling requests
    - **db/**                   # Database connection and models
    - **middleware/**           # Middleware for request processing
    - **router/**               # API route definitions
    - **node_modules/**         # Contains project dependencies for the server-side
    - **validator/**            # Input validation logic 

## API Endpoints

### Endpoints

- **Get All Books**
  - `GET /api/books`
    - **Description**: Retrieve a list of all comic books in the inventory.

- **Add a New Book**
  - `POST /api/books/new-book`
    - **Description**: Add a new comic book to the inventory.
    - **Request Body**: Must include details according to the book schema validation.
    - **Example Request**:
      ```json
      {
          "isbn": 978014168236,
          "bookName": "The Great Gatsby",
          "authorName": "John Doe",
          "yearOfPublication": 1925,
          "price": 20.99,
          "discount": 5,
          "numberOfPages": 180,
          "condition": "used",
          "description": "A classic novel about love."
      }
      ```

- **Update an Existing Book**
  - `PATCH /api/books/update-book`
    - **Description**: Update details of an existing comic book.
    - **Request Body**: Must include updated details according to the book schema validation.

- **Delete a Book**
  - `DELETE /api/books/delete-book`
    - **Description**: Remove a comic book from the inventory.

- **Get Book Details**
  - `GET /api/books/book-detail`
    - **Description**: Retrieve details of a specific comic book.

## Deliverables

- **GitHub Repository**: 
  - The project is uploaded to my GitHub repository [comic-book-inventory](https://github.com/Sharanumesta/comic-book-inventory).

- **Postman Collection**: 
  - I prepared and exported a Postman Collection that includes all API endpoints for testing. You can access it [here](https://alone7-8517.postman.co/workspace/Alone-Workspace~e9c75852-334e-4411-a7fd-4319c6f95992/request/25239808-08b33836-b24f-46ff-a235-fa7532c7bc8c?action=share&creator=25239808&ctx=documentation).

## How to Use
1. Clone the repository:
   ```bash
   git clone https://github.com/sharanu_portfolio/comic_books_inventory_REST.git
   cd comic_books_inventory

   For the server:
      cd server
      npm install
      npm start

   For the client:
      cd client
      npm install
      npm run dev


Feel free to make any adjustments if needed!
