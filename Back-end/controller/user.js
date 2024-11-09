import {
  addExistingToken,
  generateToken,
  isTokenCorrect,
} from "../middleware/jwt.js";
import {
  comparePassword,
  hashingPassword,
  generateUserInfo,
} from "../middleware/user.js";
import Studient from "../models/Student.js";
import Teacher from "../models/Teacher.js";
import User from "../models/User.js";
import { createNewStudient, getStudient } from "./studient.js";
import { createNewTeacher, getTeacher } from "./teacher.js";

export async function singup(req, res) {
  let { email, password, isteacher = false } = req.body;
  if (!email || !password) {
    res.status(422).send({ message: "all inputs is required" });
    return;
  }
  isteacher = Boolean(isteacher);
  try {
    // check if email is already exist
    if (await User.findOne({ email })) {
      res.status(409).send({ message: "email is already exist" });
      return;
    }
    // create user account in (teacher/student)
    let userAccount;
    if (isteacher) userAccount = await createNewTeacher();
    else userAccount = await createNewStudient();
    if (!userAccount) {
      res.status(500).send({ message: "connot create user info" });
      return;
    }
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
    res.status(201).send({
      message: "signup succesfuly",
      userInfo: {
        ...generateUserInfo(newUser),
        userAccount,
      },
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
}
export async function login(req, res) {
  const { username, password } = req.body;
  if (!username || !password) {
    res.status(422).send({ message: "all inputs are required" });
    return;
  }
  try {
    const checkUser = await User.findOne({ username });
    // ! don't find user or password isn't match
    if (!checkUser || !comparePassword(password, checkUser?.password)) {
      res.status(400).send({
        message: "username or password is inccorect",
      });
      return;
    }
    // * check user info in (teacher/studient)
    let userInfo;
    if (checkUser.isteacher) userInfo = await getTeacher(checkUser.userId);
    else userInfo = await getStudient(checkUser.userId);
    // * generate res and cookies(token)
    await generateToken(checkUser, res);
    res.status(200).send({
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
  res.status(204).send();
}
export async function isLoggin(req, res) {
  const token = req.cookies.token;
  if (!token) {
    res.status(204).send();
    return;
  }
  const { isCorrect, userId } = await isTokenCorrect(token);
  if (!isCorrect || !userId) {
    res.status(204);
    return;
  }
  try {
    const user = await User.findById(userId);
    if (!user) {
      res.status(204);
      return;
    }
    const userInfo = user.isteacher
      ? generateTeacherInfo(await Teacher.findById(user.userId))
      : generateStudientInfo(await Studient.findById(user.userId));
    if (!userInfo) {
      res
        .status(500)
        .send({ message: "user info don't found , please relogin" });
    }
    res.status(200).send({
      userInfo: {
        ...generateUserInfo(user),
        ...userInfo,
      },
    });
    return;
  } catch (error) {
    req.status(500).send({ message: error.massagse });
  }
}
export async function deleteAccount(req, res) {
  const { userId } = req.body;
  try {
    const deletedUser = await User.findByIdAndDelete(userId);
    if (deletedUser) res.status(204).send();
    else res.status(404).send({ message: "user not found" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
}
export async function googleAuth(req, res) {
  console.log(req.user);
  console.log("is wordk");
  if (req.user) {
    res.status(200).send({
      error: false,
      message: "Successfully Loged In",
      user: req.user,
    });
  } else {
    res.status(403).json({ error: true, message: "Not Authorized" });
  }
}
export function googleFaild(req, res) {
  res.status(401).json({
    error: true,
    message: "Log in failure",
  });
}
export function googleLogOut(req, res) {
  req.logout();
  res.redirect(process.env.CLIENT_URL);
}
dd
