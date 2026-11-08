document.addEventListener("DOMContentLoaded", () => {
    // 1. CAPTURA DE BOTONES Y PANELES
    const botonesMenu = document.querySelectorAll(".menu-btn");
    const btnStartGame = document.getElementById("btn-start-game");
    
    // Contenedores del menú de Mundos
    const worldsBanner = document.getElementById("worlds-banner");
    const worldsCategories = document.getElementById("worlds-categories");
    const worldsShowcase = document.getElementById("worlds-showcase");
    
    // Contenedor de la Terminal de Juego
    const simulationTerminal = document.getElementById("simulation-terminal");

    // 2. LÓGICA DE CONTROL DEL BOTÓN "JUGAR AHORA"
    if (btnStartGame) {
        btnStartGame.addEventListener("click", () => {
            // Ocultamos todas las secciones de la lista de mundos
            worldsBanner.classList.add("hidden");
            worldsCategories.classList.add("hidden");
            worldsShowcase.classList.add("hidden");
            
            // Mostramos la gloriosa terminal de simulación neón
            simulationTerminal.classList.remove("hidden");
        });
    }

    // 3. RESTABLECER LA INTERFAZ AL HACER CLIC EN OTRO BOTÓN DEL MENÚ
    botonesMenu.forEach((boton) => {
        boton.addEventListener("click", () => {
            // Quitar clase activa a todos y ponérsela al seleccionado
            botonesMenu.forEach(b => b.classList.remove("active"));
            boton.classList.add("active");

            // Si el usuario presiona un botón diferente (como Personajes, Perfil, etc.)
            // salimos de la simulación y regresamos al estado base
            simulationTerminal.classList.add("hidden");
            worldsBanner.classList.remove("hidden");
            worldsCategories.classList.remove("hidden");
            worldsShowcase.classList.remove("hidden");
        });
    });

    // 4. SISTEMA DE ENVÍO DE ACCIONES DENTRO DEL CHAT
    const inputAccion = document.getElementById("user-input");
    const btnEnviar = document.getElementById("btn-send-action");
    const pantallaChat = document.getElementById("chat-screen");

    function enviarAccionUsuario() {
        const texto = inputAccion.value.trim();
        if (texto === "") return; // Ignorar si está vacío

        // Crear elemento HTML para el mensaje del usuario
        const mensajeUsuario = document.createElement("div");
        mensajeUsuario.classList.add("message");
        mensajeUsuario.innerHTML = `<span class="sender" style="color: #64748b;">[ACCIÓN]</span><p>${texto.toUpperCase()}</p>`;
        
        // Adjuntarlo a la pantalla de la consola
        pantallaChat.appendChild(mensajeUsuario);
        
        // Limpiar la barra de entrada de texto
        inputAccion.value = "";
        
        // Auto-scroll automático hacia abajo para no perder el hilo
        pantallaChat.scrollTop = pantallaChat.scrollHeight;
    }

    // Detectar clic en el botón ENVIAR
    if (btnEnviar) {
        btnEnviar.addEventListener("click", enviarAccionUsuario);
    }

    // Detectar cuando el usuario presiona la tecla 'Enter' en el teclado
    if (inputAccion) {
        inputAccion.addEventListener("keypress", (e) => {
            if (e.key === "Enter") {
                enviarAccionUsuario();
            }
        });
    }
});