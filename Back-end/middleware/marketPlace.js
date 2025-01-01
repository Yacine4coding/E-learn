import { isUserExist } from "../controller/user.js";
import { formatDate } from "./time.js";

export async function formatService(service) {
  const {
    level,
    budget,
    userId,
    title,
    description,
    _id,
    location,
    tags,
    offers,
    createdAt
  } = service;
  try {
    const { isExist, user } = await isUserExist(userId);
    if (!isExist) return null;
    return {
      userId,
      createdAt : formatDate(createdAt),
      offers,
      username: user.username,
      userPicture: user.picture,
      level,
      budget,
      title,
      location,
      id: _id,
      location,
      tags,
      description,
    };
  } catch (error) {
    return null;
  }
}
