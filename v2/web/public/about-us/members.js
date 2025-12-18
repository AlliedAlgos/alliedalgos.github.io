// members.js
import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

// 🔹 Supabase config
const SUPABASE_URL = "https://eyxhddkoqotedgucpfbz.supabase.co"; // replace with your project URL
const SUPABASE_ANON_KEY = "sb_publishable_h4nlL7bfvrg-amPOoqyhTw_CJjsVfJc";

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function renderMembers() {
    const container = document.getElementById("members-container");
    container.innerHTML = "";

    const { data: members, error } = await supabase
        .from("members")
        .select("*");

    if (error) {
        console.error(error);
        container.innerHTML =
            "<p class='text-red-400'>Failed to load members.</p>";
        return;
    }

    members.forEach((member, index) => {
        const card = document.createElement("div");
        card.className = "member-card animate-fade-in";
        card.style.animationDelay = `${index * 100}ms`;

        card.innerHTML = `
            <div class="profile-icon">
                <img
                    src="${member.img || '../images/default.png'}"
                    alt="${member.name}"
                    class="w-full h-full object-cover rounded-full"
                />
            </div>

            <div class="card-content">
                <h3>${member.name}</h3>
                <p class="text-cyan-400 font-medium">${member.role}</p>
                <p class="mt-2">${member.des || ""}</p>
            </div>
        `;

        container.appendChild(card);
    });
}

// Expose function to HTML
window.renderMembers = renderMembers;
