export function generateTeacherInfo(teacher) {
  let { domain, notifications, courses } = teacher;
  courses = {
    count: courses.count,
    coursesId: courses.coursesId,
  };
  return { domain, notifications, courses, taskes };
}
