import axios from "axios";

const APIURL = "http://localhost:5000";
const CREDENTIALS = {
  withCredentials: true,
};
export function googleAuth() {
  console.log("open");
  window.open(`${APIURL}/google/callback`, "_self");
}
export async function signup(email, password) {
  try {
    if (!email || !password) {
      console.log("error");
    }
    const { data, status } = await axios.post(
      `${APIURL}/user/signup`,
      {
        email,
        password,
      },
      CREDENTIALS
    );
    return { data, status };
  } catch (error) {
    const { data, status } = error.response;
    return { data, status };
  }
}
export async function login(username, password) {
  try {
    if (!username || !password) {
      console.log("error");
    }
    const { data, status } = await axios.post(
      `${APIURL}/user/login`,
      {
        username,
        password,
      },
      CREDENTIALS
    );
    return { data, status };
  } catch (error) {
    const { data, status } = error.response;
    return { data, status };
  }
}
export async function isLoggin() {
  try {
    const res = await axios.get(`${APIURL}/user/isLoggin`, CREDENTIALS);
    const { data, status } = res;
    return { data, status };
  } catch (error) {
    const { data, status } = error.response;
    return { data, status };
  }
}
export async function logOut() {
  try {
    const res = await axios.get(`${APIURL}/user/logout`, CREDENTIALS);
    const { data, status } = res;
    return { data, status };
  } catch (error) {
    const { data, status } = error.response;
    return { data, status };
  }
}