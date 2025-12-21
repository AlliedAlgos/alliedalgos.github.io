import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

const supabase = createClient(
  "https://eyxhddkoqotedgucpfbz.supabase.co",
  "sb_publishable_h4nlL7bfvrg-amPOoqyhTw_CJjsVfJc"
);

// Redirect if not logged in
const { data } = await supabase.auth.getSession();

if (!data.session) {
  window.top.location.href = "login.html";
}

// Expose user globally
window.currentUser = data.session?.user;
