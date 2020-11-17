import express, { response } from "express";
import bcrypt from 'bcrypt-nodejs';
import cors from "cors";
import knex from 'knex';

import register from "./controllers/register.jsx";
import signin from "./controllers/signin.jsx";
import profile from "./controllers/profile.jsx";

const db = knex({
  client: "pg",
  connection: {
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false,
    },
  },
});

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("it is working fine");
});
app.post("/signin", signin.handleSignin(db, bcrypt));
app.post("/register", (req, res) => {
  register.handleRegister(req, res, db, bcrypt);
});
app.get("/profile/:id", (req, res) => {
  profile.handleProfileGet(req, res, db);
});

app.listen(process.env.PORT || 3000, () => {
  console.log("app is running on port ${process.env.PORT}");
});
