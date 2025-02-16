import express from "express";
import cors from "cors";
import "dotenv/config";
import cookieParser from "cookie-parser";
import dbConnect from "./config/db.js";
import authRouter from "./routes/authRoutes.js";
import userRouter from "./routes/userRoute.js";

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

// API Endpoints
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);

// Start the server and listen on the specified port
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
