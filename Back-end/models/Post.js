import mongoose from "mongoose";

const postSchema = mongoose.Schema(
  {
    userId: {
      type: String,
      require: true,
    },
    text: {
      type: String,
      require: true,
    },
    vote: {
      type: {
        up: {
          count: Number,
          usersId: [],
        },
        down: {
          count: Number,
          usersId: [],
        },
      },
      default: {
        up: { count: 0, usersId: [] },
        down: { count: 0, usersId: [] },
      },
    },
  },
  { timestamps: true }
);
const Post = mongoose.model("post", postSchema);
export default Post;
