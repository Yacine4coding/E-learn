import {
  addExistingToken,
  generateToken,
  isTokenCorrect,
} from "../middleware/jwt.js";
import { generateStudientInfo } from "../middleware/studient.js";
import { generateTeacherInfo } from "../middleware/teacher.js";
import {
  comparePassword,
  hashingPassword,
  generateUserInfo,
} from "../middleware/user.js";
import Teacher from "../models/Teacher.js";
import User from "../models/User.js";
import { createNewStudient, getStudient } from "./studient.js";
import { createNewTeacher, getTeacher } from "./teacher.js";

// * normal auth
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
    let userAccount = isteacher
      ? await createNewTeacher()
      : await createNewStudient();
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
      userId: userAccount.userId.toString(),
      email,
      username,
      password: passwordHash,
    }).save();
    // send response
    await generateToken(newUser, res);
    res.status(201).send({
      user: {
        ...generateUserInfo(newUser),
        userAccount,
      },
    });
  } catch (error) {
    console.log(error);
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
    const userInfo = checkUser.isteacher
      ? await getTeacher(checkUser.userId)
      : await getStudient(checkUser.userId);
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
// * google auth
export async function googleSingup(user, isteacher = false) {
  if (!user) return false;
  try {
    const { sub: emailId } = user;
    const isExist = await User.findOne({ emailId });
    let userinfo = null;
    if (!isExist) {
      userinfo = isteacher
        ? await createNewTeacher()
        : await createNewStudient();
      user = await new User({
        email: user.email,
        emailId,
        password: "",
        isHasPicture: true,
        picture: user.picture,
        userId: userinfo.userId,
        isteacher,
        username: user.email.split("@")[0],
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
// * routes
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
export async function isLoggin(req, res) {
  try {
    if (req.user) {
      await generateToken(req.user, res);
      res.status(200).send({
        user: req.user,
      });
      return;
    }
    const { token } = req.cookies;
    if (!token) {
      res.status(204).send();
      return;
    }
    const { isCorrect, userId, isteacher } = isTokenCorrect(token);
    if (!isCorrect || !userId) {
      res.status(204).send();
      return;
    }
    const userinfo = await User.findById(userId);
    if (!userinfo) {
      res.status(404).send({
        message: "user not found ",
      });
      return;
    }
    const userDetails = userinfo.isteacher
      ? await getTeacher(userinfo.userId)
      : await getStudient(userinfo.userId);
    await generateToken(userinfo, res);
    res.status(200).send({
      userinfo: { ...generateUserInfo, ...userDetails },
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
}
// *
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
export function googleFaild(req, res) {
  res.status(401).send({
    message: "auth faild",
  });
}
export async function googleLogOut(req, res) {
  req.logout();
  addExistingToken("", res);
  res.redirect(process.env.CLIENT_URL);
}
