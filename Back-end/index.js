import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import apiDoc from "./middleware/swagger.js";
import connectDb from "./middleware/database.js";
import {
  comment,
  courses,
  google,
  post,
  studient,
  teacher,
  user,
} from "./routes/routes.js";
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
app.use("/google", google);
app.use("/user", user);


app.use("/post", post);
app.use("/comment", comment);
app.use("/studient", studient);
app.use("/course", courses);
app.use("/teacher", teacher);
app.use("/api-doc", apiDoc);
app.use((req, res) => {
  res.status(505).send("rout not found");
});
app.listen(process.env.PORT || 3001, () => {
  console.log(`http://localhost:${process.env.PORT || 3001}`);
});
