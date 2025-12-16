const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public/admin.html"));
});

app.listen(3000, () => {
  console.log("Admin backend running → http://localhost:3000");
});
