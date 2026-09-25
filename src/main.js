import { router } from "./router.js";

document.addEventListener("click", (event) => {
  const link = event.target.closest("[data-link]");

  if (!link) return;

  event.preventDefault();
  window.history.pushState({}, "", link.href);
  router();
});

window.addEventListener("popstate", router);

document.addEventListener("submit", (event) => {
  if (event.target.id !== "chat-form") return;

  event.preventDefault();

  const input = document.getElementById("message-input");
  const mensaje = input.value.trim();

  if (!mensaje) return;

  const mensajes = document.getElementById("chat-messages");
  const burbuja = document.createElement("p");

  burbuja.textContent = mensaje;
  mensajes.appendChild(burbuja);

  input.value = "";
});
router();