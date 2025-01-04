import express from "express";
import { verifyToken } from "../middleware/jwt.js";
import {
  addOffer,
  addService,
  getOffers,
  getPersonalServices,
  getService,
  getServices,
} from "../controller/marketPlace.js";
import { desableTeacher } from "../middleware/teacher.js";
const marketPlace = express.Router();

marketPlace.post("/", verifyToken, addService);
marketPlace.post("/addOffer", verifyToken, desableTeacher, addOffer);
marketPlace.get("/", getServices);
marketPlace.get("/mine", verifyToken, getPersonalServices);
marketPlace.get("/offers", verifyToken, getOffers);
marketPlace.get("/:serviceId", getService);

export default marketPlace;
