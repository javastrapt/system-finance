import dotenv from "dotenv";
import express from "express";
import { auth } from "express-openid-connect";
import escape from "html-escape";

const app = express();

app.use(
  auth({
    authRequired: false, // set to true to require authentication for all routes
    auth0Logout: true,
    secret: process.env.SECRET,
    baseURL: process.env.BASE_URL,
  }),
);

app.get("/signup", (req, res) =>
  res.oidc.login({
    returnTo: "/",
    authorizationParams: { screen_hint: "signup" },
  }),
);
