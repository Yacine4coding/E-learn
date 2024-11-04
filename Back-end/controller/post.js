import { formatPost } from "../middleware/post.js";
import Post from "../models/Post.js";
import { isUserExist } from "./user.js";
export async function addPost(req, res) {
  const { text, userId, isteacher } = req.body;
  if (isteacher) {
    res.status(500).send("techers don't has access to add posts yet");
    return;
  }
  try {
    // check userId is correct
    const existingUser = await isUserExist(userId);
    if (!existingUser.isExist) {
      res.status(404).send("user id not found");
      return;
    }
    // check if text not empty
    if (!text) {
      res.status(404).send("text is required");
      return;
    }
    // add new post
    const post = await new Post({
      userId,
      text,
    }).save();
    // hundle post response
    const postFromat = formatPost(post, existingUser.user);
    res.status(200).send({
      message: "post add succesfuly",
      post: postFromat,
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
}
