import axios from "axios";
import { APIURL, CREDENTIALS } from "./reqParams";

export async function bestCourses(count = 0) {
  if (count === 0)
    return {
      status: 10,
    };
  try {
    const { status, data } = await axios.get(
      `${APIURL}/course/bestCourses/:${5}`,
      CREDENTIALS
    );
    return { status, data };
  } catch (error) {
    console.log(error);
    if (error.response) return { status: 10 };
    return {
      status: error.response.status,
      data: error.response.data,
    };
  }
}
