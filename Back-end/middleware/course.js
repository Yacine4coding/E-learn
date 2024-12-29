export function generateCourse(course, user, allData = false) {
  const {
    _id: id,
    title,
    stars,
    view,
    discount,
    description,
    amount,
    chapters,
    payCount,
    chapterNumber,
    buyCount,
    picture,
  } = course;
  const { username, picture: userPicture } = user;
  const result = allData
    ? {
        id,
        title,
        stars,
        view,
        discount,
        description,
        amount,
        chapterNumber,
        chapters,
        payCount,
        username,
        picture: `http://localhost:5000/${picture}`,
        userPicture,
        buyCount,
      }
    : {
        id,
        title,
        stars,
        view,
        discount,
        description,
        amount,
        username,
        picture: `http://localhost:5000/${picture}`,
        userPicture,
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
  try {
    console.log(courses instanceof Array);
    console.log(courses.length === 0);
    if (!(courses instanceof Array)) return false;
    if (courses.length === 0) return false;
    for (let i = courses.length-1; i > 0; i--) {
      for (let j = 0; j < i; j++) {
        if (courses[j].buyCount < courses[j + 1].buyCount) {
          let k = courses[j];
          courses[j] = courses[j + 1];
          courses[j + 1] = k;
        }
      }
    }
  } catch (error) {
    console.log(error);
    return false;
  }
  return courses;
}
