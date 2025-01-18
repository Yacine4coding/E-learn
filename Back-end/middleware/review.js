import { isUserExist } from "../controller/user.js";

export async function handleReview(review) {
  if (!review) return null;
  const { message, courseId, studentId, star, _id: id } = review;
  try {
    const { user, isExist } = await isUserExist(review.studentId);
    if (!isExist) return null;
    return {
      message , star , courseId , studentId , id,
      user,
    };
  } catch (error) {
    console.log("error in handle review \n", error);
    return null;
  }
}
