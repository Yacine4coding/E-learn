export function generateCourse(course, user, allData = false) {
  const {
    _id: id,
    title,
    description,
    amount,
    chapters,
    payCount,
    chapterNumber,
    buyCount,
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
        buyCount,
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
export function sortCourse(courses) {
  switch (true) {
    case !(courses instanceof Array):
      return false;
    case courses.length === 0:
      return false;
  }
  for (let i = courses.length; i > 1; i--) {
    for (let j = 0; j < i; j++) {
      if (courses[j].buyCount < courses[j + 1].buyCount) {
        let k = courses[j];
        courses[j] = courses[j + 1];
        courses[j + 1] = k;
      }
    }
  }
  return courses;
}
