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
  const { username, isTeacher, bio, userId } = user;
  return {
    username,
    userId,
    bio,
    isTeacher,
  };
}
export function generateStudientInfo(studient) {
  const { points, posts, comments, notifications, tasks } = studient;
  return { points, posts, comments, notifications, tasks };
}
export function generateTeacherInfo(teacher) {
  const { domain, notifications, courses } = teacher;
}
