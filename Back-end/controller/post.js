import { addExistingToken } from "../middleware/jwt.js";
import { formatPost } from "../middleware/post.js";
import Post from "../models/Post.js";
import { deletePostComment } from "./comment.js";
import { isUserExist } from "./user.js";
// ? add post
export async function addPost(req, res) {
  const { text, userId, user } = req.body;
  try {
    // check if text not empty
    if (!text) {
      res.status(422).send({ message: "text is required" });
      return;
    }
    // add new post
    const post = await new Post({
      userId,
      text,
    }).save();
    // hundle post response
    res.status(200).send({
      post: formatPost(post, user),
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
}
// ? delete post
export async function deletePost(req, res) {
  const { postId } = req.params;
  const { userId } = req.body;
  if (!postId) {
    res.status(422).send("post id not found");
    return;
  }
  try {
    await deletePostComment(postId);
    const isDeleted = await Post.deleteOne({ _id: postId, userId });
    if (isDeleted.deletedCount) {
      res.status(204).send();
    } else {
      res
        .status(400)
        .send({ message: "delete faild are you sure is your post" });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
}
// ? get posts
export async function getPosts(req, res) {
  const { userId, user } = req.body;
  try {
    const posts = await Post.find({ userId });
    if (posts.length === 0) {
      res.status(204).send();
      return;
    }
    const postsFormat = posts.map((post) => formatPost(post, user));
    res.status(200).send({
      count: posts.length,
      posts: postsFormat,
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
}
export async function getUserPosts(req, res) {
  const { userId } = req.params;
  if (!userId) {
    res.status(422).send({ message: "user id not found" });
    return;
  }
  try {
    let { isExist, user } = await isUserExist(userId);
    if (!isExist) {
      res.status(404).send({ message: "user not found" });
      return;
    }
    let posts = await Post.find({ userId });
    if (!posts.length) {
      res.status(204).send();
      return;
    }
    posts = posts.map((userpost) => formatPost(userpost, user));
    res.status(200).send({
      count: posts.length,
      posts,
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
}
export async function posts(req, res) {
  if (req.cookies.token) addExistingToken(req.cookies.token, res);
  try {
    let posts = await Post.find();
    if (!posts.length) {
      res.status(204).send();
      return;
    }
    for (let i = 0; i < posts.length; i++) {
      const { isExist, user } = await isUserExist(posts[i].userId);
      if (isExist) posts[i] = formatPost(posts[i], user);
      else posts.splice(i, 1);
    }
    res.status(200).send({
      count: posts.length,
      posts,
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
}
// ? update posts
export async function updatePost(req, res) {
  const { userId, text, user } = req.body;
  const { postId } = req.params;
  //   check inputs
  if (!postId) {
    res.status(422).send("postId is empty");
    return;
  }
  if (!text) {
    res.status(422).send({ message: "text is required" });
    return;
  }
  try {
    // check post and user access
    let post = await Post.findById(postId);
    if (!post) {
      res.status(404).send({ message: "post not found" });
      return;
    }
    if (userId !== post.userId) {
      res.status(403).send({ message: "sorry !! but isn't your post" });
      return;
    }
    // hundle update
    if (post.text !== text) {
      post.text = text;
      post = await post.save();
    }
    res.status(200).send({
      post: formatPost(post, user),
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
}
export async function voteUp(req, res) {
  const { userId } = req.body;
  const { postId } = req.params;
  if (!postId) {
    res.status(422).send({ message: "post id not found" });
    return;
  }

  try {
    let post = await Post.findById(postId);
    if (!post) {
      res.status(404).send("post not found");
      return;
    }
    const { isExist, user: postOwner } = await isUserExist(post.userId);
    if (!isExist) {
      res.status(404).send({ message: "post owner not found" });
      return;
    }
    const isVotedUp = post.vote.up.usersId.indexOf(userId);
    if (isVotedUp !== -1) {
      post.vote.up.usersId.splice(isVotedUp, 1);
      post.vote.up.count--;
    } else {
      post.vote.up.usersId.unshift(userId);
      post.vote.up.count++;
      const isVotedDown = post.vote.down.usersId.indexOf(userId);
      if (isVotedDown !== -1) {
        post.vote.down.usersId.splice(isVotedDown, 1);
        post.vote.down.count--;
      }
    }
    post = await post.save();
    res.status(200).send({
      post: formatPost(post, postOwner),
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
}
export async function voteDown(req, res) {
  const { userId } = req.body;
  const { postId } = req.params;

  if (!postId) {
    res.status(422).send({ message: "post id not found" });
    return;
  }
  try {
    let post = await Post.findById(postId);
    if (!post) {
      res.status(404).send("post not found");
      return;
    }
    const { isExist, user: postOwner } = await isUserExist(post.userId);
    if (!isExist) {
      res.status(404).send({ message: "post owner not found" });
      return;
    }
    const isVotedDown = post.vote.down.usersId.indexOf(userId);
    if (isVotedDown !== -1) {
      post.vote.down.usersId.splice(isVotedDown, 1);
      post.vote.down.count--;
    } else {
      post.vote.down.usersId.unshift(userId);
      post.vote.down.count++;
      const isVotedUp = post.vote.up.usersId.indexOf(userId);
      if (isVotedUp !== -1) {
        post.vote.up.usersId.splice(isVotedUp, 1);
        post.vote.up.count--;
      }
    }
    post = await post.save();
    res.status(200).send({
      post: formatPost(post, postOwner),
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
}
export async function deleteUserPosts(userId) {
  try {
    const posts = await Post.find({ userId });
    await posts.forEach(async (ele) => {
      await deletePostComment(ele._id.toString());
    });
    await Post.deleteMany({ userId });
    return true;
  } catch (error) {
    return false;
  }
}
