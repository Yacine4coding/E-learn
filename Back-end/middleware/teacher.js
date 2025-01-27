export function generateTeacherInfo(teacher) {
  let { domain, _id: userId } = teacher;
  return { domain, userId };
}
export function enableTeacher(req, res, next) {
  const { isteacher } = req.body;
  if (isteacher) next();
  else
    res.status(403).send({
      message: "studient or client have not the access to create new course",
    });
}
export function desableTeacher(req, res, next) {
  const { isteacher } = req.body;
  if (!isteacher) next();
  else
    res.status(403).send({
      message: "teacher not enable for this feature",
    });
}