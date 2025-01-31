import {
  addExistingToken,
  generateToken,
  isTokenCorrect,
} from "../middleware/jwt.js";
import {
  comparePassword,
  hashingPassword,
  generateUserInfo,
  generateUserName,
} from "../middleware/user.js";
import User from "../models/User.js";
import { createNewStudient, getStudient } from "./studient.js";
import { createNewTeacher, getTeacher } from "./teacher.js";

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
