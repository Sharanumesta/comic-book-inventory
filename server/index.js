require('dotenv').config();
const express = require('express');
const connectDb = require('./db/db')
const bookRouter = require('./router/book-router');
const app = express();

app.use(express.json());
const port = process.env.PORT;

app.use('/api/books',bookRouter);

connectDb().then(() => {
    app.listen(port, () => {
        console.log("Server is running....");
    })
});