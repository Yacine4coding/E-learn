import {
  addExistingToken,
  generateToken,
  isTokenCorrect,
} from "../middleware/jwt.js";
import {__dirname} from "../middleware/multer.js";
import path from 'path';
import fs from 'fs';
import {
  comparePassword,
  hashingPassword,
  generateUserInfo,
  generateUserName,
} from "../middleware/user.js";
import Studient from "../models/Studient.js";
import StudientCourse from "../models/StudientCourse.js";
import User from "../models/User.js";
import { deleteUserComment } from "./comment.js";
import { getCourseById } from "./courses.js";
import { deleteUserPosts } from "./post.js";
import { createNewStudient, deleteStudient, getStudient } from "./studient.js";
import { createNewTeacher, deleteTeacher, getTeacher } from "./teacher.js";

export async function singup(req, res) {
  let { email, password, isteacher = false, picture = "" } = req.body;
  isteacher = Boolean(isteacher);
  try {
    // hundle params
    switch (true) {
      case !email || !password:
        return res.status(422).send({ message: "all inputs is required" });
      case !/^[a-zA-Z0-9._]+@[a-zA-Z.-]+\.[a-zA-Z]{3}$/.test(email):
        return res.status(400).send({ message: "email not correct" });
      case Boolean(await User.findOne({ email })):
        return res.status(409).send({ message: "email is already exist" });
    }
    // create user info
    let userAccount = isteacher
      ? await createNewTeacher()
      : await createNewStudient();
    if (!userAccount) {
      res.status(500).send({ message: "Internal server error" });
      return;
    }
    // generate username
    const username = await generateUserName(email);
    // hashing password
    const passwordHash = await hashingPassword(password);
    const newUser = await new User({
      isteacher,
      userId: userAccount.userId.toString(),
      email,
      username,
      password: passwordHash,
      isHasPicture: Boolean(picture),
      picture,
    }).save();
    // send response
    await generateToken(newUser, res);
    res.status(201).send({
      user: {
        ...generateUserInfo(newUser),
        ...userAccount,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
}
export async function login(req, res) {
  try {
    const { username, password } = req.body;
    if (!username || !password)
      return res.status(422).send({ message: "all inputs are required" });
    const checkUser = await User.findOne({
      $or: [{ username }, { email: username }],
    });
    switch (true) {
      case Boolean(!checkUser):
        return res.status(400).send({
          message: "username are incorrect",
        });
      case Boolean(!(await comparePassword(password, checkUser?.password))):
        return res.status(400).send({
          message: "password is inccorect",
        });
    }
    const userInfo = checkUser.isteacher
      ? await getTeacher(checkUser.userId)
      : await getStudient(checkUser.userId);
    await generateToken(checkUser, res);
    res.status(200).send({
      user: {
        ...generateUserInfo(checkUser),
        ...userInfo,
      },
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
}
export async function logout(req, res) {
  addExistingToken("", res);
  await req.logout((err) => {
    if (err) {
      return res.status(400).send(err);
    }
    req.session.destroy((err) => {
      if (err) {
        return res.status(400).send(err);
      }
    });
  });
  res.status(204).send();
}
export async function isLoggin(req, res) {
  try {
    if (req.user) {
      await generateToken(req.user, res);
      res.status(200).send({
        userinfo: req.user,
      });
      return;
    }
    const { token } = req.cookies;
    if (!token) return res.status(204).send();
    const { isCorrect, userId } = await isTokenCorrect(token);
    if (!isCorrect || !userId) return res.status(204).send();
    const userinfo = await User.findById(userId);
    if (!userinfo) return res.status(204).send();
    const userDetails = userinfo.isteacher
      ? await getTeacher(userinfo.userId)
      : await getStudient(userinfo.userId);

    await generateToken(userinfo, res);
    res.status(200).send({
      userinfo: { ...generateUserInfo(userinfo), ...userDetails },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
}
export async function deleteAccount(req, res) {
  const { userId } = req.body;
  try {
    const user = await User.findById(userId);
    if (!(await deleteUserPosts(userId))) {
      res.status(500).send("post delete error");
      return;
    }
    if (!(await deleteUserComment(userId))) {
      res.status(500).send("comments delete error");
      return;
    }
    const countInfoDeleted = user.isteacher
      ? await deleteTeacher(user.userId, userId)
      : await deleteStudient(user.userId);
    if (!countInfoDeleted) {
      res.status(500).send("internal server error");
      return;
    }
    const deletedUser = await User.findByIdAndDelete(userId);
    if (deletedUser) {
      addExistingToken("", res);
      res.status(204).send();
    } else res.status(404).send({ message: "user not found" });
  } catch (error) {
    res.status(500).send({ message: "internal server error" });
  }
}
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
  if (!username && !password && !bio && !currentPassword && !email && !firstName && !lastName)
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
export async function getUserDashboard(req, res) {
  const { userId, isteacher } = req.body;
  if (isteacher) return res.status(400).send({ message: "feature is coming" });
  try {
    const { userId: secondId } = await User.findById(userId); // GET SECOND USER ID
    const informations = await Studient.findById(secondId); // get information of userID
    // * GET FAVORITE COURSE
    const favCourses = [];
    for (let i = 0; i < informations.favorite.length; i++) {
      const fav = informations.favorite[i];
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
export async function updateProfileImage(req,res) {
  try {
    const {userId} = req;
    const imgPath = req.file.path ;
    const user = await User.findById(userId) ; 

    if (!user) return res.status(404).send({message: "user not found"})
    // delete the current path
    const isHasPicture = /^public/.test(user.picture);
    if (user.picture&&isHasPicture) {
      const currentFilePath = path.join(__dirname, '/', user.picture);
      console.log(currentFilePath)
      if (fs.existsSync(currentFilePath)) {
        fs.unlinkSync(currentFilePath);
      }
    }
    // update picture 
    user.picture = imgPath;
    const newUser = await user.save();
    res.status(200).send({userinfo : generateUserInfo(newUser)});
  } catch (error) {
    console.log(error)
    res.status(500).send({message : "internal server error"})
  }
}

// * google auth
export function googleFaild(req, res) {
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
