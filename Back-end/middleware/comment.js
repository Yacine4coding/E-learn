import { isUserExist } from "../controller/user.js";

export async function formatComment(comment, user) {
  let { text, _id: id, vote, reply, postId } = comment;
  const { username, picture, isHasPicture } = user;
  vote = {
    up: vote.up,
    down: vote.down,
  };
  if (reply.isreply) {
    const { user: commentUser } = await isUserExist(commentOwnerId);
    reply = {
      isreply: reply.isreply,
      replyInfo: {
        picture: commentUser.picture,
        isHasPicture: commentUser.isHasPicture,
        username: commentUser.username,
      },
    };
  } else reply = { isreply: false };
  return {
    id,
    username,
    isHasPicture,
    picture,
    text,
    vote,
    ...reply,
    postId,
  };
}
