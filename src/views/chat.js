export function renderChat(container) {
  // Datos de configuración para cada personaje
  const characters = {
    sandro: {
      title: 'Conversa con Sandro 🌹',
      placeholder: 'Escríbele a Sandro...',
      greeting: '¡Hola, nena! Qué alegría tenerte por acá. ¿De qué te gustaría hablar hoy?'
    },
    moria: {
      title: 'Conversa con La One 👑',
      placeholder: 'Escríbele a La One...',
      greeting: '¡Si querés llorar, llorá! Decime, mi amor, ¿qué me querés contar?'
    },
    susana: {
      title: 'Conversa con Susana ✨',
      placeholder: 'Escríbele a Susana...',
      greeting: '¡Hola, mi amor! ¡Qué divino! ¿Qué me vas a preguntar?'
    }
  };

  let activeCharacter = 'sandro';

  // Historial de la conversación durante la sesión
  let history = [];

  container.innerHTML = `
    <div class="chat-container">
      <h2 id="chat-title">${characters[activeCharacter].title}</h2>

      <div class="character-picker">
        <button type="button" class="character-card is-selected" data-character="sandro">
          <img src="/sandro.jpg" alt="Sandro" class="character-avatar" />
          <span class="character-name">Sandro</span>
        </button>

        <button type="button" class="character-card" data-character="moria">
          <img src="/moria.jpg" alt="Moria" class="character-avatar" />
          <span class="character-name">Moria</span>
        </button>

        <button type="button" class="character-card" data-character="susana">
          <img src="/susana.jpg" alt="Susana" class="character-avatar" />
          <span class="character-name">Susana</span>
        </button>
      </div>

      <div id="chat-messages" class="chat-messages">
        <div class="message bot">${characters[activeCharacter].greeting}</div>
      </div>

      <form id="chat-form" class="chat-form">
        <input
          type="text"
          id="chat-input"
          placeholder="${characters[activeCharacter].placeholder}"
          required
          autocomplete="off"
        />
        <button type="submit">Enviar</button>
      </form>
    </div>
  `;

  const titleEl = container.querySelector('#chat-title');
  const inputEl = container.querySelector('#chat-input');
  const messagesDiv = container.querySelector('#chat-messages');
  const form = container.querySelector('#chat-form');
  const cards = container.querySelectorAll('.character-card');

  // Evento para cambiar de personaje
  cards.forEach((card) => {
    card.addEventListener('click', () => {
      const selectedKey = card.getAttribute('data-character');

      if (selectedKey === activeCharacter) return;

      activeCharacter = selectedKey;

      // Al cambiar de personaje comienza una conversación nueva
      history = [];

      // Actualizar tarjeta activa en el selector
      cards.forEach((c) => c.classList.remove('is-selected'));
      card.classList.add('is-selected');

      // Actualizar título e input
      const charData = characters[activeCharacter];
      titleEl.textContent = charData.title;
      inputEl.placeholder = charData.placeholder;

      // Reiniciar mensajes con el saludo del personaje activo
      messagesDiv.innerHTML = `
        <div class="message bot">${charData.greeting}</div>
      `;
    });
  });

  // Envío del mensaje
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const message = inputEl.value.trim();

    if (!message) return;

    appendMessage('user', message);

    // Guardar mensaje del usuario en el historial
    history.push({
      sender: 'user',
      text: message
    });

    inputEl.value = '';

    const loadingMsg = appendMessage(
      'bot',
      'Pensando respuesta...'
    );

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message,
          character: activeCharacter,
          history
        }),
      });

      const data = await response.json();

      if (response.ok) {
        loadingMsg.textContent = data.reply;

        // Guardar respuesta de Gemini en el historial
        history.push({
          sender: 'bot',
          text: data.reply
        });
      } else {
        loadingMsg.textContent =
          'Error: ' +
          (data.error || 'Ocurrió un problema');
      }
    } catch (error) {
      console.error(
        'Error al enviar el mensaje:',
        error
      );

      loadingMsg.textContent =
        'Error de conexión con el servidor.';
    }
  });

  function appendMessage(sender, text) {
    const msgElement = document.createElement('div');

    msgElement.classList.add('message', sender);
    msgElement.textContent = text;

    messagesDiv.appendChild(msgElement);

    // Scroll automático al último mensaje
    messagesDiv.scrollTop =
      messagesDiv.scrollHeight;

    return msgElement;
  }
}