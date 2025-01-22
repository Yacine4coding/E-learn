import { generateStudientInfo } from "../middleware/studient.js";
import Studient from "../models/Studient.js";
import StudientCourse from "../models/StudientCourse.js";
import {
  deleteCouseById,
  getCourseById,
  incrementCourseBuy,
} from "./courses.js";
import { isUserExist } from "./user.js";

export async function changePoint(req, res) {
  const { points } = req.body;
  const { userId } = req.params;
  if (!points) {
    res.status(422).send({ message: "points need to be different of 0" });
    return;
  }
  if (!userId) {
    res.status(422).send({ message: "user id not found" });
    return;
  }
  try {
    let studient = await Studient.findById(userId);
    if (!studient) {
      res.status(404).send({ message: "studient not found" });
      return;
    }
    studient.points += points;
    if (studient.points <= 0) studient.points = 0;
    studient = await studient.save();
    res.status(200).send({
      studient: generateStudientInfo(studient),
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
}
export async function buyCourse(req, res) {
  const { courseId } = req.params;
  const { userId: studentId } = req.body;
  try {
    const course = await getCourseById(courseId);
    const isAlreadyBuy = await StudientCourse.findOne({ courseId, studentId });
    switch (true) {
      case Boolean(isAlreadyBuy):
        res
          .status(400)
          .send({ message: "studient is already buy this course" });
        return;
      case !course:
        res.status(400).send({ message: "no course with this id" });
        return;
    }
    await new StudientCourse({ courseId, studentId }).save();
    res.status(200).send({
      message: "buy succesfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "internal server error" });
  }
}
export async function deleteStudientCourse(req, res) {
  const { courseId } = req.params;
  const { userId: studientId } = req.body;
  try {
    if (!(await StudientCourse.deleteOne({ courseId, studientId }))) {
      res.status(400).send({ message: "no studient course buy it" });
      return;
    }
    const course = await getCourseById(courseId);
    const { isExist } = await isUserExist(course.teacherId);
    if (!isExist) {
      await deleteCouseById(courseId);
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).send({ message: "internal server error" });
  }
}
// functions
export async function deleteStudient(studientId) {
  try {
    await Studient.findByIdAndDelete(studientId);
    return true;
  } catch (error) {
    return false;
  }
}
export async function createNewStudient() {
  try {
    const studient = await new Studient().save();
    return generateStudientInfo(studient);
  } catch (error) {
    return false;
  }
}
export async function getStudient(userId) {
  try {
    const studient = await Studient.findById(userId);
    return generateStudientInfo(studient);
  } catch (error) {
    return false;
  }
}
export async function updateCourse(userId, obj) {
  try {
    await Studient.updateOne(
      { _id: userId},
      { $set: { ...obj } }
    );
    return true ;
  } catch (error) {
    return false;
  }
}
