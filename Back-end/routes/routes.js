import express from "express";
import auth from "./auth.js";

import user from "./User.js";
import courses from "./Courses.js";
import studient from "./studient.js";
import teacher from "./teacher.js";
import google from "./google.js";
import marketPlace from "./marketPlace.js";

export { user, marketPlace, courses, google, studient, teacher };

const router = express.Router();

router.use("/auth",auth);

router.get("/", (req, res) => {
  res.send("Welcome to the API");
});

export default router;
