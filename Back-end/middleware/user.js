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
    picture,
    isHasPicture,
    username,
    userId,
    bio,
    isteacher,
  };
}
export function generateStudientInfo(studient) {
  const { points, posts, comments, notifications, tasks } = studient;
  return { points, posts, comments, notifications, tasks };
}
export function generateTeacherInfo(teacher) {
  let { domain, notification, courses } = teacher;
  courses = {
    count: courses.count,
    coursesId: courses.coursesId,
  };

  return { domain, notification, courses };
}
