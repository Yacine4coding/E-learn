import axios from "axios";
import { APIURL, CREDENTIALS } from "./reqParams";

export async function getDashboard() {
  try {
    const { data, status } = await axios.get(
      `${APIURL}/user/dashboard`,
      CREDENTIALS
    );
    return { data: data.courses, status };
  } catch (error) {
    if (!error.response) return { status: 10 };
    return { data: error.response.data, status : error.response.status };
  }
}
