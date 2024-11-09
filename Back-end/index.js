import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
// modules path
import connectDb from "./middleware/database.js";
import user from "./routes/User.js";
import post from "./routes/Post.js";
import comment from "./routes/Comment.js";
import studient from "./routes/Student.js";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import session from "express-session";
import cookieSession from "cookie-session";
dotenv.config();
const app = express();
connectDb();
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(
  session({ secret: "sddfqs", resave: false, saveUninitialized: true })
);
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
// * google config
app.use(passport.initialize());
app.use(passport.session());
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: "/user/google/callback",
      scope: ["profile", "email"],
    },
    function (accessToken, refreshToken, profile, callback) {
      console.log(profile);
      callback(null, profile);
    }
  )
);
passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));
// * google config end

// routes
app.use("/user", user);
app.use("/post", post);
app.use("/comment", comment);
app.use("/studient", studient);

app.get("/user/google", passport.authenticate("google", ["profile", "email"]));
app.get(
  "/user/google/callback",
  passport.authenticate("google", {
    successRedirect: process.env.CLIENT_URL,
    failureRedirect: "/user/login/failed",
  })
);
// listen port
app.listen(process.env.PORT || 3001, () => {
  console.log(`http://localhost:${process.env.PORT || 3001}`);
});
