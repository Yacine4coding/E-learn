export function generateTeacherInfo(teacher) {
  let { domain, notifications, courses, _id: userId } = teacher;
  courses = {
    count: courses.count,
    coursesId: courses.coursesId,
  };
  return { domain, notifications, courses, taskes, userId };
}
