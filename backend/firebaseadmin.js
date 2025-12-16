const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://alliedalgo-default-rtdb.firebaseio.com"
});

const db = admin.database(); // Realtime Database
console.log("Backend connected to Firebase ✅");

module.exports = db;
