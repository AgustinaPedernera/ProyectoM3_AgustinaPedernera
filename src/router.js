import { homeView } from "./views/home.js";
import { aboutView } from "./views/about.js";
import { chatView } from "./views/chat.js";

export function router() {
  const path = window.location.pathname;
  const app = document.getElementById("app");

  if (path === "/" || path === "/index.html") {
  app.innerHTML = homeView();
} else if (path === "/about") {
  app.innerHTML = aboutView();
} else if (path === "/chat") {
  app.innerHTML = chatView();
} else {
  app.innerHTML = "<h1>404 - Página no encontrada</h1>";
}
}