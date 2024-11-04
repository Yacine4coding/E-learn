import express from "express";
import {
  addPost,
  getPosts,
  updatePost,
  voteDown,
  voteUp,
} from "../controller/post.js";
import { verifyToken } from "../middleware/jwt.js";
const post = express.Router();

post.post("/addPost", verifyToken, addPost);
post.get("/getposts", verifyToken, getPosts);
post.put("/update", verifyToken, updatePost);
post.put("/vote/up", verifyToken, voteUp);
post.put("/vote/down", verifyToken, voteDown);

export default post;
