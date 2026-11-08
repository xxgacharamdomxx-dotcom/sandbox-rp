// ==========================================================================
// 1. DICCIONARIO DE CONTENIDOS (Simula las diferentes "Apps" o Páginas)
// ==========================================================================
const contenidos = {
    mundos: `
        <section class="banner-hero">
            <div class="banner-overlay"></div>
            <div class="banner-info">
                <h1 class="banner-title">Simulador de Demon Slayer</h1>
                <p class="banner-description">Japón, era Taishō. Sobreviviste a la Selección Final en el Monte Fujikasane y conseguiste tu primer cuervo. Respira, desenvaina tu espada Nichirin y...</p>
                <div class="banner-meta"><span>👤 Gugugaga</span> <span>👁️ 6K</span> <span>💬 172K</span> <span>⭐ 503</span></div>
                <button class="btn-play">▶ Jugar ahora</button>
            </div>
        </section>
        <section class="showcase-section">
            <h3 class="section-subtitle">✨ ELEGIDO PARA TI</h3>
            <div class="worlds-grid">
                <div class="world-card"><div class="card-image-placeholder"></div><div class="card-content"><h4>Lector Omnisciente</h4><p>Entorno de rol interactivo...</p></div></div>
                <div class="world-card"><div class="card-image-placeholder"></div><div class="card-content"><h4>Kimetsu High School</h4><p>Un mundo alternativo escolar...</p></div></div>
            </div>
        </section>
    `,
    personajes: `
        <section class="showcase-section">
            <h1 class="banner-title" style="margin-bottom: 8px;">👤 Tus Personajes</h1>
            <p style="color: #9ca3af; margin-bottom: 24px;">Aquí aparecerán los avatares e identidades virtuales que uses en tus sandboxes.</p>
            <div class="worlds-grid">
                <div class="world-card">
                    <div class="card-image-placeholder" style="background-color: #4f46e5;"></div>
                    <div class="card-content"><h4>Cazador de Demonios (Tú)</h4><p>Rango: Mizunoto | Respiración: Agua</p></div>
                </div>
            </div>
        </section>
    `,
    mio: `
        <section class="showcase-section">
            <h1 class="banner-title">🎮 Mi Perfil</h1>
            <p style="color: #9ca3af;">Estadísticas generales de tus roles activos, logs de misiones y configuraciones del sistema.</p>
        </section>
    `,
    comunidad: `
        <section class="showcase-section">
            <h1 class="banner-title">👥 Comunidad</h1>
            <p style="color: #9ca3af;">Revisa las capturas, hilos de historias y los códigos de mundos compartidos por otros creadores.</p>
        </section>
    `,
    mercado: `
        <section class="showcase-section">
            <h1 class="banner-title">🛍️ Mercado de Apps</h1>
            <p style="color: #9ca3af; margin-bottom: 20px;">Instala extensiones multimedia dentro de tus salas de simulación (Inventarios, Dados RPG, Redes Sociales).</p>
            <div class="worlds-grid" style="grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));">
                <div class="world-card" style="padding: 16px;">
                    <h4>🎒 Inventario RPG Pro</h4>
                    <p style="margin-top: 6px;">Permite que tus bots organicen mochilas de ítems y gestionen dinero ficticio.</p>
                    <button class="btn-play" style="padding: 6px 16px; font-size: 12px; margin-top: 12px;">Instalar App</button>
                </div>
            </div>
        </section>
    `,
    mapas: `
        <section class="showcase-section">
            <h1 class="banner-title">🗺️ Mapas de Rol</h1>
            <p style="color: #9ca3af;">Explora las locaciones disponibles para tus sandboxes tácticos y geopolíticos.</p>
        </section>
    `
};

// ==========================================================================
// 2. SELECCIÓN DE ELEMENTOS Y DETECCIÓN DE CLICS
// ==========================================================================
document.addEventListener("DOMContentLoaded", () => {
    // Capturamos todos los botones de la barra lateral izquierda
    const botones = document.querySelectorAll(".menu-btn");
    // Capturamos el panel derecho que queremos alterar dinámicamente
    const panelContenido = document.querySelector(".main-content");

    // Mapeamos cada botón del menú con su clave correspondiente del diccionario
    const mapaBotones = ["mundos", "personajes", "mio", "comunidad", "mercado", "mapas"];

    botones.forEach((boton, index) => {
        boton.addEventListener("click", () => {
            
            // A. Quitar el color azul (.active) a todos los botones
            botones.forEach(b => b.classList.remove("active"));
            
            // B. Iluminar en azul únicamente el botón al que se le dio clic
            boton.classList.add("active");

            // C. Cambiar el contenido del panel derecho según la sección elegida
            const claveSeccion = mapaBotones[index];
            if (contenidos[claveSeccion]) {
                panelContenido.innerHTML = contenidos[claveSeccion];
            }
        });
    });
});