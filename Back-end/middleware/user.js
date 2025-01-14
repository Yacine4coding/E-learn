import bcrypt from "bcryptjs";
import User from "../models/User.js";

export async function hashingPassword(password) {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  return hash;
}
export async function comparePassword(pass, hashPass) {
  const isCorrectPassword = await bcrypt.compare(pass, hashPass);
  return isCorrectPassword;
}
export function generateUserInfo(user) {
  let {
    username,
    isteacher,
    notifications,
    bio,
    email,
    link,
    emailId,
    picture,
    language,
    firstName,
    lastName,
  } = user;
  if (/^public/.test(picture)) picture = `http://localhost:5000/${picture}`;
  return {
    email,
    link,
    language,
    firstName,
    lastName,
    username,
    emailValidate: Boolean(emailId),
    bio,
    notifications,
    isteacher,
    picture,
  };
}
export async function generateUserName(email) {
  let username = email.split("@")[0];
  // check if userename is already exist
  let isUserExist = false;
  do {
    isUserExist = await User.findOne({ username });
    if (isUserExist) username = `${username}${parseInt(Math.random() * 1000)}`;
  } while (isUserExist);
  return username;
}
