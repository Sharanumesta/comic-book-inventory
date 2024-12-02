# Comic Book Inventory Management

## Project Overview 📚
This project involves developing the backend for a React-based e-commerce store that facilitates the management and display of comic books as inventory items. The primary goal is to implement CRUD (Create, Read, Update, Delete) functionality, enabling the store manager to efficiently create, manage, and organize comic books available for sale. The backend system supports essential operations such as adding new comic books, retrieving existing inventory, updating details, and deleting items from the inventory. This robust functionality ensures smooth operation and enhances user experience in managing comic book sales.

**Author:** Sharanu Mesta  
**Repository:** [comic-book-inventory](https://github.com/Sharanumesta/comic-book-inventory)

## Key Technologies 🔧
- **Server**: Node.js with Express.js for building a REST API.
- **Database**: MongoDB for data storage of comic book details.
- **Version Control**: GitHub for version control and collaboration.
- **API Testing**: Postman Collection for testing API endpoints.

## Prerequisites ✅
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

- **Search for Comic Books:**
  - Search functionality allows users to find comic books by title, author, or isbn.
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

---

## API Endpoints 🔗

Here are the API endpoints to interact with the comic book inventory. Use the base URL `http://localhost:8080/api/books`.

### Endpoints

- **Get All Books** 📖
  - **Method**: `GET`
  - **Endpoint**: `http://localhost:8080/api/books/`
  - **Description**: Retrieve a list of all comic books in the inventory.

- **Add a New Book** ➕
  - **Method**: `POST`
  - **Endpoint**: `http://localhost:8080/api/books/new-book`
  - **Description**: Add a new comic book to the inventory.
  - **Request Body**: 
    ```json
    {
      "isbn": "978014168236",
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

- **Update an Existing Book** 🔄
  - **Method**: `PATCH`
  - **Endpoint**: `http://localhost:8080/api/books/update-book`
  - **Description**: Update details of an existing comic book.
  - **Example Requests**: `http://localhost:8080/api/books/update-book?isbn=9780141182636`
  - **Request Body**: 
    ```json
    {
      "isbn": "978014168236",
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

- **Delete a Book** 🗑️
  - **Method**: `DELETE`
  - **Endpoint**: `http://localhost:8080/api/books/delete-book`
  - **Description**: Remove a comic book from the inventory.
  - **Example Requests**: `http://localhost:8080/api/books/delete-book?isbn=978014168236`

- **Get Book Details** 🔍
  - **Method**: `GET`
  - **Endpoint**: `http://localhost:8080/api/books/book-detail`
  - **Description**: Retrieve details of a specific comic book.
  - **Example Requests**: `http://localhost:8080/api/books/book-detail?isbn=978014168236`

- **Search for Books** 🔎
  - **Method**: `GET`
  - **Endpoint**: `http://localhost:8080/api/books/search`
  - **Description**: Search for a comic book by title, author, or ISBN.
  - **Example Requests**:  
    - By ISBN: `http://localhost:8080/api/books/search?isbn=978014168236`
    - By Book Name: `http://localhost:8080/api/books/search?bookName=The Great Gatsby`
    - By Author Name: `http://localhost:8080/api/books/search?authorName=John Doe`

---

## Deliverables

- **GitHub Repository**: 
  - The project is uploaded to my GitHub repository [comic-book-inventory](https://github.com/Sharanumesta/comic-book-inventory).

- **Postman Collection**: 
  - I prepared and exported a Postman Collection that includes all API endpoints for testing. You can access it [here](https://alone7-8517.postman.co/workspace/Alone-Workspace~e9c75852-334e-4411-a7fd-4319c6f95992/collection/25239808-852ea088-c419-41e2-a90e-22abb4e47713?action=share&creator=25239808&active-environment=25239808-b1312c28-d2bf-4b2f-8322-e78017096c61).

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
