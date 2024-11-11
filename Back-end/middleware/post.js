import Post from "../models/Post.js";
export function formatPost(post, user) {
  let { text, _id: id, vote } = post;
  const { username, picture, isHasPicture } = user;
  vote = {
    up: vote.up,
    down: vote.down,
  };
  return {
    id,
    username,
    isHasPicture,
    picture,
    text,
    vote,
  };
}
export async function isPostExist(postId) {
  try {
    if (!postId) return { isExist: false };
    const post = await Post.findById(postId);
    return post ? { isExist: true, post } : { isExist: false };
  } catch (error) {
    return false;
  }
}
