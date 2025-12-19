// combined.js
import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

// 🔹 Supabase config
const SUPABASE_URL = "https://YOUR_PROJECT_ID.supabase.co";
const SUPABASE_ANON_KEY = "YOUR_PUBLIC_ANON_KEY";

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// ----- Fetch ALL data from Supabase -----
async function getSeasons() {
    const { data, error } = await supabase
        .from("seasons")
        .select("*")
        .order("order_index", { ascending: true });

    if (error) {
        console.error("Supabase error:", error);
        return [];
    }

    // 🔹 Map DB fields to match old renderer keys
    return data.map(s => ({
        year: s.year,
        title: s.title,
        description: s.description,
        image: s.image,
        alt: s.alt,
        hoursSpent: s.hours_spent,
        peopleImpacted: s.people_impacted,
        missionsCompleted: s.missions_completed,
        is_current: s.is_current
    }));
}

// ----- Render Current Season -----
function renderCurrentSeason(season) {
    const el = document.getElementById("current-season");
    if (!el || !season) return;

    el.innerHTML = `
        <h2 class="text-3xl font-bold mb-6 text-center">
            Current Season: ${season.year}
        </h2>

        <div class="bg-white text-black rounded-xl p-6 shadow-xl grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
            <div class="text-center">
                <p>Hours Spent</p>
                <h2 class="text-4xl font-bold text-blue-700">
                    ${season.hoursSpent ?? "N/A"}
                </h2>
            </div>

            <div class="text-center">
                <p>People Impacted</p>
                <h2 class="text-4xl font-bold text-blue-700">
                    ${season.peopleImpacted ?? "N/A"}
                </h2>
            </div>

            <div class="text-center">
                <p>Missions Completed</p>
                <h2 class="text-4xl font-bold text-blue-700">
                    ${season.missionsCompleted ?? "N/A"}
                </h2>
            </div>
        </div>

        <div class="max-w-4xl mx-auto text-lg">
            <h4 class="text-2xl font-semibold mb-2">${season.title}</h4>
            <p>${season.description}</p>
        </div>
    `;
}

// ----- Render Past Seasons -----
function renderPastSeasons(seasons) {
    const container = document.getElementById("past-seasons-container");
    if (!container) return;

    container.innerHTML = "";

    seasons.forEach((s, i) => {
        const reverse = i % 2 ? "md:flex-row-reverse" : "md:flex-row";

        container.innerHTML += `
            <div class="bg-white rounded-xl shadow-xl overflow-hidden mb-8 flex flex-col ${reverse}">
                <img
                    src="${s.image}"
                    alt="${s.alt}"
                    class="w-full md:w-1/2 object-cover max-h-80"
                />
                <div class="p-6 md:w-1/2">
                    <h1 class="text-3xl font-bold text-blue-900 mb-2">
                        ${s.year}
                    </h1>
                    <h4 class="text-xl font-semibold text-gray-700 mb-4">
                        ${s.title}
                    </h4>
                    <p class="text-gray-600">
                        ${s.description}
                    </p>
                </div>
            </div>
        `;
    });
}

// ----- Init -----
document.addEventListener("DOMContentLoaded", async () => {
    const seasons = await getSeasons();

    if (!seasons.length) {
        console.warn("No seasons found");
        return;
    }

    const current = seasons.find(s => s.is_current);
    const past = seasons.filter(s => !s.is_current);

    renderCurrentSeason(current);
    renderPastSeasons(past);
});
