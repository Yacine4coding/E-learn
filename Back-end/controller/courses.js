import {
  generateCourse,
  sortCourse,
  testChpater,
} from "../middleware/course.js";
import Courses from "../models/Course.js";
import StudientCourse from "../models/StudientCourse.js";
import { isUserExist } from "./user.js";

export async function addCourse(req, res) {
  const { title, description, userId, user, chapters = [], amount } = req.body;
  const picture = req.file || "";
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
      picture,
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
  const {
    userId: teacherId,
    user,
    title,
    description,
    amount,
    link,
  } = req.body;
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
    if (link && link !== course.link) {
      course.title = title;
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
export async function bestCourses(req, res) {
  const { count } = req.params;
  if (count <= 0) {
    res.status(400).send({ message: "count need to be greater than 0" });
    return;
  }
  try {
    let courses = await Courses.find();
    if (courses.length === 0) return res.status(204).send();
    for (let i = 0; i < courses.length; i++) {
      const { user } = await isUserExist(courses[i].teacherId);
      courses[i] = generateCourse(courses[i], user);
    }
    console.log(courses);
    if (courses.length <= count) return res.status(200).send({ courses });
    courses = sortCourse();
    if (!courses)
      return res.status(400).send({ message: "probleme in sort function" });
    courses.length = count;
    res.status(200).send({ courses });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "internal server error",
    });
  }
}
export async function courseById(req, res) {
  const { courseId, userId = false } = req.body;
  if (!courseId)
    return res.status(422).send({ message: "course id are required" });
  try {
    const course = await Courses.findById(courseId);
    if (!course) return res.status(404).send({ message: "course not found" });
    const { isExist, user } = await isUserExist(course.teacherId);
    if (!isExist) return res.status(400).send({ message: "unavaible" });
    let related = "none";
    switch (true) {
      case userId === course.teacherId:
        related = "owner";
        break;
      case Boolean(
        await StudientCourse.findOne({ courseId, studientId: userId })
      ):
        related = "studient";
        break;
    }
    return res.status(200).send({
      course: generateCourse(course, user, "none" !== related),
      related,
    });
  } catch (error) {
    res.status(500).send({ message: "internal server error" });
  }
}
// * functions
export async function getCoursesById(id, user) {
  try {
    let courses = await Courses.find({ teacherId: id });
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
export async function incrementCourseBuy(courseId) {
  try {
    const course = await Courses.findById(courseId);
    if (!course) return null;
    course.buyCount++;
    await course.save();
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
