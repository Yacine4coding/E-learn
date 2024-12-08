import express from "express";
import {
  addPost,
  deletePost,
  getPosts,
  getUserPosts,
  posts,
  updatePost,
  voteDown,
  voteUp,
} from "../controller/post.js";
import { verifyToken } from "../middleware/jwt.js";
const post = express.Router();
post.post("/", verifyToken, addPost);
post.get("/", verifyToken, getPosts);
post.get("/posts", posts);
post.get("/userpost/:userId", verifyToken, getUserPosts);
post.put("/:postId", verifyToken, updatePost);
post.put("/vote/up/:postId", verifyToken, voteUp);
post.put("/vote/down/:postId", verifyToken, voteDown);
post.delete("/:postId", verifyToken, deletePost);
export default post;
