import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

const supabase = createClient(
  "https://eyxhddkoqotedgucpfbz.supabase.co",
  "sb_publishable_h4nlL7bfvrg-amPOoqyhTw_CJjsVfJc"
);

const loginBtn = document.getElementById("login-btn");
const googleBtn = document.getElementById("google-login-btn");
const errorBox = document.getElementById("login-error");

// Email login
loginBtn.addEventListener("click", async () => {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    errorBox.textContent = error.message;
  } else {
    window.location.href = "index.html";
  }
});

// Google login
googleBtn.addEventListener("click", async () => {
  await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: window.location.origin + "/admin/index.html"
    }
  });
});
