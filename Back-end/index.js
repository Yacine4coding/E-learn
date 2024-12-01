import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
// * google api
// * swagger expres document
import apiDoc from "./middleware/swagger.js";
// modules path
import connectDb from "./middleware/database.js";
import user from "./routes/User.js";
import post from "./routes/Post.js";
import comment from "./routes/Comment.js";
import studient from "./routes/studient.js";
import courses from "./routes/Courses.js";
import teacher from "./routes/teacher.js";
import google from "./routes/google.js";
const app = express();
// * config
dotenv.config();
connectDb();
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// routers
app.use("/google",google)
app.use("/user", user);
app.use("/post", post);
app.use("/comment", comment);
app.use("/studient", studient);
app.use("/course",courses);
app.use("/teacher",teacher);
app.use("/api-doc",apiDoc)
app.use((req,res)=>{
  res.status(505).send("rout not found")
})
app.listen(process.env.PORT || 3001, () => {
  console.log(`http://localhost:${process.env.PORT || 3001}`);
});
