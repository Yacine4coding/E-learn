import express from "express";
import dotenv from "dotenv";
import session from "express-session";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDb from "./middleware/database.js";
import path from "path";
import {
  comment,
  courses,
  google,
  marketPlace,
  post,
  studient,
  teacher,
  user,
} from "./routes/routes.js";
import passport from "passport";
import { fileURLToPath } from "url";
import payment from "./routes/payment.js";
const app = express();
// * config
app.use(
  session({
    secret: "sddfqs",
    resave: false,
    saveUninitialized: true,
    cookie: { httpOnly: true, secure: false },
  })
);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


app.use('/public', express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());
app.use(passport.session());


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
app.use("/marketPlace",marketPlace);
app.use("/payment",payment)
app.use((req, res) => {
  res.status(505).send("rout not found");
});
app.listen(process.env.PORT || 3001, () => {
  console.log(`http://localhost:${process.env.PORT || 3001}`);
});
