import { isUserExist } from "../controller/user.js";
import Offer from "../models/Offers.js";
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
    createdAt,
  } = service;
  try {
    const { isExist, user } = await isUserExist(userId);
    const offers = await getOffers(_id);
    console.log(isExist)
    if (!isExist) return null;
    return {
      userId,
      createdAt: formatDate(createdAt),
      username: user.username,
      userPicture: user.picture,
      level,
      budget,
      title,
      offers,
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
async function getOffers(serviceId) {
  try {
    let offs = await Offer.find({ serviceId });
    const offers = []; 
    for (let { message, _id:id,userId, serviceId, progressing, createdAt } of offs) {
      const {user} = await isUserExist(userId)
      offers.push({
        message,
        id,
        userId,
        user,
        serviceId,
        progressing,
        createdAt: formatDate(createdAt),
      });
  
    }
    
    return offers
  } catch (error) {
    console.log(error);
    return false;
  }
}
