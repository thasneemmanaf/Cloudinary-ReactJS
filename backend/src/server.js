const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json({ limit: "50mb" }));
app.use(cors());

const images = require("./controllers/images");

app.get("/", (req, res) => {
  res.json({
    message: "it works",
  });
});

app.use("/api/upload", images);
module.exports = app;
