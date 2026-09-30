export function aboutView() {
  return `
    <section class="about-container">
      <header class="about-header">
        <p class="about-eyebrow">Chat de Estrellas ✨</p>
        <h1>Acerca del proyecto</h1>

        <p class="about-intro">
          Chat de Estrellas es una experiencia interactiva que permite
          conversar con personajes inspirados en figuras populares
          argentinas mediante Inteligencia Artificial.
        </p>
      </header>

      <div class="about-content">
        <article class="about-card">
          <h2>🎭 La experiencia</h2>
          <p>
            Podés elegir entre Sandro, Moria Casán y Susana Giménez.
            Cada personaje posee instrucciones propias para recrear,
            de manera lúdica, algunos rasgos de su estilo público y
            su forma característica de expresarse.
          </p>
        </article>

        <article class="about-card">
          <h2>✨ Inteligencia Artificial</h2>
          <p>
            Las respuestas se generan dinámicamente mediante Google
            Gemini. La aplicación utiliza una Serverless Function para
            comunicarse con la API sin exponer la clave en el frontend.
          </p>
        </article>
      </div>

      <aside class="simulation-notice">
        <h2>Importante</h2>
        <p>
          Los personajes de esta aplicación son simulaciones creadas
          con Inteligencia Artificial con fines educativos y de
          entretenimiento. Las respuestas generadas no provienen de
          las personas reales ni representan necesariamente sus
          opiniones, declaraciones o puntos de vista.
        </p>
      </aside>

      <a href="/home" data-link class="btn-primary">
        Volver al inicio
      </a>
    </section>
  `;
}