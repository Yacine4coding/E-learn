export function generateCourse(course, user) {
  const { _id, title, description, amount, chapters, payCount, chapterNumber } =
    course;
  const { username, isHasPicture, picture } = user;
  console.log(course);
  return {
    courseId: _id.toString(),
    title,
    description,
    amount,
    chapterNumber,
    chapters,
    payCount,
    username,
    isHasPicture,
    picture,
  };
}
