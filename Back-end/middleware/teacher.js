export function generateTeacherInfo(teacher) {
  let { domain, _id: teacherId } = teacher;
  return { domain, teacherId };
}
export function enableTeacher(req, res, next) {
  const { isteacher } = req.body;
  console.log(isteacher);
  if (isteacher) next();
  else
    res.status(403).send({
      message: "studient or client have not the access to create new course",
    });
}
