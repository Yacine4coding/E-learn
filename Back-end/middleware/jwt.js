import jwt from "jsonwebtoken";

export const TOKEN_OPTION = {
  httpOnly: true,
  secure: true,
};

export async function generateToken(userInfo) {
  const { isTeacher, _id } = userInfo;
  const token = await jwt.sign(
    {
      isTeacher,
      userId: _id,
    },
    process.env.SECRET_KEY
  );
  return token;
}
