document.addEventListener("DOMContentLoaded", () => {
    // 1. SELECTORES DE LA INTERFAZ
    const botonesMenu = document.querySelectorAll(".menu-btn");
    const worldsBanner = document.getElementById("worlds-banner");
    const worldsCategories = document.getElementById("worlds-categories");
    const worldsShowcase = document.getElementById("worlds-showcase");
    const simulationTerminal = document.getElementById("simulation-terminal");

    // Selectores del Formulario y Modal
    const btnOpenCreator = document.getElementById("btn-open-creator");
    const btnCloseModal = document.getElementById("btn-close-modal");
    const worldModal = document.getElementById("world-modal");
    const worldForm = document.getElementById("world-form");
    const worldsGrid = document.querySelector(".worlds-grid");

    // 2. OBTENER MUNDOS DE LA MEMORIA (CON CORRECCIÓN DE CACHÉ)
    let mundosCreados = JSON.parse(localStorage.getItem("custom_worlds"));
    if (!mundosCreados || !Array.isArray(mundosCreados)) {
        mundosCreados = [];
    }

    // Función para dibujar los mundos en las tarjetas
    function cargarMundosEnGrid() {
        let htmlContenido = `
            <div class="world-card">
                <div class="card-image-placeholder"></div>
                <div class="card-content">
                    <h4>Lector Omnisciente</h4>
                    <p>Entorno de rol interactivo basado en escenarios...</p>
                </div>
            </div>
            <div class="world-card">
                <div class="card-image-placeholder" style="background-color: #1a1e2e;"></div>
                <div class="card-content">
                    <h4>Kimetsu High School</h4>
                    <p>Un mundo alternativo escolar de cazadores...</p>
                </div>
            </div>
        `;

        // Pintar mundos de los jugadores
        mundosCreados.forEach(mundo => {
            htmlContenido += `
                <div class="world-card">
                    <div class="card-image-placeholder" style="background-color: ${mundo.color}44; border-bottom: 1px solid ${mundo.color};"></div>
                    <div class="card-content">
                        <h4 style="color: ${mundo.color};">${mundo.titulo}</h4>
                        <p>${mundo.descripcion}</p>
                    </div>
                </div>
            `;
        });

        if (worldsGrid) {
            worldsGrid.innerHTML = htmlContenido;
        }
        vincularBotonesDeJuego();
    }

    // 3. EVENTOS PARA REACCIONAR A LOS CLICS DEL MENÚ LATERAL
    botonesMenu.forEach((boton, index) => {
        boton.addEventListener("click", () => {
            // Quitar el color activo de todos los botones y ponérselo al seleccionado
            botonesMenu.forEach(b => b.classList.remove("active"));
            boton.classList.add("active");

            // Limpieza general: regresamos a la pantalla de mundos al cambiar de sección
            if (simulationTerminal) simulationTerminal.classList.add("hidden");
            if (worldsBanner) worldsBanner.classList.remove("hidden");
            if (worldsCategories) worldsCategories.classList.remove("hidden");
            if (worldsShowcase) worldsShowcase.classList.remove("hidden");
            
            // Controlar si se muestra o no el botón de crear mundo en la esquina inferior
            if (index === 0 && btnOpenCreator) {
                btnOpenCreator.classList.remove("hidden");
            } else if (btnOpenCreator) {
                btnOpenCreator.classList.add("hidden");
            }
        });
    });

    // 4. CONTROL DE LA VENTANA MODAL (FORMULARIO)
    if (btnOpenCreator) {
        btnOpenCreator.addEventListener("click", () => {
            if (worldModal) worldModal.classList.remove("hidden");
        });
    }
    if (btnCloseModal) {
        btnCloseModal.addEventListener("click", () => {
            if (worldModal) worldModal.classList.add("hidden");
        });
    }

    if (worldForm) {
        worldForm.addEventListener("submit", (e) => {
            e.preventDefault();

            const nuevoMundo = {
                titulo: document.getElementById("world-title").value.trim(),
                descripcion: document.getElementById("world-desc").value.trim(),
                color: document.getElementById("world-color").value.trim() || "#00ffaa"
            };

            mundosCreados.push(nuevoMundo);
            localStorage.setItem("custom_worlds", JSON.stringify(mundosCreados));

            worldForm.reset();
            if (worldModal) worldModal.classList.add("hidden");

            cargarMundosEnGrid();
        });
    }

    // 5. ENLAZAR EL BOTÓN RECTANGULAR "JUGAR AHORA"
    function vincularBotonesDeJuego() {
        const btnStartGame = document.getElementById("btn-start-game");
        if (btnStartGame) {
            btnStartGame.onclick = () => {
                if (worldsBanner) worldsBanner.classList.add("hidden");
                if (worldsCategories) worldsCategories.classList.add("hidden");
                if (worldsShowcase) worldsShowcase.classList.add("hidden");
                if (btnOpenCreator) btnOpenCreator.classList.add("hidden");
                if (simulationTerminal) simulationTerminal.classList.remove("hidden");
            };
        }
    }

    // 6. CONTROL DEL CHAT EN LA TERMINAL
    const inputAccion = document.getElementById("user-input");
    const btnEnviar = document.getElementById("btn-send-action");
    const pantallaChat = document.getElementById("chat-screen");

    function enviarAccionUsuario() {
        const texto = inputAccion.value.trim();
        if (texto === "" || !pantallaChat) return;

        const mensajeUsuario = document.createElement("div");
        mensajeUsuario.classList.add("message");
        mensajeUsuario.innerHTML = `<span class="sender" style="color: #64748b;">[ACCIÓN]</span><p>${texto.toUpperCase()}</p>`;
        
        pantallaChat.appendChild(mensajeUsuario);
        inputAccion.value = "";
        pantallaChat.scrollTop = pantallaChat.scrollHeight;
    }

    if (btnEnviar) btnEnviar.addEventListener("click", enviarAccionUsuario);
    if (inputAccion) {
        inputAccion.addEventListener("keypress", (e) => {
            if (e.key === "Enter") enviarAccionUsuario();
        });
    }

    // Inicializar la carga de tarjetas
    cargarMundosEnGrid();
});
document.addEventListener("DOMContentLoaded", () => {
    // 1. SELECTORES BÁSICOS DE NAVEGACIÓN Y JUEGO
    const botonesMenu = document.querySelectorAll(".menu-btn");
    const worldsBanner = document.getElementById("worlds-banner");
    const worldsCategories = document.getElementById("worlds-categories");
    const worldsShowcase = document.getElementById("worlds-showcase");
    const simulationTerminal = document.getElementById("simulation-terminal");

    // Selectores del Formulario y Modal
    const btnOpenCreator = document.getElementById("btn-open-creator");
    const btnCloseModal = document.getElementById("btn-close-modal");
    const worldModal = document.getElementById("world-modal");
    const worldForm = document.getElementById("world-form");
    const worldsGrid = document.querySelector(".worlds-grid");

    // 2. SISTEMA DE ALMACENAMIENTO DE MUNDOS (CORREGIDO)
    let mundosCreados = JSON.parse(localStorage.getItem("custom_worlds")) || [];

    // Función para renderizar los mundos en pantalla
    function cargarMundosEnGrid() {
        // Mundos base por defecto
        let htmlContenido = `
            <div class="world-card">
                <div class="card-image-placeholder"></div>
                <div class="card-content">
                    <h4>Lector Omnisciente</h4>
                    <p>Entorno de rol interactivo basado en escenarios...</p>
                </div>
            </div>
            <div class="world-card">
                <div class="card-image-placeholder" style="background-color: #1a1e2e;"></div>
                <div class="card-content">
                    <h4>Kimetsu High School</h4>
                    <p>Un mundo alternativo escolar de cazadores...</p>
                </div>
            </div>
        `;

        // Añadir los mundos que haya creado el usuario en la web
        mundosCreados.forEach(mundo => {
            htmlContenido += `
                <div class="world-card">
                    <div class="card-image-placeholder" style="background-color: ${mundo.color}44; border-bottom: 1px solid ${mundo.color};"></div>
                    <div class="card-content">
                        <h4 style="color: ${mundo.color};">${mundo.titulo}</h4>
                        <p>${mundo.descripcion}</p>
                    </div>
                </div>
            `;
        });

        if (worldsGrid) {
            worldsGrid.innerHTML = htmlContenido;
        }
        vincularBotonesDeJuego(); // Vincula el clic para que los mundos se puedan jugar
    }

    // 3. CONTROL DE LA VENTANA MODAL (ABRIR Y CERRAR)
    if (btnOpenCreator) {
        btnOpenCreator.addEventListener("click", () => worldModal.classList.remove("hidden"));
    }
    if (btnCloseModal) {
        btnCloseModal.addEventListener("click", () => worldModal.classList.add("hidden"));
    }

    // 4. GUARDAR EL NUEVO MUNDO CREADO POR EL JUGADOR
    if (worldForm) {
        worldForm.addEventListener("submit", (e) => {
            e.preventDefault(); // Evita que la página se recargue

            const nuevoMundo = {
                titulo: document.getElementById("world-title").value.trim(),
                descripcion: document.getElementById("world-desc").value.trim(),
                color: document.getElementById("world-color").value.trim() || "#00ffaa"
            };

            // Lo metemos al arreglo de la memoria
            mundosCreados.push(nuevoMundo);
            localStorage.setItem("custom_worlds", JSON.stringify(mundosCreados));

            // Limpiar y cerrar formulario
            worldForm.reset();
            worldModal.classList.add("hidden");

            // Volver a renderizar la rejilla actualizada
            cargarMundosEnGrid();
        });
    }

    // 5. ENLAZAR EL BOTÓN "JUGAR AHORA" E INGRESAR A LA TERMINAL
    function vincularBotonesDeJuego() {
        const btnStartGame = document.getElementById("btn-start-game");
        if (btnStartGame) {
            // Quitamos cualquier evento previo clonando el botón para evitar doble clic erróneo
            const nuevoBtn = btnStartGame.cloneNode(true);
            btnStartGame.parentNode.replaceChild(nuevoBtn, btnStartGame);
            
            nuevoBtn.addEventListener("click", () => {
                worldsBanner.classList.add("hidden");
                worldsCategories.classList.add("hidden");
                worldsShowcase.classList.add("hidden");
                if (btnOpenCreator) btnOpenCreator.classList.add("hidden");
                simulationTerminal.classList.remove("hidden");
            });
        }
    }

    // Navegación de pestañas del menú lateral izquierdo
    botonesMenu.forEach((boton) => {
        boton.addEventListener("click", () => {
            botonesMenu.forEach(b => b.classList.remove("active"));
            boton.classList.add("active");

            // Limpieza general de pantallas al cambiar de pestaña
            simulationTerminal.classList.add("hidden");
            worldsBanner.classList.remove("hidden");
            worldsCategories.classList.remove("hidden");
            worldsShowcase.classList.remove("hidden");
            
            // Si regresa a "Mundos", volvemos a mostrar el botón de crear
            if (boton.textContent.includes("Mundos") && btnOpenCreator) {
                btnOpenCreator.classList.remove("hidden");
            } else if (btnOpenCreator) {
                btnOpenCreator.classList.add("hidden");
            }
        });
    });

    // 6. LÓGICA DE MENSAJES DE LA TERMINAL
    const inputAccion = document.getElementById("user-input");
    const btnEnviar = document.getElementById("btn-send-action");
    const pantallaChat = document.getElementById("chat-screen");

    function enviarAccionUsuario() {
        const texto = inputAccion.value.trim();
        if (texto === "") return;

        const mensajeUsuario = document.createElement("div");
        mensajeUsuario.classList.add("message");
        mensajeUsuario.innerHTML = `<span class="sender" style="color: #64748b;">[ACCIÓN]</span><p>${texto.toUpperCase()}</p>`;
        
        pantallaChat.appendChild(mensajeUsuario);
        inputAccion.value = "";
        pantallaChat.scrollTop = pantallaChat.scrollHeight;
    }

    if (btnEnviar) btnEnviar.addEventListener("click", enviarAccionUsuario);
    if (inputAccion) {
        inputAccion.addEventListener("keypress", (e) => {
            if (e.key === "Enter") enviarAccionUsuario();
        });
    }

    // Inicializar cargando los mundos existentes en la base de datos local
    cargarMundosEnGrid();
});
