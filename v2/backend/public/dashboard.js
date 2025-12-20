    import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

// Supabase config
const SUPABASE_URL = "https://eyxhddkoqotedgucpfbz.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_h4nlL7bfvrg-amPOoqyhTw_CJjsVfJc";

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// DOM Elements
const loginContainer = document.getElementById("login-container");
const dashboardContainer = document.getElementById("dashboard-container");
const loginBtn = document.getElementById("login-btn");
const logoutBtn = document.getElementById("logout-btn");
const loginError = document.getElementById("login-error");
const dataTable = document.querySelector("#data-table tbody");

const addBtn = document.getElementById("add-btn");
const newName = document.getElementById("new-name");
const newEmail = document.getElementById("new-email");

// Login
loginBtn.addEventListener("click", async () => {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
        loginError.textContent = error.message;
    } else {
        loginContainer.classList.add("hidden");
        dashboardContainer.classList.remove("hidden");
        fetchData();
    }
});

// Logout
logoutBtn.addEventListener("click", async () => {
    await supabase.auth.signOut();
    dashboardContainer.classList.add("hidden");
    loginContainer.classList.remove("hidden");
});

// Fetch data from table
async function fetchData() {
    const { data, error } = await supabase.from("members").select("*");

    if (error) {
        console.error(error);
        return;
    }

    dataTable.innerHTML = "";
    data.forEach(row => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td class="py-2 px-4 border">${row.id}</td>
            <td class="py-2 px-4 border"><input class="w-full p-1 border rounded" value="${row.name}" /></td>
            <td class="py-2 px-4 border"><input class="w-full p-1 border rounded" value="${row.role}" /></td>
            <td class="py-2 px-4 border"><input class="w-full p-1 border rounded" value="${row.des}" /></td>
            <td class="py-2 px-4 border"><input class="w-full p-1 border rounded" value="${row.img}" /></td>
            <td class="py-2 px-4 border flex gap-2">
                <button class="bg-yellow-500 text-white px-2 py-1 rounded edit-btn">Save</button>
                <button class="bg-red-500 text-white px-2 py-1 rounded delete-btn">Delete</button>
            </td>
        `;
        dataTable.appendChild(tr);

        // Save edits
        tr.querySelector(".edit-btn").addEventListener("click", async () => {
            const updatedName = tr.children[1].querySelector("input").value;
            const updatedEmail = tr.children[2].querySelector("input").value;

            await supabase.from("members").update({ name: updatedName, email: updatedEmail }).eq("id", row.id);
            fetchData();
        });

        // Delete record
        tr.querySelector(".delete-btn").addEventListener("click", async () => {
            await supabase.from("members").delete().eq("id", row.id);
            fetchData();
        });
    });
}

// Add new record
addBtn.addEventListener("click", async () => {
    const name = newName.value;
    const email = newEmail.value;
    if (!name || !email) return alert("Enter name and email");

    await supabase.from("your_table_name").insert([{ name, email }]);
    newName.value = "";
    newEmail.value = "";
    fetchData();
});
