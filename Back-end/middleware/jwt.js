import jwt from "jsonwebtoken";
import { isUserExist } from "../controller/user.js";

// export const TOKEN_OPTION = { httpOnly: true, secure: true };
export const TOKEN_OPTION = { httpOnly: true, maxAge: 7 * 24 * 60 * 60 * 1000 };
export async function generateToken(userInfo, res) {
  const { _id } = userInfo;
  const token = await jwt.sign(
    {
      userId: _id,
    },
    process.env.SECRET_KEY
  );
  res.cookie("token", token, TOKEN_OPTION);
}
export function addExistingToken(token, res) {
  res.cookie("token", token, TOKEN_OPTION);
}
export async function getUserFromToken(req, res, next) {
  try {
    const token = req.cookies.token;
    if (!token) {
      req.body.userId = false;
      next();
      return;
    }
    const { userId, isCorrect } = await isTokenCorrect(token);
    if (!isCorrect) {
      req.body.userId = false;
      next();
      return;
    }
    const { isExist } = await isUserExist(userId);
    if (!isExist) {
      req.body.userId = false;
      next();
      return;
    }
    req.body.userId = userId;
    next();
  } catch (error) {
    console.log(error);
    req.body.userId = false;
    next();
  }
}
export async function isTokenCorrect(token) {
  try {
    const isCorrectToken = jwt.verify(token, process.env.SECRET_KEY);
    const { userId } = isCorrectToken;
    return {
      isCorrect: true,
      userId,
    };
  } catch (error) {
    return { isCorrect: false };
  }
}
export async function verifyToken(req, res, next) {
  const {token} = await req.cookies;

  if (!token) {
    addExistingToken("", res);
    res.status(401).send({ message: "you are not loggin , please login" });
    return;
  }
  const { userId, isCorrect } = await isTokenCorrect(token);
  if (!isCorrect) {
    addExistingToken("", res);
    res.status(401).send({ messgae: "you are not loggin , please login" });
    return;
  }
  try {
    const { isExist, user } = await isUserExist(userId);
    if (!isExist) {
      addExistingToken("", res);
      res.status(401).send({ message: "you are not loggin , please login" });
      return;
    }

    req.body.userId = userId.toString();
    req.userId = userId.toString();
    req.body.user = user;
    req.body.isteacher = user.isteacher;
    req.body.secondId = user.secondId;
    addExistingToken(token, res);
    next();
  } catch (error) {
    console.log("verify token error");
    console.log(error);
    res.status(500).send({ message: "internal server error" });
    return;
  }
}
