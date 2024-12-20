import dotenv from "dotenv";
import connectDb from "./db/db.js";
import app from "../src/app.js";

dotenv.config();

const port = process.env.PORT;
connectDb().then(() => {
  app.listen(port, () => {
    console.log("Server is running....");
  });
});
