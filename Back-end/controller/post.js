import { formatPost } from "../middleware/post.js";
import Post from "../models/Post.js";
import { isUserExist } from "./user.js";
// ? add post 
export async function addPost(req, res) {
  const { text, userId, isteacher, user } = req.body;
  if (isteacher) {
    res.status(500).send("techers don't has access to add posts yet");
    return;
  }
  try {
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
    res.status(200).send({
      message: "post add succesfuly",
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
    res.status(404).send("post id not found");
    return;
  }
  try {
    const isDeleted = await Post.deleteOne({ _id: postId, userId });
    if (isDeleted.deletedCount) {
      res.status(200).send({ message: "delete succefuly" });
    } else {
      res.status(400).send({ message: "delete faild" });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
}
// ? get posts 
export async function getPosts(req, res) {
  const { userId, isteacher, user } = req.body;
  if (isteacher) {
    res.status(500).send({
      message: "teacher hasn't access to posts yet",
    });
  }
  try {
    const posts = await Post.find({ userId });
    if (posts.length === 0) {
      res.status(200).send({
        count: 0,
        message: "no post yet",
      });
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
    res.status(404).send({ message: "user id not found" });
    return;
  }
  try {
    let { isExist, user } = await isUserExist(userId);
    if (!isExist) {
      res.status(404).send({ message: "user not found" });
      return;
    }
    let userposts = await Post.find({ userId });
    if (!userposts.length) {
      res.status(200).send({
        count: 0,
        userposts,
      });
      return;
    }
    userposts = userposts.map((userpost) => formatPost(userpost, user));
    res.status(200).send({
      count: userposts.length,
      userposts,
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
}
export async function posts(req, res) {
  const { user, userId } = req.body;
  try {
    let userposts = await Post.find({ userId });
    if (!userposts.length) {
      res.status(200).send({
        count: 0,
        userposts,
      });
      return;
    }
    userposts = userposts.map((userpost) => formatPost(userpost, user));
    res.status(200).send({
      count: userposts.length,
      userposts,
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
}
// ? update posts
export async function updatePost(req, res) {
  const { isteacher, userId, text, user } = req.body;
  const { postId } = req.params;
  //   check inputs
  if (!postId) {
    res.status(404).send("postId is empty");
    return;
  }

  if (isteacher) {
    res.status(500).send("teacher hasn't access for posts yet");
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
      res.status(400).send({ message: "sorry !! but isn't your post" });
      return;
    }
    // hundle update
    if (post.text !== text) {
      post.text = text;
      post = await post.save();
    }
    res.status(200).send({
      message: "post is updated",
      post: formatPost(post, user),
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
}
export async function voteUp(req, res) {
  const { userId, isteacher } = req.body;
  const { postId } = req.params;
  if (!postId) {
    res.status(404).send({ message: "post id not found" });
    return;
  }
  if (isteacher) {
    res.status(500).send({ message: "teacher hasn't acces to posts yet" });
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
      res.status(400).send({ message: "post owner not found" });
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
  const { userId, isteacher } = req.body;
  const { postId } = req.params;

  if (!postId) {
    res.status(404).send({ message: "post id not found" });
    return;
  }
  if (isteacher) {
    res.status(500).send({ message: "teacher hasn't acces to posts yet" });
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
      res.status(400).send({ message: "post owner not found" });
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