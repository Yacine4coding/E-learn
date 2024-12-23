import express from "express";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { googleSingup } from "../controller/user.js";
import dotenv from "dotenv";
dotenv.config();
const google = express.Router();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: "/google/callback",
      scope: ["profile", "email"],
    },
    async function (accessToken, refreshToken, profile, callback) {
      const res = await googleSingup(profile._json);
      callback(null, res);
    }
  )
);
passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser(async (user, done) => {
  done(null, user);
});
google.get("/", passport.authenticate("google", ["profile", "email"]));
google.get(
  "/callback",
  passport.authenticate("google", {
    successRedirect: process.env.CLIENT_URL,
    failureRedirect: "/google/failed",
  })
);

export default google;
