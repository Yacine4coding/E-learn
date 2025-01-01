import express from "express"
import { verifyToken } from "../middleware/jwt.js";
import { addOffer, addService,getService, getServices } from "../controller/marketPlace.js";
import { desableTeacher } from "../middleware/teacher.js";
const marketPlace = express.Router();

marketPlace.post("/",verifyToken,addService);
marketPlace.post("/addOffer",verifyToken,desableTeacher,addOffer);
marketPlace.get("/:serviceId",getService);
marketPlace.get("/",getServices);


export default marketPlace;