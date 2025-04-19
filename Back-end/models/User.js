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
    favorite: {
      type: Array,
      default: [],
    },
    wishlist: {
      type: Array,
      default: [],
    },
    firstName: {
      type: String,
      default: "",
    },
    lastName: {
      type: String,
      default: "",
    },
    language: {
      type: String,
      default: "english",
    },
    notifications: {
      type: Array,
      default: [],
    },
    emailId: {
      type: String,
      default: "",
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
    link: {
      type: String,
      default: "",
    },
    bio: {
      type: String,
      default: "",
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
