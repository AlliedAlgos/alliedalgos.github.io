const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files
app.use(express.static(path.join(__dirname, "public")));

// Example API route
app.get("/api/data", (req, res) => {
  res.json({ message: "Hello from Firebase backend!" });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
