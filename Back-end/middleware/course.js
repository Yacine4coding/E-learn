export function generateCourse(course, user, allData = false) {
  const {
    _id: id,
    title,
    description,
    amount,
    chapters,
    payCount,
    chapterNumber,
  } = course;
  const { username, isHasPicture, picture } = user;
  const result = allData
    ? {
        id,
        title,
        description,
        amount,
        chapterNumber,
        chapters,
        payCount,
        username,
        isHasPicture,
        picture,
      }
    : {
        id,
        title,
        description,
        amount,
        username,
        isHasPicture,
        picture,
      };
  return result;
}
export function testChpater(chapter) {
  const { title, link, queezes } = chapter;
  let result = {
    isTrue: true,
  };
  if (!(title && link)) {
    return {
      isTrue: false,
      message: "one of chapter information are empty (title or link)",
    };
  }
  queezes.forEach(({ number, question, choices, correctAlph }) => {
    if (!(number && question && choices && correctAlph !== undefined)) {
      console.log("b");
      result = {
        isTrue: false,
        message: "one of quezzes information are inccorect",
      };
      return;
    }
    if (
      !(
        number > 0 &&
        question &&
        choices.length !== 0 &&
        choices.some((ele) => correctAlph === ele.alph)
      )
    ) {
      console.log("c");
      result = {
        isTrue: false,
        message: "one of quezzes information are inccorect",
      };
    }
  });
  return result;
}
