import { addExistingToken, generateToken } from "../middleware/jwt.js";
import {
  comparePassword,
  hashingPassword,
  generateUserInfo,
  generateStudientInfo,
  generateTeacherInfo,
} from "../middleware/user.js";
import Studient from "../models/Student.js";
import Teacher from "../models/Teacher.js";
import User from "../models/User.js";
export async function singup(req, res) {
  let { email, password, isteacher = false } = req.body;
  if (!email || !password) {
    res.status(404).send("all inputs is required");
    return;
  }
  isteacher = Boolean(isteacher);
  try {
    // check if email is already exist
    if (await User.findOne({ email })) {
      res.status(500).send({ message: "email is already exist" });
      return;
    }
    // create user account in (teacher/student)
    let userAccount;
    if (isteacher) userAccount = await new Teacher().save();
    else userAccount = await new Studient().save();
    // generate username
    let username = email.split("@")[0];
    // check if userename is already exist
    let isUserExist = false;
    do {
      isUserExist = await User.findOne({ username });
      if (isUserExist) {
        // generate new username
        username = `${username}${parseInt(Math.random() * 100)}`;
      }
    } while (isUserExist);
    // hashing password
    const passwordHash = await hashingPassword(password);
    const newUser = await new User({
      isteacher,
      userId: userAccount._id.toString(),
      email,
      username,
      password: passwordHash,
    }).save();
    // send response
    await generateToken(newUser, res);
    res.status(200).send({
      message: "signup succesfuly",
      userInfo: {
        ...generateUserInfo(newUser),
        ...generateStudientInfo(userAccount),
      },
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
}
export async function login(req, res) {
  const { username, password } = req.body;
  if (!username || !password) {
    res.status(404).send({ message: "all inputs are required" });
    return;
  }
  try {
    const checkUser = await User.findOne({ username });
    // ! don't find user or password isn't match
    if (!checkUser || !comparePassword(password, checkUser?.password)) {
      res.status(403).send({
        message: "username or password is inccorect",
      });
      return;
    }
    // * check user info in (teacher/studient)
    let userInfo;
    if (checkUser.isteacher)
      userInfo = generateTeacherInfo(await Teacher.findById(checkUser.userId));
    else
      userInfo = generateStudientInfo(
        await Studient.findById(checkUser.userId)
      );
    // * generate res and cookies(token)
    await generateToken(checkUser, res);
    res.status(200).send({
      message: "login succesfuly",
      userInfo: {
        ...generateUserInfo(checkUser),
        ...userInfo,
      },
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
}
export async function isUserExist(userId) {
  try {
    const isUserExist = await User.findById(userId);
    if (!isUserExist) return { isExist: false };
    return {
      isExist: true,
      user: {
        username: isUserExist.username,
        picture: isUserExist.picture,
        isHasPicture: isUserExist.isHasPicture,
      },
    };
  } catch (error) {
    return false;
  }
}
export async function logOut(undefined, res) {
  addExistingToken("", res);
  res.status(200).send({ message: "log out succesfuly" });
}
