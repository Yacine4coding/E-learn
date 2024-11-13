import bcrypt from "bcryptjs";

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
  const {
    username,
    isteacher,
    notifications,
    bio,
    emailId,
    isHasPicture,
    picture,
  } = user;
  return {
    userId,
    username,
    emailValidate : Boolean(emailId),
    bio,
    notifications,
    isteacher,
    picture,
    isHasPicture,
  };
}
export function generateGoogleProps(callbackURL) {
  return {
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL ,
    scope: ["profile", "email"],
  };
}
