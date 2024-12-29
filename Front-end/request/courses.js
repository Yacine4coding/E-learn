import axios from "axios";
import { APIURL, CREDENTIALS } from "./reqParams";

export async function bestCourses(count = 5) {
  console.log(count);
  if (count === 0)
    return {
      status: 10,
    };
  try {
    const { status, data } = await axios.get(
      `${APIURL}/course/bestCourses/${count}`,
      CREDENTIALS
    );
    return { status, data };
  } catch (error) {
    if (!error.response) return { status: 10 };
    return {
      status: error.response.status,
      data: error.response.data,
    };
  }
}
export async function setFavoriteCourse(courseId) {
  if (!courseId) return { status: 10, data: "can not be null" };
  try {
    const { data, status } = await axios.put(
      `${APIURL}/course/favorite/${courseId}`,
      {},
      CREDENTIALS
    );
    return { status, data };
  } catch (error) {
    console.log("error in request of favorite course");
    console.log(error);
    if (!error.response) return { status: 10 };
    return {
      status: error.response.status,
      data: error.response.data,
    };
  }
}
export async function getCourse(courseId) {
  try {
    console.log(`${APIURL}/course/${courseId}`);
    const { data, status } = await axios.get(
      `${APIURL}/course/${courseId}`,
      CREDENTIALS
    );
    return { status, data };
  } catch (error) {
    console.log(error);
    if (!error.response) return { status: 10 };
    return {
      status: error.response.status,
      data: error.response.data,
    };
  }
}
