import express from "express";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

import bookRouter from "./router/book-router.js";
app.use("/api/books", bookRouter);

export default app;