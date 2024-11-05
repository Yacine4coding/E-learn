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
// * add post
post.post("/", verifyToken, addPost);
// * get posts
post.get("/", verifyToken, getPosts);
post.get("/posts", verifyToken, posts);
post.get("/userPost/:userId", verifyToken, getUserPosts);
// * update data
post.put("/:postId", verifyToken, updatePost);
post.put("/vote/up/:postId", verifyToken, voteUp);
post.put("/vote/down/:postId", verifyToken, voteDown);
// * delete posts
post.delete("/:postId", verifyToken, deletePost);

export default post;
