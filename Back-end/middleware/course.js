export function generateCourse(course, user, allData = false) {
  let {
    _id: id,
    title,
    stars,
    view,
    discount,
    description,
    chapters,
    chapterNumber,
    teacherId,
    picture,
    visible,
    level,
    category,
    price,
    introduction,
  } = course;
  introduction.link = `http://localhost:5000/${introduction.link}`;
  chapters = chapters.map((chapter) => {
    chapter.link = `http://localhost:5000/${chapter.link}`;
    return chapter;
  });
  const { username, picture: userPicture } = user;
  const result = {
    id,
    title,
    visible,
    stars,
    chapterNumber,
    view,
    discount,
    teacherId,
    description,
    price,
    chapters,
    username,
    picture: `http://localhost:5000/${picture}`,
    userPicture,
    introduction,
    level,
    category,
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
    for (let i = courses.length - 1; i > 0; i--) {
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
