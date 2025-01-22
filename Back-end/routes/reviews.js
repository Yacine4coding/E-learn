import express from "express" ; 
import { addReview, deleteReview, getMyReview, getReview, updateReview , getMyCourseReview} from "../controller/review.js";
import {verifyToken} from "../middleware/jwt.js"

const review = express.Router(); 

review.post("/",verifyToken , addReview);
review.get("/mine",verifyToken,getMyReview);
review.get("/mine/:courseId",verifyToken,getMyCourseReview);
review.get("/:courseId",getReview);
review.put("/",verifyToken,updateReview);
review.delete("/reviewId",verifyToken , deleteReview)




export default review ; 