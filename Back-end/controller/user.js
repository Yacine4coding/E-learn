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
import User from "../models/User.js";
import { deleteUserComment } from "./comment.js";
import { deleteUserPosts } from "./post.js";
import { createNewStudient, deleteStudient, getStudient } from "./studient.js";
import { createNewTeacher, deleteTeacher, getTeacher } from "./teacher.js";

// * normal auth
export async function singup(req, res) {
  let { email, password, isteacher = false, picture = "" } = req.body;
  if (!email || !password) {
    res.status(422).send({ message: "all inputs is required" });
    return;
  }
  // * check email pattern
  if (!/^[a-zA-Z0-9._]+@[a-zA-Z.-]+\.[a-zA-Z]{3}$/.test(email)) {
    res.status(400).send({ message: "email not correct" });
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
      res.status(500).send({ message: "Internal server error" });
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
      user: {
        ...generateUserInfo(checkUser),
        ...userInfo,
      },
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
}
// * routes
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
    const { isCorrect, userId } = await isTokenCorrect(token);
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
      userinfo: { ...generateUserInfo(userinfo), ...userDetails },
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
}
// * delete
export async function deleteAccount(req, res) {
  const { userId } = req.body;
  try {
    const user = await User.findById(userId);
    // todo : set tasks delete
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
    res.status(500).send({ message: error.message });
  }
}
// * updates
export async function updateUserInfo(req, res) {
  const { userId, username, password, currentPassword, bio } = req.body;
  if (!username && !password && !bio && !currentPassword) {
    res.status(204).send();
    return;
  }
  try {
    let isUpdated = false;
    let user = await User.findById(userId);
    if (!user) {
      res.status(404).send({ message: "user not found" });
      return;
    }
    if (bio !== null && user.bio !== bio) {
      user.bio = bio;
      isUpdated = true;
    }
    if (username && username !== user.username) {
      if (await User.findOne({username})) {
        res.status(403).send({ message: "username is already exist" });
        return;
      }
      user.username = username;
      isUpdated = true;
    }
    if ((!password && currentPassword) || (password && !currentPassword)) {
      res.status(404).send({
        message: "password or current password are empty",
      });
      return;
    }
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
    if (!isUpdated) {
      res.status(204).send();
      return;
    }
    user = await user.save();
    res.status(200).send({
      user: generateUserInfo(user),
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
}
// * google auth
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
// * function
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
        isteacher: isUserExist.isteacher,
      },
    };
  } catch (error) {
    return false;
  }
}
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
