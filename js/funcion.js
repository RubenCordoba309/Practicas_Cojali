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

const inputBuscar = document.getElementById("github-buscador");
const botonBuscar = document.getElementById("github-btn");
const contenedorPerfil = document.getElementById("github-usu-tarj");
const contenedorRepos = document.getElementById("repos-github");

async function buscarPerfilGitHub() {
    const usuario = inputBuscar.value.trim();

    if (usuario === "") {
        alert("Por favor, introduce un nombre de usuario.")
        return;
    }

    contenedorPerfil.innerHTML = "";
    contenedorRepos.innerHTML = '<p class="cargando-repos">Buscando usuario y repositorios</p>';

    try {
        const [resUsuario, resRepos] = await Promise.all([
            fetch(`https://api.github.com/users/${usuario}`),
            fetch(`https://api.github.com/users/${usuario}/repos?sort=updated&per_page=6`)
        ]);

        if (resUsuario.status === 404) {
            contenedorPerfil.innerHTML = "";
            contenedorRepos.innerHTML = `
                <p class="error-github">
                    El usuario "${usuario}" no existe en GitHub.
                </p>
            `;
            return;
        }

        if (!resUsuario.ok || !resRepos.ok) {
            throw new Error("Error al conectar con la API de GitHub");
        }

        const perfil = await resUsuario.json();
        const repos = await resRepos.json();

        contenedorPerfil.innerHTML = `
            <div class="estudio-tarj github-perfil-tarj">
                <img src="${perfil.avatar_url}" alt="Avatar de ${perfil.login}" class="github-avatar">
                <div class="github-info">
                    <h3>${perfil.name || perfil.login}</h3>
                    <p class="github-usuario">@${perfil.login}</p>
                    <p class="github-bio">${perfil.bio || "Este usuario no tiene biografía"}</p>
                    <p class="github-stats">
                        <strong>Seguidores:</strong> ${perfil.followers} | <strong>Siguiendo:</strong> ${perfil.following} | <strong>Repos públicos:</strong> ${perfil.public_repos}
                    </p>
                </div>
            </div>
        `;

        contenedorRepos.innerHTML = "";

        if (repos.length === 0) {
            contenedorRepos.innerHTML = '<p class="sin-repos">Este usuario no tiene repositorios públicos.</p>';
            return;
        }

        repos.forEach(repo => {
            const article = document.createElement("article");
            article.className = "proyectos-item github-repo-tarj";

            const descripcion = repo.description || "Sin descripción disponible.";
            const lenguajeHTML = repo.language
                ? `<div class="tags-contenedor github-tags-center">
                    <span class="tech-tag">${repo.language}</span>
                    </div>` 
                : "";
            article.innerHTML = `
                <h4>${repo.name}</h4>
                <p class="repo-desc">${descripcion}</p>
                ${lenguajeHTML}
                <div class="repo-link-container">
                    <a href="${repo.html_url}" target="_blank" rel="noopener noreferrer" class="tech-tag repo-btn">
                        Ver repositorio
                    </a>
                </div>
            `;
            contenedorRepos.appendChild(article);
        })
    } catch (error) {
        console.error(error);
        contenedorPerfil.innerHTML = "";
        contenedorRepos.innerHTML = `
            <p class="error-github">
                Ocurrió un error al obtener los datos. Puede que hayas superado el límite de peticiones de GitHub.
            </p>
        `;
    }
}

botonBuscar.addEventListener("click", buscarPerfilGitHub);
inputBuscar.addEventListener("keypress", (e) =>{
    if (e.key === "Enter") {
        buscarPerfilGitHub();
    }
});