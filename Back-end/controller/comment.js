import { formatComment } from "../middleware/comment.js";
import { isPostExist } from "../middleware/post.js";
import Comment from "../models/Comment.js";
import { isUserExist } from "./user.js";
// ? add post
export async function addComment(req, res) {
  const { userId, user, text } = req.body;
  const { postId } = req.params;
  //   * check body req
  if (!text || !postId) {
    res.status(422).send({ message: "post id or text not found" });
    return;
  }
  try {
    //  * check if post is exist
    const { isExist, post } = await isPostExist(postId);
    if (!isExist) {
      res.status(404).send({ message: "post not found" });
      return;
    }
    let comment = await new Comment({
      userId,
      postId,
      text,
    }).save();
    post.comment.push(comment._id.toString());
    await post.save();
    comment = formatComment(comment, user);
    res.status(200).send({
      comment,
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
}

// ? get posts
export async function getPostComments(req, res) {
  const { postId } = req.params;
  if (!postId) {
    res.status(404).send({ message: "post id not found" });
    return;
  }
  try {
    let comments = await Comment.find({ postId });
    if (!comments.length) {
      res.status(200).send({
        count: 0,
        comments: [],
      });
      return;
    }
    for (let i = 0; i < comments.length; i++) {
      const { isExist, user } = await isUserExist(comments[i].userId);
      if (isExist) comments[i] = formatComment(comments[i], user);
      else {
        await Comment.findByIdAndDelete(comments[i]._id);
        comments.splice(i, 1);
      }
    }
    res.status(200).send({
      count: comments.length,
      comments,
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
}
export async function getUserComments(req, res) {
  const { userId } = req.params;
  if (!userId) {
    res.status(404).send({ message: "user id not found" });
    return;
  }
  try {
    const { isExist, user } = await isUserExist(userId);
    if (!isExist) {
      res.status(404).send({ message: "user not found" });
      return;
    }
    let comments = await Comment.find({ userId });
    if (!comments.length) {
      res.status(200).send({
        count: 0,
        comments: [],
      });
      return;
    }
    comments = comments.map((comment) => formatComment(comment, user));
    res.status(200).send({
      count: comments.length,
      comments,
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
}
// ? update posts
export async function updateComments(req, res) {
  const { userId, text, user } = req.body;
  const { commentId } = req.params;
  if (!commentId) {
    res.status(404).send({
      message: "post id not found",
    });
    return;
  }
  if (!text) {
    res.status(404).send({
      message: "text is empty",
    });
    return;
  }
  try {
    let comment = await Comment.findById(commentId);
    if (!comment) {
      res.status(404).send({ message: "post not found" });
      return;
    }
    if (comment.userId !== userId) {
      res.status(400).send({ message: "isn't your comment" });
      return;
    }
    if (comment.text !== text) {
      comment.text = text;
      comment = await comment.save();
    }
    res.status(200).send({
      message: "comment are update successfuly",
      comment: formatComment(comment, user),
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
}
export async function voteUp(req, res) {
  const { userId, isteacher } = req.body;
  const { commentId } = req.params;
  if (!commentId) {
    res.status(404).send({ message: "post id not found" });
    return;
  }
  try {
    let comment = await Comment.findById(commentId);
    if (!comment) {
      res.status(404).send("comment not found");
      return;
    }
    const { isExist, user: commentOwner } = await isUserExist(comment.userId);
    if (!isExist) {
      res.status(400).send({ message: "comment owner not found" });
      return;
    }
    const isVotedUp = comment.vote.up.usersId.indexOf(userId);
    if (isVotedUp !== -1) {
      comment.vote.up.usersId.splice(isVotedUp, 1);
      comment.vote.up.count--;
    } else {
      comment.vote.up.usersId.push(userId);
      console.log(comment.vote.up);
      comment.vote.up.count++;
      const isVotedDown = comment.vote.down.usersId.indexOf(userId);
      if (isVotedDown !== -1) {
        comment.vote.down.usersId.splice(isVotedDown, 1);
        comment.vote.down.count--;
      }
    }
    comment = await comment.save();
    res.status(200).send({
      comment: formatComment(comment, commentOwner),
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
}
export async function voteDown(req, res) {
  const { userId, isteacher } = req.body;
  const { commentId } = req.params;

  if (!commentId) {
    res.status(404).send({ message: "comment id not found" });
    return;
  }
  try {
    let comment = await Comment.findById(commentId);
    if (!comment) {
      res.status(404).send("comment not found");
      return;
    }
    const { isExist, user: commentOwner } = await isUserExist(comment.userId);
    if (!isExist) {
      res.status(400).send({ message: "comment owner not found" });
      return;
    }
    const isVotedDown = comment.vote.down.usersId.indexOf(userId);
    if (isVotedDown !== -1) {
      comment.vote.down.usersId.splice(isVotedDown, 1);
      comment.vote.down.count--;
    } else {
      comment.vote.down.usersId.unshift(userId);
      comment.vote.down.count++;
      const isVotedUp = comment.vote.up.usersId.indexOf(userId);
      if (isVotedUp !== -1) {
        comment.vote.up.usersId.splice(isVotedUp, 1);
        comment.vote.up.count--;
      }
    }
    comment = await comment.save();
    res.status(200).send({
      comment: formatComment(comment, commentOwner),
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
}
// ? delete post
export async function deleteComment(req, res) {
  const { commentId } = req.params;
  const { userId } = req.body;
  if (!commentId) {
    res.status(404).send("comment id not found");
    return;
  }
  try {
    const isDeleted = await Comment.deleteOne({ _id: commentId, userId });
    if (isDeleted.deletedCount) {
      res.status(200).send({ message: "delete succefuly" });
    } else {
      res.status(400).send({ message: "delete faild" });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
}
