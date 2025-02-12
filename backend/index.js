import express from "express";
import cors from "cors";
import "dotenv/config";
import cookieParser from "cookie-parser";
import dbConnect from "./config/db.js";

// Initialize Express application
const app = express();
dbConnect();

// Set the server port
const port = process.env.PORT || 4000;

// Middleware setup
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
  })
);

// Initial API
app.get("/", (req, res) => {
  res.send("API Working");
});

// Start the server and listen on the specified port
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
