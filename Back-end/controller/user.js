import {
  addExistingToken,
  generateToken,
  isTokenCorrect,
} from "../middleware/jwt.js";
import { __dirname } from "../middleware/multer.js";
import path from "path";
import fs from "fs";
import {
  comparePassword,
  hashingPassword,
  generateUserInfo,
  generateUserName,
} from "../middleware/user.js";
import Studient from "../models/Studient.js";
import StudientCourse from "../models/StudientCourse.js";
import User from "../models/User.js";
import { getCourseById } from "./courses.js";
import { createNewStudient, getStudient } from "./studient.js";
import { createNewTeacher, getTeacher } from "./teacher.js";
import Courses from "../models/Course.js";
import { generateCourse } from "../middleware/course.js";

export async function updateUserInfo(req, res) {
  const {
    userId,
    username,
    password,
    currentPassword,
    bio = "",
    email = false,
    firstName,
    lastName,
    language,
    link,
  } = req.body;
  if (
    !username &&
    !password &&
    !bio &&
    !currentPassword &&
    !email &&
    !firstName &&
    !lastName
  )
    return res.status(204).send();
  try {
    let isUpdated = false;
    // GET USER DATA
    let user = await User.findById(userId);
    let userinfo = user.isteacher
      ? await getTeacher(user.userId)
      : await getStudient(user.userId);
    // UPDATE USER BIO
    if (user.bio !== bio) {
      user.bio = bio;
      isUpdated = true;
    }
    // UPDATE EMAIL
    // CHECK IF EMAIL FORM CORRECT
    if (email && user.email !== email) {
      if (!/^[a-zA-Z0-9._]+@[a-zA-Z.-]+\.[a-zA-Z]{3}$/.test(email))
        return res.status(400).send({ message: "email format are inccorect" });
      if (await User.findOne({ email }))
        return res.status(400).send({ message: "email is already exist" });
      user.email = email;
      isUpdated = true;
    }
    // UPDATE USER NAME
    if (username && username !== user.username) {
      if (await User.findOne({ username }))
        return res.status(400).send({ message: "username is already exist" });
      user.username = username;
      isUpdated = true;
    }
    // check PASSWORD CASES AND UPDATE IT
    if ((!password && currentPassword) || (password && !currentPassword))
      return res.status(400).send({
        message: "password or current password are empty",
      });
    if (password && currentPassword) {
      if (
        !user.password ||
        (await comparePassword(currentPassword, user.password))
      ) {
        user.password = await hashingPassword(password);
        isUpdated = true;
      } else {
        res.status(400).send({ message: "current password are incorrect" });
        return;
      }
    }
    //UPDATE LANGUAGE
    if (user.language !== language) {
      user.language = language;
      isUpdated = true;
    }
    //UPDATE LINK
    if (user.link !== link) {
      user.link = link;
      isUpdated = true;
    }
    // UPDATE FIRST NAME
    if (user.firstName !== firstName) {
      user.firstName = firstName;
      isUpdated = true;
    }
    // UPDATE LAST NAME
    if (user.lastName !== lastName) {
      user.lastName = lastName;
      isUpdated = true;
    }
    // SAVE UPDATES AND SEND RES
    if (!isUpdated) return res.status(204).send();
    user = await user.save();
    res.status(200).send({
      user: { ...generateUserInfo(user), ...userinfo },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "internal server error" });
  }
}
export async function getUserDashboard(req, res, next) {
  const { userId, isteacher, secondId } = req.body;
  if (isteacher) {
    next();
    return;
  }
  try {
    const informations = await Studient.findById(secondId); // get information of userID
    // * GET FAVORITE COURSE
    const favCourses = [];
    for (let i = 0; i < informations.favorite.length; i++) {
      const fav = informations.favorite[i];
      const c = await getCourseById(fav);
      if (!c || !c?.visible) continue;
      favCourses.push(await getCourseById(fav));
    }
    const buyCoursesId = await StudientCourse.find({ studentId: userId });
    // *  GET BUY COURSES
    const buyCourses = [];
    for (let i = 0; i < buyCoursesId.length; i++) {
      const ele = buyCoursesId[i];
      const course = await getCourseById(ele.courseId);
      buyCourses.push({
        ...course,
        progress: ele,
      });
    }

    // * GET WISHLIST COURSE
    const wishlistCourses = [];
    for (let i = 0; i < informations.wishlist.length; i++) {
      const wishlist = informations.wishlist[i];
      wishlistCourses.push(await getCourseById(wishlist));
    }
    // HUNDLE RES
    res.status(200).send({
      favCourses,
      buyCourses,
      wishlistCourses,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "internal server error",
    });
  }
}
export async function updateProfileImage(req, res) {
  try {
    const { userId } = req;
    const imgPath = req.file.path;
    const user = await User.findById(userId);

    if (!user) return res.status(404).send({ message: "user not found" });
    // delete the current path
    const isHasPicture = /^public/.test(user.picture);
    if (user.picture && isHasPicture) {
      const currentFilePath = path.join(__dirname, "/", user.picture);
      console.log(currentFilePath);
      if (fs.existsSync(currentFilePath)) {
        fs.unlinkSync(currentFilePath);
      }
    }
    // update picture
    user.picture = imgPath;
    const newUser = await user.save();
    res.status(200).send({ userinfo: generateUserInfo(newUser) });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "internal server error" });
  }
}
export async function getTeacherDashboard(req, res) {
  const { userId, secondId, user } = req.body;
  try {
    const teacher = await getTeacher(secondId);
    if (!teacher) return res.status(404).send({ message: "teacher not found" });
    const courses = await Courses.find({ teacherId: userId });
    const handleCourses = courses.map((ele) => generateCourse(ele, user));
    res.status(200).send({ courses: handleCourses });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "internal server error" });
  }
}
// * google auth
export function googleFaild(_, res) {
  res.status(401).send({
    message: "auth faild",
  });
}
// * function
export async function isUserExist(userId) {
  try {
    const isUserExist = await User.findById(userId);
    if (!isUserExist) return { isExist: false };
    return {
      isExist: true,
      user: {
        username: isUserExist.username,
        email: isUserExist.email,
        picture: isUserExist.picture,
        isteacher: isUserExist.isteacher,
        secondId: isUserExist.userId,
      },
    };
  } catch (error) {
    return false;
  }
}
export async function googleSingup(user, isteacher = false) {
  try {
    const { sub: emailId } = user;
    let isExist = await User.findOne({ emailId });
    let userinfo = null;
    if (!isExist) {
      userinfo = isteacher
        ? await createNewTeacher()
        : await createNewStudient();
      isExist = await new User({
        email: user.email,
        emailId,
        password: "",
        isHasPicture: true,
        picture: user.picture,
        userId: userinfo.userId,
        isteacher,
        username: await generateUserName(user.email),
      }).save();
    } else {
      userinfo = isExist.isteacher
        ? await getTeacher(isExist.userId)
        : await getStudient(isExist.userId);
    }
    return { ...generateUserInfo(isExist), ...userinfo };
  } catch (error) {
    return false;
  }
}
