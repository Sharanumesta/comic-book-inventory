require('dotenv').config();
const express = require('express');
const connectDb = require('./db/db')
const bookRouter = require('./router/book-router');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());
const port = process.env.PORT;

app.use('/api/books',bookRouter);

connectDb().then(() => {
    app.listen(port, () => {
        console.log("Server is running....");
    })
});