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
  const token = await req.cookies.token;
  if (!token) {
    addExistingToken("", res);
    res.status(401).send({ message: "unAuth" });
    return;
  }
  const { userId, isCorrect } = await isTokenCorrect(token);
  if (!isCorrect) {
    addExistingToken("", res);
    res.status(401).send({ messgae: "unAuth" });
    return;
  }
  try {
    const { isExist, user } = await isUserExist(userId);
    if (!isExist) {
      addExistingToken("", res);
      res.status(401).send({ message: "unAuth" });
      return;
    }
    req.body.userId = userId.toString();
    req.body.user = user;
    req.body.isteacher = user.isteacher;
    addExistingToken(token, res);
    next();
  } catch (error) {
    res.status(401).send("unAuth");
    return;
  }
}
