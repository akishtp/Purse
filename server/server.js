require("dotenv").config();

const express = require("express");
const app = express();

const cors = require("cors");
app.use(cors());
app.options("*", cors());

app.use(express.json());

const mongoose = require("mongoose");
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
