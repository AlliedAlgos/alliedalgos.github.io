import { initializeApp } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/12.6.0/firebase-auth.js";

import { firebaseConfig } from "./firebaseConfig.js";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// OPTIONAL but recommended
provider.setCustomParameters({
  prompt: "select_account"
});

const allowedEmails = [
  "youremail@gmail.com"
];

window.googleLogin = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    const email = result.user.email;

    console.log("Logged in as:", email);

    if (!allowedEmails.includes(email)) {
      await signOut(auth);
      alert("Access denied");
      return;
    }

    window.location.href = "/admin.html";
  } catch (err) {
    console.error("Login error:", err);
    alert(err.message);
  }
};

onAuthStateChanged(auth, user => {
  if (user && allowedEmails.includes(user.email)) {
    window.location.href = "/admin.html";
  }
});
