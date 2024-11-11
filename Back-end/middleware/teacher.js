export function generateTeacherInfo(teacher) {
  let { domain, courses, _id: userId } = teacher;
  courses = {
    count: courses.count,
    coursesId: courses.coursesId,
  };
  return { domain, courses, userId };
}
