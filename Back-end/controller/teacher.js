import { generateTeacherInfo } from "../middleware/teacher.js";
import Teacher from "../models/Teacher.js";

export async function createNewTeacher() {
  try {
    const teacher = await new Teacher().save();
    return generateTeacherInfo(teacher);
  } catch (error) {
    return false;
  }
}
export async function getTeacher(userId) {
  try {
    const teacher = await Teacher.findById(userId);
    return generateTeacherInfo(teacher);
  } catch (error) {
    return false;
  }
}
export async function getTeacherDashboard(req, res) {
  const { userId, user } = req.body;
  try {
    const courses = await getCoursesById(userId, user);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
}
