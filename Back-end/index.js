import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
// modules path
import connectDb from "./middleware/database.js";
import user from "./routes/User.js";
import post from "./routes/Post.js";
import comment from "./routes/Comment.js";
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
// app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
// routes
app.use("/user", user);
app.use("/post", post);
app.use("/comment", comment);
// listen port
app.listen(process.env.PORT||3001, () => {
  console.log(`http://localhost:${process.env.PORT||3001}`);
});