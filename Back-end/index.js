import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
// modules path
import connectDb from "./middleware/database.js";
import user from "./routes/User.js";
dotenv.config();
const app = express();
connectDb();
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
// routes
app.use("/user",user)

// listen port 
app.listen(process.env.PORT, () => {
  console.log(`http://localhost:${process.env.PORT}`);
});
