import mongoose from "mongoose";

const commentSchema = mongoose.Schema(
  {
    postId: {
      type: String,
      require: true,
    },
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
        up: {
          count: 0,
          usersId: [],
        },
        down: {
          count: 0,
          usersId: [],
        },
      },
    },
  },
  { timestamps: true }
);

const Comment = mongoose.model("comment", commentSchema);
export default Comment;
