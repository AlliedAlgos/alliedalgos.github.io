import { initializeApp } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/12.6.0/firebase-auth.js";

const app = initializeApp(firebaseConfig);

export const firebaseConfig = {
  apiKey: "AIzaSyBESpx6a7YT1qoaNZ4P-9j7X0SjAhdkePg",
  authDomain: "alliedalgo.firebaseapp.com",
  databaseURL: "https://alliedalgo-default-rtdb.firebaseio.com",
  projectId: "alliedalgo",
  storageBucket: "alliedalgo.firebasestorage.app",
  messagingSenderId: "333625041078",
  appId: "1:333625041078:web:b4d7d3cfc5d3053b238617"
};

const auth = getAuth();
const provider = new GoogleAuthProvider();

/* ✅ ALLOWED USERS */
const allowedEmails = [
  "agsid502@gmail.com",
  "admin@yourdomain.com"
];
// OR domain-based:
// const allowedDomain = "yourdomain.com";

window.googleLogin = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    const email = result.user.email;

    if (!allowedEmails.includes(email)) {
      await signOut(auth);
      error.textContent = "Access denied.";
      error.classList.remove("hidden");
      return;
    }

    window.location.href = "/admin.html";
  } catch (e) {
    error.textContent = e.message;
    error.classList.remove("hidden");
  }
};

/* 🔁 AUTO REDIRECT */
onAuthStateChanged(auth, user => {
  if (user && allowedEmails.includes(user.email)) {
    window.location.href = "/admin.html";
  }
});
