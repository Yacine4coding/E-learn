import axios from "axios";
import { APIURL, CREDENTIALS } from "./reqParams";
import { getRandomAvatar } from "@/public/avatars/avatar";
export function googleAuth() {
  console.log("open");
  window.open(`${APIURL}/google/callback`, "_self");
}
export async function signup(email, password) {
  try {
    const avatar = getRandomAvatar();
    if (!email || !password) {
      console.log("error");
    }
    const { data, status } = await axios.post(
      `${APIURL}/user/signup`,
      {
        email,
        password,
        picture: avatar,
      },
      CREDENTIALS
    );
    return { data, status };
  } catch (error) {
    console.log(error);
    if (!error.response) return { status: 10 };
    const { data, status } = error.response;
    return { data, status };
  }
}
export async function login(username, password) {
  try {
    if (!username || !password) {
      console.log("error");
      return { status: 10 };
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
    console.log(error);
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
    console.log("error");
    console.log(error);
    if (!error.response) return { status: 10 };
    const { data, status } = error.response;
    return { data, status };
  }
}
export async function logOut() {
  try {
    await axios.get(`${APIURL}/user/logout`, CREDENTIALS);
  } catch (error) {
    console.log(error);
  }
}
