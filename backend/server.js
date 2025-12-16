const express = require("express");
const admin = require("firebase-admin");
const path = require("path");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// Initialize Firebase Admin
const serviceAccount = require("./serviceAccountKey.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://alliedalgo-default-rtdb.firebaseio.com"
});

// Middleware to verify Firebase ID token
async function authenticate(req, res, next) {
  const idToken = req.headers.authorization?.split("Bearer ")[1];
  if (!idToken) return res.status(401).send("Unauthorized: No token");

  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    req.user = decodedToken; // contains user info
    next();
  } catch (err) {
    console.error(err);
    res.status(401).send("Unauthorized: Invalid token");
  }
}

// -------------------
// API routes (protected)
app.post("/team/:teamId", authenticate, async (req, res) => {
  const teamId = req.params.teamId;
  const data = req.body;
  try {
    await admin.database().ref(`team/${teamId}`).set(data);
    res.send({ message: `Team '${teamId}' created/updated ✅` });
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: "Error creating team space" });
  }
});

app.patch("/team/:teamId", authenticate, async (req, res) => {
  const teamId = req.params.teamId;
  const updates = req.body;
  try {
    await admin.database().ref(`team/${teamId}`).update(updates);
    res.send({ message: `Team '${teamId}' updated ✅` });
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: "Error updating team space" });
  }
});

app.get("/team/:teamId", authenticate, async (req, res) => {
  const teamId = req.params.teamId;
  try {
    const snapshot = await admin.database().ref(`team/${teamId}`).once("value");
    res.json(snapshot.val());
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: "Error reading team space" });
  }
});

app.get("/teams", authenticate, async (req, res) => {
  try {
    const snapshot = await admin.database().ref("team").once("value");
    res.json(snapshot.val());
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: "Error reading all teams" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Backend running on http://localhost:${PORT}`));
console.log("Backend connected to Firebase ✅");