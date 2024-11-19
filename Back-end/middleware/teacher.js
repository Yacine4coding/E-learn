export function generateTeacherInfo(teacher) {
  let { domain, _id: userId } = teacher;
  return { domain, userId };
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
