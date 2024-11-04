import express from "express";
import { addPost } from "../controller/post.js";
import { verifyToken } from "../middleware/jwt.js";
const post = express.Router();

post.post("/addPost", verifyToken, addPost);

export default post;
