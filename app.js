const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const todoRouter = require("./routes/todoRoutes");
const authRouter = require("./routes/authRoutes");
const categoryRouter = require("./routes/categoryRoutes");

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal server error!" });
});

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/todos", todoRouter);
app.use("/api/v1/categories", categoryRouter);

module.exports = app;
