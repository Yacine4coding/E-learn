import {
  generateCourse,
  sortCourse,
  testChpater,
} from "../middleware/course.js";
import Courses from "../models/Course.js";
import StudientCourse from "../models/StudientCourse.js";
import User from "../models/User.js";
import { getStudient, updateCourse } from "./studient.js";
import { isUserExist } from "./user.js";

export async function addCourse(req, res) {
  const {
    title,
    description,
    userId,
    user,
    chapters = [],
    amount,
    picture,
  } = req.body;
  // const picture = req.file;
  if (
    !(picture && title && description && chapters.length !== 0 && amount >= 0)
  ) {
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
    courses = courses.map((course) => generateCourse(course, user, true));
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
    if (courses.length <= count) return res.status(200).send({ courses });
    courses = sortCourse(courses);
    if (!courses)
      return res.status(400).send({ message: "probleme in sort function" });
    courses.length = count;
    res.status(200).send({ courses });
  } catch (error) {
    res.status(500).send({
      message: "internal server error",
    });
  }
}
export async function wishlistCourses(req, res) {
  const { secondId } = req.body;
  const { courseId } = req.params;
  try {
    // CHECK IF COURSE EXIST
    const { isExist } = await getCourseById(courseId);
    if (!isExist) return res.status(404).send({ message: "course not found" });
    const { wishlist } = await getStudient(secondId);
    const indexOfCourseId = wishlist.indexOf(courseId);
    if (indexOfCourseId === -1) {
      wishlist.push(courseId);
      await updateCourse(secondId, { wishlist });
      return res.status(200).send({ message: "add succesfully" });
    }
    wishlist.splice(indexOfCourseId, 1);
    await updateCourse(secondId, { wishlist });
    res.status(200).send({ message: "delete successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "internal server error" });
  }
}
export async function favoriteCourses(req, res) {
  const { secondId } = req.body;
  const { courseId } = req.params;
  try {
    const { favorite } = await getStudient(secondId);
    const indexOfCourseId = favorite.indexOf(courseId);
    if (indexOfCourseId === -1) {
      favorite.push(courseId);
      await updateCourse(secondId, { favorite });
      return res.status(200).send({ message: "add succesfully" });
    }
    favorite.splice(indexOfCourseId, 1);
    await updateCourse(secondId, { favorite });
    res.status(200).send({ message: "delete successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "internal server error" });
  }
}
export async function getCourse(req, res) {
  // get data
  const { userId } = req.body;
  const { courseId } = req.params;
  try {
    const course = await getCourseById(courseId);
    // COURSE NOT FOUND
    if (!course) return res.status(404).send({ message: "course not found" });
    // IF COURSE NOT PAID
    if (!userId)
      return res.status(200).send({
        paid: false,
        course,
      });
    let user = await User.findById(userId);
    user = await getStudient(user.userId);
    const isFavorite = user.favorite.includes(courseId);
    const isPaid = await StudientCourse.findOne({
      courseId,
      studientId: userId,
    });
    if (!isPaid)
      return res.status(200).send({
        paid: false,
        course: {
          ...course,
          isFavorite,
        },
      });
    // IF COURSE PAID
    res.status(200).send({
      paid: true,
      course: { ...course, progress: isPaid.progress , isFavorite },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "internal server error",
    });
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
    return true;
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
