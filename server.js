// Dependencies
import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import fs from "fs";
import { auth } from "express-openid-connect";
import escape from "escape-html";

// Middleware
dotenv.config();
const Port = process.env.Port;
const app = express();
app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:4321",
  }),
);

// Authorization
app.use(
  auth({
    authRequired: false, // set to true to require authentication for all routes
    auth0Logout: true,
    secret: process.env.SECRET,
    baseURL: process.env.BASE_URL,
    clientID: process.env.CLIENT_ID,
    issuerBaseURL: process.env.ISSUER_BASE_URL,
  }),
);

app.get("/signup", (req, res) =>
  res.oidc.login({
    returnTo: "/",
    authorizationParams: { screen_hint: "signup" },
  }),
);

app.get("/", (req, res) => {
  if (!req.oidc.isAuthenticated()) {
    return res.type("html").send(`
      <a href="/signup">Signup</a><br>
      <a href="/login">Log in</a>
    `);
  }

  res.type("html").send(`
    <p>Logged in as ${escape(req.oidc.user.name)}</p>
    <h1>User Profile</h1>
    <pre>${escape(JSON.stringify(req.oidc.user, null, 2))}</pre>
    <a href="/logout">Log out</a>
  `);
});

// File Locations
const transFilePath = "./src/data/transactions.json";
const siteFilePath = "./src/data/site.json";

app.get("api/site", (req, res) => {
  try {
    const fileData = fs.readFileSync(siteFilePath, "utf-8");
    const json = JSON.parse(fileData);
    res.json(json);
  } catch (err) {
    console.error(`Server error...`, err);
    res.status(500).json({ error: err.message });
  }
});

app.get("/api/transactions", (req, res) => {
  try {
    const fileData = fs.readFileSync(transFilePath, "utf-8");
    const json = JSON.parse(fileData);
    res.json(json);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/transactions", (req, res) => {
  const rawEntry = req.body;
  try {
    const fileData = fs.readFileSync(transFilePath, "utf-8");
    const json = JSON.parse(fileData);

    const newId =
      json.length > 0
        ? Math.max(...json.map((item) => Number(item.transId) || 0)) + 1
        : 2600;

    const newEntry = {
      transId: newId,
      ...rawEntry,
    };

    json.push(newEntry);

    fs.writeFileSync(transFilePath, JSON.stringify(json, null, 2));

    res.json({
      message: "Successfully created new record!",
      data: newEntry,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

app.listen(Port, () => {
  console.log(`Port portin' per port ${Port}`);
});
