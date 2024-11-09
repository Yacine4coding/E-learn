import mongoose from "mongoose";
const UserShcema = mongoose.Schema(
  {
    userId: {
      unique: true,
      type: String,
      require: true,
    },
    username: {
      unique: true,
      type: String,
      require: true,
    },
    notifications: {
      type: Array,
      default: [],
    },
    email: {
      unique: true,
      type: String,
      require: true,
    },
    password: {
      type: String,
      require: true,
    },
    isteacher: {
      type: Boolean,
      default: false,
    },
    bio: {
      type: String,
      default: "",
    },
    isHasPicture: {
      type: Boolean,
      default: false,
    },
    picture: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);
const User = mongoose.model("user", UserShcema);
export default User;
