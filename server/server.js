require("dotenv").config();

const express = require("express");
const app = express();

const cors = require("cors");
app.use(cors());
app.options("*", cors());

const mongoose = require("mongoose");

const passport = require("passport");
const passportSetup = require("./passport");
app.use(passport.initialize());
app.use(passport.session());

var cookieSession = require("cookie-session");
app.use(
  cookieSession({
    name: "session",
    keys: [process.env.COOKIE_SECRET],
    maxAge: 24 * 60 * 60 * 1000,
  })
);

app.use(express.json());

const authRouter = require("./routes/auth");

app.use("/auth", authRouter);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("connected to db & listening on port", process.env.PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });
