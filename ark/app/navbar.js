document.addEventListener("click", (e) => {
    const bell = document.getElementById("notifyBtn");
    const panel = document.getElementById("notifyPanel");

    if (!bell || !panel) return;

    if (bell.contains(e.target)) {
        panel.classList.toggle("hidden");
    } else if (!panel.contains(e.target)) {
        panel.classList.add("hidden");
    }
});
