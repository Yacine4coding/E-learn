import express from "express";
import {
  addComment,
  addReply,
  deleteComment,
  getPostComments,
  updateComments,
  voteDown,
  voteUp,
} from "../controller/comment.js";
import { verifyToken } from "../middleware/jwt.js";
const comment = express.Router();
comment.post("/addreply", verifyToken, addReply);
comment.post("/:postId", verifyToken, addComment);
comment.get("/:postId", verifyToken, getPostComments);
comment.put("/:commentId", verifyToken, updateComments);
comment.put("/vote/up/:commentId", verifyToken, voteUp);
comment.put("/vote/down/:commentId", verifyToken, voteDown);
comment.delete("/:commentId", verifyToken, deleteComment);
export default comment;
