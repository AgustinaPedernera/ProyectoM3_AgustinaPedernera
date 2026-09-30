import { homeView } from "./views/home.js";
import { aboutView } from "./views/about.js";
import { renderChat } from "./views/chat.js";

export function router() {
  const path = window.location.pathname;
  const app = document.getElementById("app");

  if (path === "/" || path === "/index.html") {
    app.innerHTML = homeView();
  } else if (path === "/about") {
    app.innerHTML = aboutView();
  } else if (path === "/chat") {
    renderChat(app);
  } else {
    app.innerHTML = "<h1>404 - Página no encontrada</h1>";
  }

  const themeToggle = document.getElementById("theme-toggle");

function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;

  const isDark = theme === "dark";

  themeToggle.textContent = isDark
    ? "☀ Modo claro"
    : "☾ Modo oscuro";

  themeToggle.setAttribute("aria-pressed", String(isDark));
}

const savedTheme = localStorage.getItem("chat-theme") || "light";
applyTheme(savedTheme);

themeToggle.addEventListener("click", () => {
  const currentTheme = document.documentElement.dataset.theme;
  const nextTheme = currentTheme === "dark" ? "light" : "dark";

  localStorage.setItem("chat-theme", nextTheme);
  applyTheme(nextTheme);
});
}