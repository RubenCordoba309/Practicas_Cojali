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

        let tagsHTML = "";
        if (estudio.tags && estudio.tags.length > 0) {
            tagsHTML = `<div class="tags-container">` + 
                estudio.tags.map(t => `<span class="tech-tag">${t.trim()}</span>`).join("") + 
                `</div>`;
        }


        let imgHTML = estudio.imagen ? `
            <div class="estudio-img-contenedor">
                <img src="${estudio.imagen}" alt="Logo de la institución" class="estudio-img">
            </div>
        ` : "";

        card.innerHTML = `
            ${imgHTML}
            <h4>${estudio.titulo}</h4>
            <p><strong>${estudio.centro}</strong></p>
            ${estudio.fecha ? `<p>${estudio.fecha}</p>` : ""}
            ${tagsHTML}
        `;
        contenedor.appendChild(card);
    });
}

renderizarEstudios();

const formEstudios = document.getElementById("form-estudios");
const inputTags = document.getElementById("estudio-tags");
const vistaPreviaTags = document.getElementById("vista-previa-tags");

inputTags.addEventListener("input", (e) => {
    vistaPreviaTags.innerHTML = "";
    const palabras = e.target.value.split(",");

    palabras.forEach(palabra => {
        const textoLimpio = palabra.trim();
        if (textoLimpio !== "") {
            const span = document.createElement("span");
            span.className = "tech-tag";
            span.textContent = textoLimpio;
            vistaPreviaTags.appendChild(span);
        }
    });
});
formEstudios.addEventListener("submit", (e) => {
    e.preventDefault();

    const titulo = document.getElementById("estudio-titulo").value;
    const centro = document.getElementById("estudio-centro").value;
    const imagen = document.getElementById("estudio-imagen").value;
    const tagsOr = inputTags.value.split(",");
    const filtradosTags = tagsOr.map(t => t.trim()).filter(t => t !== "");

    const nuevoEstudio = {
        titulo: titulo,
        centro: centro,
        fecha: "Añadido recientemente",
        imagen: imagen || null,
        tags: filtradosTags
    };

    estudios.push(nuevoEstudio);
    renderizarEstudios();
    formEstudios.reset();
    vistaPreviaTags.innerHTML = "";

});