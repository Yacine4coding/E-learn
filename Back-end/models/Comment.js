import mongoose from "mongoose";

const commentSchema = mongoose.Schema(
  {
    userId: {
      unique: true,
      type: String,
      require: true,
    },
    text: {
      type: String,
      default: "",
    },
    vote: {
      type: {
        up: {
          count: Number,
          usersId: [Number],
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
