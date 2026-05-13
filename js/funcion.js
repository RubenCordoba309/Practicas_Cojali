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

const estudios = [
    {
        titulo: "Grado Superior DAM",
        centro: "IES Juan Bosco",
        fecha: "2025 - presente"
    },
    {
        titulo: "Bachillerato Tecnológico",
        centro: "IES Eladio Cabañero",
        fecha: "2022 - 2024"
    },
    {
        titulo: "ESO",
        centro: "IES Eladio Cabañero",
        fecha: "2018 - 2022"
    }
];

function renderizarEstudios() {
    const contenedor = document.getElementById("lista-estudios");

    contenedor.innerHTML = "";

    estudios.forEach(estudio => {
        const card = document.createElement("article");
        card.className = "estudio-card";

        card.innerHTML = `
            <h4>${estudio.titulo}</h4>
            <p><strong>${estudio.centro}</strong></p>
            <p>${estudio.fecha}</p>
        `;
        contenedor.appendChild(card);
    });
}

renderizarEstudios();