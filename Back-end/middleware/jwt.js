import jwt from "jsonwebtoken";
import { isUserExist } from "../controller/user";

// export const TOKEN_OPTION = { httpOnly: true, secure: true };
export const TOKEN_OPTION = { httpOnly: true };
export async function generateToken(userInfo, res) {
  const { isteacher, _id } = userInfo;
  const token = await jwt.sign(
    {
      isteacher,
      userId: _id,
    },
    process.env.SECRET_KEY
  );
  res.cookie("token", token, TOKEN_OPTION);
}
export function addExistingToken(token, res) {
  res.cookie("token", token, TOKEN_OPTION);
}
export async function verifyToken(req, res, next) {
  const token = await req.cookies.token;
  try {
    const isCorrectToken = jwt.verify(token, process.env.SECRET_KEY);
    const { userId, isteacher } = isCorrectToken;
    if (userId) {
      res.status(404).send({ message: "auth : user id not found" });
      return;
    }
    // check user info
    const { isExist, user } = await isUserExist(userId);
    if (!isExist) {
      res.status(500).send({ message: "auth : user not found" });
      return;
    }
    req.body.userId = userId.toString();
    req.body.isteacher = isteacher;
    req.body.user = user;
    addExistingToken(token, res);
    next();
  } catch (error) {
    res.status(500).send("token has problem");
    return;
  }
}
