import jwt from "jsonwebtoken";

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
    req.body.userId = userId.toString();
    req.body.isteacher = isteacher;
    addExistingToken(token, res);
    next();
  } catch (error) {
    res.status(500).send("token has problem");
    return;
  }
}
