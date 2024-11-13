export function generateTeacherInfo(teacher) {
  let { domain, _id: userId } = teacher;
  return { domain, userId };
}
