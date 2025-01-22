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
  try {
    const { userId: teacherId } = req;
    const {
      title,
      description,
      introduction,
      price,
      level,
      category,
      chapters,
    } = JSON.parse(req.body.course);
    const { files: file } = req;
    // CHECK COURSE PICTURE
    if (!file || file.length === 0)
      return res.status(400).send("picture file and vedios not upload");
    // CHECK INITIAL INFORMATION
    if (!title || !description || !price || !level || !category)
      return res.status(422).send({ message: "all inputs are required" });
    // CHECK INTRODUCTION INFORMATION AND IF CHAPTERS EXIST
    if (!(chapters instanceof Array) || chapters.length < 1)
      return res.status(422).send({ message: "you need to add chapters" });
    if (!(introduction.title && introduction.description))
      return res
        .status(422)
        .send({ message: "all introduction info are required" });
    // CHECK EACH CHAPTER INFORMATINO
    for (let index = 0; index < chapters.length; index++) {
      const chapter = chapters[index];
      if (!(chapter.title && chapter.description))
        return res.status(422).send({
          message: `information of chapter number ${index + 1} are not empty`,
        });
      // CHECK CHAPTERS SIZE
      if (chapter.quizzes.length !== 5)
        return res.status(422).send({ message: "quize number must be 5" });

      // CHECK EACH CHAPTER INFORMATION
      for (let index2 = 0; index2 < chapter.quizzes.length; index2++) {
        const quize = chapter.quizzes[index2];
        if (!quize.question)
          return res.status(422).send({
            message: `question of quize number ${index2 + 1} is empty`,
          });

        for (let index3 = 0; index3 < quize.options.length; index3++) {
          const choice = quize.options[index3];
          if (!choice)
            return res
              .status(422)
              .send({ message: `choice number ${index3} are empty` });
        }
      }
    }
    // HANDLE VEDIOS AND PICTURE
    introduction.link = file[1].path;
    const picture = file[0].path;
    const Handlechapters = chapters.map(
      ({ title, description, quizzes }, index) => {
        return { title, description, quizzes, link: file[index + 2].path };
      }
    );
    const chapterNumber = Handlechapters.length;
    // SAVE TO MONGO
    const savedCourse = await new Courses({
      chapters: Handlechapters,
      chapterNumber,
      title,
      description,
      price,
      picture,
      level,
      category,
      teacherId,
      introduction,
    }).save();
    res.status(200).send(savedCourse);
  } catch (error) {
    console.log("error in add  course inside controllers/courses.js", error);
    res.status(500).send({ message: "internal server error" });
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
    console.log(courses);
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
    console.log(error);
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
    // GET COURSE DATA
    const course = await getCourseById(courseId);
    if (!course) return res.status(404).send({ message: "course not found" });
    // CHECK IF COURSE PAID
    // USER NOT LOGGIN
    if (!userId)
      return res.status(200).send({
        paid: false,
        course,
      });
    // USER LOGIN
    let user = await User.findById(userId);
    user = await getStudient(user.userId);
    // GET FAVORITE STATUS
    const isFavorite = user.favorite.includes(courseId);
    const isPaid = await StudientCourse.findOne({
      courseId,
      studentId: userId,
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
      course: { ...course, progress: isPaid, isFavorite },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "internal server error",
    });
  }
}
export async function searchCourses(req, res) {
  const { value } = req.params;
  try {
    const courses = await Courses.find({
      title: { $regex: value, $options: "i" },
      description: { $regex: value, $options: "i" },
    });
    if (!courses) return res.status(404).send();
    const handleCourses = [];
    for (let course of courses) {
      const { user, isExist } = await isUserExist(course.teacherId);
      if (!isExist) continue;
      const c = generateCourse(course, user);
      handleCourses.push(c);
    }
    res.status(200).send({ courses: handleCourses });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "internal server error" });
  }
}
export async function submitQuize(req, res) {
  const { userId, courseId, chapterNumber , quizeResult } = req.body;
  if (!courseId || chapterNumber < -1 || quizeResult === undefined)
    return res.status(422).send({ messge: "all body properties are required" });
  try {
    // GET COURSE INFORMATION
    const course = await Courses.findById(courseId);
    if (!course) return res.status(404).send({ message: "course not found" });
    // CHECK IF STUDENT BUY THIS COURSE AND GET HIS PROGRESS
    let progress = await StudientCourse.findOne({
      studentId: userId,
      courseId,
    });
    if (!progress)
      return res
        .status(403)
        .send({ message: "you need to buy this course first" });
    // INCREMENT PROGRESS
    if (progress.chapterNumber < course.chapterNumber) {
      progress.chapterNumber = progress.chapterNumber + 1;
      progress.for100 = (
        (progress.chapterNumber / course.chapterNumber) *
        100
      ).toFixed(2);
    }
    // SAVE QUIZE RESULT
    progress.quiz[chapterNumber] = quizeResult;
    progress = await progress.save();
    // SEND COURSE AND NEW PROGRESS
    const { user } = await isUserExist(course.teacherId);
    res.status(200).send({
      course: {
        ...generateCourse(course, user, true),
        progress: progress,
      },
    });
  } catch (error) {
    console.log("error in submit quize inside controller/courses.js\n", error);
    res.status(500).send({ message: "internal server error" });
  }
}
export async function getCourseProgress(req, res) {
 try {
  const { userId } = req.body;
  const {courseId} = req.params;
  const progress = await StudientCourse.findOne({studentId:userId,courseId});
  if (!progress) return res.status(403).send({message:"you don't have the access for this progress"});
  res.status(200).send(progress);
 } catch (error) {
  console.log(error);
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
