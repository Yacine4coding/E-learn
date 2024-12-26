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
    return { data: error.response.data, status: error.response.status };
  }
}

export async function updateUser(userinfo) {
  console.log(userinfo);
  try {
    const { status, data } = await axios.put(
      `${APIURL}/user`,
      userinfo,
      CREDENTIALS
    );
    return { status, data };
  } catch (error) {
    console.log(error);
    if (!error.response) return { status: 10 };
    return { status: error.response.status, data: error.response.data };
  }
}
