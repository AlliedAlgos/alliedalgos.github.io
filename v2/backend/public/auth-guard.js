import { supabase } from "./supabaseClient.js";

const { data } = await supabase.auth.getSession();

if (!data.session) {
  window.top.location.href = "login.html";
}
