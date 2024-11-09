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
  const { username, isteacher, bio, userId, picture, isHasPicture } = user;
  return {
    userId,
    username,
    bio,
    isteacher,
    picture,
    isHasPicture,
  };
}