const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const morgan = require("morgan");
const bodyparser = require("body-parser");
const dotenv = require("dotenv");
const postRouter = require("./server/routes/posts");

const app = express();

const connectDB = require("./server/database/connection");

dotenv.config({ path: "config.env" });
const PORT = process.env.PORT || 3000;

app.use(morgan("tiny"));

connectDB();

app.use(bodyparser.urlencoded({ extended: true }));

app.set("view engine", "ejs");

app.use("/css", express.static(path.resolve(__dirname, "assets/css")));
app.use("/js", express.static(path.resolve(__dirname, "assets/js")));
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

app.get("/about", function (req, res) {
  res.sendFile(__dirname + "/views/about.html");
});

app.use("/posts", postRouter);
app.use("/", require("./server/routes/posts"));

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
