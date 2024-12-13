import { formatComment } from "../middleware/comment.js";
import { isPostExist } from "../middleware/post.js";
import Comment from "../models/Comment.js";
import { isUserExist } from "./user.js";
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
    const { isExist } = await isPostExist(postId);
    if (!isExist) {
      res.status(404).send({ message: "post not found sss" });
      return;
    }
    let comment = await new Comment({
      userId,
      postId,
      text,
    }).save();
    res.status(200).send({
      comment: await formatComment(comment, user),
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
}
export async function getPostComments(req, res) {
  const { postId } = req.params;
  if (!postId) {
    res.status(422).send({ message: "post id not found" });
    return;
  }
  try {
    let comments = await Comment.find({ postId });
    if (!comments.length) {
      res.status(201).send();
      return;
    }
    let normalComment = [];
    let replies = [];

    for (let i = 0; i < comments.length; i++) {
      const comment = comments[i];
      const { isExist, user: commentUser } = await isUserExist(comment.userId);
      if (comment.reply.isreply) {
        replies.push(await formatComment(comment, commentUser));
      } else {
        normalComment.push(await formatComment(comment, commentUser));
      }
    }
    replies.forEach((reply) => {
      const index = normalComment.indexOf({ id: reply.reply.commentId });
      if (index > -1) {
        normalComment.splice(index, 0, reply);
      }
    });
    res.status(200).send({
      count: normalComment.length,
      comments: normalComment,
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
}
export async function updateComments(req, res) {
  const { userId, text, user } = req.body;
  const { commentId } = req.params;
  if (!commentId) {
    res.status(422).send({
      message: "post id not found",
    });
    return;
  }
  if (!text) {
    res.status(422).send({
      message: "text is empty",
    });
    return;
  }
  try {
    let comment = await Comment.findById(commentId);
    if (!comment) {
      res.status(404).send({ message: "comment not found" });
      return;
    }
    if (comment.userId !== userId) {
      res.status(403).send({ message: "isn't your comment" });
      return;
    }
    if (comment.text !== text) {
      comment.text = text;
      comment = await comment.save();
    }
    res.status(200).send({
      comment: await formatComment(comment, user),
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
}
export async function voteUp(req, res) {
  const { userId } = req.body;
  const { commentId } = req.params;
  if (!commentId) {
    res.status(422).send({ message: "comment id not found" });
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
      console.log("remove");
      comment.vote.up.usersId.splice(isVotedUp, 1);
      comment.vote.up.count--;
    } else {
      console.log("add");
      comment.vote.up.usersId.push(userId);
      comment.vote.up.count++;
      const isVotedDown = comment.vote.down.usersId.indexOf(userId);
      if (isVotedDown !== -1) {
        comment.vote.down.usersId.splice(isVotedDown, 1);
        comment.vote.down.count--;
      }
    }
    comment = await comment.save();
    res.status(200).send({
      comment: await formatComment(comment, commentOwner),
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
}
export async function voteDown(req, res) {
  const { userId } = req.body;
  const { commentId } = req.params;

  if (!commentId) {
    res.status(422).send({ message: "comment id not found" });
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
      comment: await formatComment(comment, commentOwner),
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
}
export async function deleteComment(req, res) {
  const { commentId } = req.params;
  const { userId } = req.body;
  if (!commentId) {
    res.status(422).send("comment id not found");
    return;
  }
  try {
    const isDeleted = await Comment.findByIdAndDelete({
      _id: commentId,
      userId,
    });
    if (isDeleted) {
      await Comment.deleteMany({
        "reply.commentId": commentId,
      });
      res.status(204).send();
    } else {
      console.log(isDeleted);
      res.status(400).send({ message: "delete faild" });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
}
export async function addReply(req, res) {
  const { userId, commentId, text, user } = req.body;
  if (!(commentId && text)) {
    res.status(422).send({ message: "one of body properties are empty" });
    return;
  }
  try {
    const comment = await Comment.findById(commentId);
    if (!comment) {
      res.status(404).send({ message: "comment not found" });
      return;
    }
    const { postId } = comment;
    const commentOwnerId = comment.userId;
    const reply = await new Comment({
      postId,
      text,
      userId,
      reply: {
        isReply: true,
        commentOwnerId,
        commentId,
      },
    }).save();
    res.status(200).send({
      comment: await formatComment(reply, user),
    });
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
}
export async function deleteUserComment(userId) {
  try {
    await Comment.deleteMany({
      $or: [
        { userId },
        {
          reply: { isReply: true, commentOwnerId: userId },
        },
      ],
    });
    return true;
  } catch (error) {
    return false;
  }
}
export async function deletePostComment(postId) {
  try {
    await Comment.deleteMany({ postId });
    return true;
  } catch (error) {
    return false;
  }
}
