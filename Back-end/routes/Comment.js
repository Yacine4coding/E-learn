import express from "express";
import {
  addComment,
  deleteComment,
  getPostComments,
  getUserComments,
  updateComments,
  voteDown,
  voteUp,
} from "../controller/comment.js";
import { verifyToken } from "../middleware/jwt.js";

const comment = express.Router();

comment.post("/:postId", verifyToken, addComment);
// * get posts
comment.get("/:postId", verifyToken, getPostComments);
comment.get("/userComment/:userId", verifyToken, getUserComments);
// * update data
comment.put("/:commentId", verifyToken, updateComments);
comment.put("/vote/up/:commentId", verifyToken, voteUp);
comment.put("/vote/down/:commentId", verifyToken, voteDown);
// * delete posts
comment.delete("/:commentId", verifyToken, deleteComment);
export default comment;
