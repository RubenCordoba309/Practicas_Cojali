const btn = document.querySelector("#theme-toggle");
const body = document.body;

const currentTheme = localStorage.getItem("theme");

if (currentTheme === "dark") {
    body.classList.add("dark-mode");
    btn.textContent = "☀️";
}

btn.addEventListener("click", () => {
    body.classList.toggle("dark-mode");

    let theme = "light";
    if (body.classList.contains("dark-mode")) {
        theme = "dark";
        btn.textContent = "☀️";
    } else {
        btn.textContent = "🌙";
    }
});