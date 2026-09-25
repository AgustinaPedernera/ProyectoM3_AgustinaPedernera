export function chatView() {
  return `
    <section>
      <h1>Hablemos un rato</h1>

      <div id="chat-messages" aria-live="polite">
        <p>¡Hola! ¿Qué querés conversar hoy?</p>
      </div>

      <form id="chat-form">
        <label for="message-input">Tu mensaje</label>
        <input
          type="text"
          id="message-input"
          name="message"
          placeholder="Escribí tu mensaje..."
          required
        />
        <button type="submit">Enviar</button>
      </form>
    </section>
  `;
}