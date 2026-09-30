export function homeView() {
  return `
    <section class="home-container">
      <h1>¡Bienvenido al Chat de Estrellas! ✨</h1>
      <p>Elegí a tu personaje favorito y comenzá a chatear en tiempo real con Inteligencia Artificial.</p>
      
      <div class="home-cards">
        <div class="card">
          <h3>Sandro de América 🌹</h3>
          <p>El Gitano te espera para compartir sus historias y un momento romántico.</p>
        </div>
        <div class="card">
          <h3>Moria Casán 👑</h3>
          <p>La One con su lengua karateca lista para responderte sin filtro.</p>
        </div>
        <div class="card">
          <h3>Susana Giménez ✨</h3>
          <p>La diva número uno para hablar de todo con su clásico entusiasmo.</p>
        </div>
      </div>

      <a href="/chat" data-link class="btn-primary" style="display:inline-block; text-decoration:none; text-align:center;">Empezar a Chatear</a>
    </section>
  `;
}