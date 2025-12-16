import { db } from "./firebase.js";
import {
  ref,
  set,
  update,
  onValue
} from "https://www.gstatic.com/firebasejs/12.6.0/firebase-database.js";

const teamRef = ref(db, "team");

// WRITE data
function saveData() {
  set(teamRef, {
    name: "Allied Algos",
    rank: 1,
    season: "2025"
  });
}

// UPDATE part of data
function updateRank(newRank) {
  update(teamRef, {
    rank: newRank
  });
}

// READ data (REALTIME 🔥)
onValue(teamRef, (snapshot) => {
  const data = snapshot.val();
  if (!data) return;

  document.getElementById("name").value = data.name;
  document.getElementById("rank").value = data.rank;
  document.getElementById("season").value = data.season;
});

// Button actions
document.getElementById("saveBtn").onclick = () => {
  updateRank(Number(document.getElementById("rank").value));
};

// Initialize once
saveData();
console.log("Realtime listeners set ✅");