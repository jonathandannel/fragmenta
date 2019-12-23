const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const appRouter = require("./routes/index");
const authRouter = require("./routes/api/auth");
const verifyRouter = require("./routes/api/verify");
const imageRouter = require("./routes/api/image");

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", appRouter);
app.use("/api/auth", authRouter);
app.use("/api/verify", verifyRouter);
app.use("/api/image", imageRouter);

module.exports = app;
