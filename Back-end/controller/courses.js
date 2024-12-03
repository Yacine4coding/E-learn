import { generateCourse, testChpater } from "../middleware/course.js";
import Courses from "../models/Course.js";
import { isUserExist } from "./user.js";

export async function addCourse(req, res) {
  const { title, description, userId, user, chapters, amount } = req.body;
  if (!(title && description && chapters.length !== 0 && amount >= 0)) {
    res.status(422).send({
      message:
        "one of course properties are empty (title description chapters amount)",
    });
    return;
  }
  try {
    // * verify chapter
    let result = { isTrue: true };
    chapters.forEach((ele) => {
      if (!(ele.queezes instanceof Array)) ele.queezes = [];
      const verification = testChpater(ele);
      if (!verification.isTrue) {
        result = verification;
        return;
      }
    });
    if (!result.isTrue) {
      res.status(400).send({ message: result.message });
      return;
    }
    const course = await new Courses({
      title,
      description,
      teacherId: userId,
      chapters,
      amount,
      chapterNumber: chapters.length,
    }).save();
    res.status(201).send({
      course: generateCourse(course, user, true),
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
}
export async function getPersonellCourses(req, res) {
  const { userId, user } = req.body;
  try {
    let courses = await Courses.find({ teacherId: userId });
    if (courses.length === 0) {
      res.status(204).send();
      return;
    }
    courses = courses.map((course) => generateCourse(course, user));
    res.status(200).send({
      count: courses.length,
      courses,
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
}
export async function getTeacherCourses(req, res) {
  const { teacherId } = req.params;
  if (!teacherId) {
    res.status(422).send({
      message: "teacher id is empty",
    });
    return;
  }
  try {
    const { isExist, user: teacher } = await isUserExist(teacherId);
    if (!isExist) {
      res.status(404).send({ message: "teacher not found" });
      return;
    }
    if (!teacher.isteacher) {
      res.status(400).send({ message: "the id isn't of teacher" });
      return;
    }
    let courses = await Courses.find({ teacherId });
    if (courses.length === 0) {
      res.status(204).send();
      return;
    }
    courses = courses.map((course) => generateCourse(course, teacher));
    res.status(200).send({
      count: courses.length,
      courses,
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
}
export async function updateCourses(req, res) {
  const { userId: teacherId, user, title, description, amount } = req.body;
  const { courseId } = req.params;
  try {
    let course = await Courses.findById(courseId);
    if (!course) {
      res.status(400).send({ message: "post not found" });
      return;
    }
    if (teacherId !== course._id.toString()) {
      res.status(403).send({
        message: "sorry !! but isn't your course",
      });
      return;
    }
    let isUpdated = false;
    if (title && title !== course.title) {
      course.title = title;
      isUpdated = true;
    }
    if ((amount) => 0 && amount != course.amount) {
      course.amount = amount;
      isUpdated = true;
    }
    if (description && description !== course.description) {
      course.description = description;
      isUpdated = true;
    }

    // * end
    if (!isUpdated) {
      res.status(204).send();
      return;
    }
    course = await course.save();
    res.status(200).send({
      course: generateCourse(course, user),
    });
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
}
// * functions
export async function getCoursesById(id, user) {
  try {
    let courses = await Course.find({ teacherId: id });
    if (courses.length !== 0) return null;
    courses = courses.map((course) => generateCourse(course, user));
    return courses;
  } catch (error) {
    return null;
  }
}
export async function getCourseById(courseId) {
  try {
    const course = await Courses.findById(courseId);
    if (!course) return null;
    const { isExist, user } = await isUserExist(course.teacherId);
    if (!isExist) return null;
    return generateCourse(course, user, true);
  } catch (error) {
    return null;
  }
}
export async function deleteTeacherCourses(teacherId) {
  try {
    await Courses.deleteMany({ teacherId });
    return true;
  } catch (error) {
    return false;
  }
}
export async function deleteCouseById(courseId) {
  try {
    await Courses.findByIdAndDelete({ teacherId });
    return true;
  } catch (error) {
    return false;
  }
}
