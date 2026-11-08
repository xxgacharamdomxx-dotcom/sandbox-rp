document.addEventListener("DOMContentLoaded", () => {
    // 1. SELECTORES DE LA INTERFAZ DE USUARIO
    const botonesMenu = document.querySelectorAll(".menu-btn");
    const worldsBanner = document.getElementById("worlds-banner");
    const worldsCategories = document.getElementById("worlds-categories");
    const worldsShowcase = document.getElementById("worlds-showcase");
    const simulationTerminal = document.getElementById("simulation-terminal");

    // Selectores del Formulario y Modal de Mundos
    const btnOpenCreator = document.getElementById("btn-open-creator");
    const btnCloseModal = document.getElementById("btn-close-modal");
    const worldModal = document.getElementById("world-modal");
    const worldForm = document.getElementById("world-form");
    const worldsGrid = document.querySelector(".worlds-grid");

    // 2. DICCIONARIO DE PESTAÑAS (Módulos de la interfaz Cyberpunk)
    const contenidosSecciones = {
        personajes: `
            <section class="showcase-section">
                <h1 class="banner-title" style="font-size: 24px; color: #ffffff; margin-bottom: 8px;">[IDENTIDADES VIRTUALES]</h1>
                <p style="color: #64748b; margin-bottom: 24px; font-size: 13px;">AVATARES ACTIVOS DENTRO DE TUS ENFIELADOS DE ROL.</p>
                <div class="worlds-grid">
                    <div class="world-card">
                        <div class="card-image-placeholder" style="background-color: #00ffaa11; border-bottom: 1px solid #00ffaa;"></div>
                        <div class="card-content">
                            <h4>CAZADOR DE DEMONIOS (TÚ)</h4>
                            <p>RANGO: MIZUNOTO | RESPIRACIÓN: AGUA (NIV. 1)</p>
                        </div>
                    </div>
                </div>
            </section>
        `,
        perfil: `
            <section class="showcase-section">
                <h1 class="banner-title" style="font-size: 24px; color: #ffffff; margin-bottom: 8px;">[NÚCLEO DE USUARIO]</h1>
                <p style="color: #64748b; font-size: 13px; margin-bottom: 20px;">ESTADÍSTICAS GLOBALES DEL JUGADOR Y REGISTROS DE CONFIGURACIÓN.</p>
                <div class="inv-item" style="max-width: 400px; margin-bottom: 10px;">ID USUARIO: RADICAL_PLAYER_01</div>
                <div class="inv-item" style="max-width: 400px; margin-bottom: 10px;">ESTADO DE CONEXIÓN: NODO_ACTIVO</div>
                <div class="inv-item" style="max-width: 400px; color: #00ffaa;">CRÉDITOS SANDBOX: 100% LIBRE (SIN MONEDAS DE PAGO)</div>
            </section>
        `,
        comunidad: `
            <section class="showcase-section">
                <h1 class="banner-title" style="font-size: 24px; color: #ffffff; margin-bottom: 8px;">[RED DE TRANSMISIÓN]</h1>
                <p style="color: #64748b; font-size: 13px;">HILOS DE LORE Y CÓDIGOS DE DIALOGO COMPARTIDOS POR OTROS OPERADORES.</p>
            </section>
        `,
        mercado: `
            <section class="showcase-section">
                <h1 class="banner-title" style="font-size: 24px; color: #ffffff; margin-bottom: 8px;">[TIENDA DE MÓDULOS]</h1>
                <p style="color: #64748b; font-size: 13px; margin-bottom: 24px;">INSTALA HERRAMIENTAS ADICIONALES PARA TU TERMINAL DE JUEGO.</p>
                <div class="worlds-grid">
                    <div class="world-card" style="padding: 16px;">
                        <h4 style="color: #00ffaa;">🎒 INVENTARIO RPG PRO</h4>
                        <p style="margin: 8px 0; color: #64748b;">Módulo que permite a los personajes guardar objetos físicos y administrar consumibles.</p>
                        <button class="btn-play" style="padding: 8px 16px; font-size: 11px; margin-top: 10px;">INTEGRAR EN TERMINAL</button>
                    </div>
                </div>
            </section>
        `,
        mapas: `
            <section class="showcase-section">
                <h1 class="banner-title" style="font-size: 24px; color: #ffffff; margin-bottom: 8px;">[CARTOGRAFÍA TÁCTICA]</h1>
                <p style="color: #64748b; font-size: 13px;">LOCACIONES DISPONIBLES PARA LAS NARRATIVAS DE HISTORIAS ALTERNATIVAS.</p>
            </section>
        `
    };

    // 3. BASE DE DATOS DE MUNDOS (LOCALSTORAGE)
    let mundosCreados = JSON.parse(localStorage.getItem("custom_worlds"));
    if (!mundosCreados || !Array.isArray(mundosCreados)) {
        mundosCreados = [];
    }

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

        if (worldsGrid) worldsGrid.innerHTML = htmlContenido;
        vincularBotonesDeJuego();
    }

    // 4. LOGICA DE INTERCAMBIO DE PESTAÑAS DEL MENÚ
    const mapaSecciones = ["mundos", "personajes", "perfil", "comunidad", "mercado", "mapas"];

    botonesMenu.forEach((boton, index) => {
        boton.addEventListener("click", () => {
            botonesMenu.forEach(b => b.classList.remove("active"));
            boton.classList.add("active");

            const seccionActual = mapaSecciones[index];

            // Si el usuario hace clic en "Mundos"
            if (seccionActual === "mundos") {
                if (simulationTerminal) simulationTerminal.classList.add("hidden");
                if (worldsBanner) worldsBanner.classList.remove("hidden");
                if (worldsCategories) worldsCategories.classList.remove("hidden");
                if (worldsShowcase) worldsShowcase.classList.remove("hidden");
                if (btnOpenCreator) btnOpenCreator.classList.remove("hidden");
                cargarMundosEnGrid(); // Recarga las tarjetas y añade los eventos
            } else {
                // Si hace clic en Perfil, Apps, Personajes, etc., inyectamos su HTML correspondiente
                if (simulationTerminal) simulationTerminal.classList.add("hidden");
                if (worldsBanner) worldsBanner.classList.add("hidden");
                if (worldsCategories) worldsCategories.classList.add("hidden");
                if (btnOpenCreator) btnOpenCreator.classList.add("hidden");
                
                if (worldsShowcase) {
                    worldsShowcase.classList.remove("hidden");
                    worldsShowcase.innerHTML = contenidosSecciones[seccionActual] || `<p style='color:#64748b;'>Sección en desarrollo...</p>`;
                }
            }
        });
    });

    // 5. CONTROL DE LA VENTANA MODAL (CREADOR DE MUNDOS)
    if (btnOpenCreator) {
        btnOpenCreator.addEventListener("click", () => worldModal && worldModal.classList.remove("hidden"));
    }
    if (btnCloseModal) {
        btnCloseModal.addEventListener("click", () => worldModal && worldModal.classList.add("hidden"));
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

    // 6. ENLAZAR EL BOTÓN RECTANGULAR "JUGAR AHORA"
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

    // 7. CONTROL DEL CHAT EN LA TERMINAL
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

