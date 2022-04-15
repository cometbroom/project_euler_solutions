import log from "./lib/logger.js";
import router from "./lib/router.js";
import { routes } from "./pages/routes.js";
import { createElement } from "./tools/DOMCreate.js";

function loadApp() {
  log.setLevel("debug");

  const appRoot = document.querySelector("section.ui");

  // Create a DOM element that will serve as the mount point
  const pageRoot = createElement("div", { id: "page-root" });
  console.log(appRoot);
  appRoot.appendChild(pageRoot);

  router.start(routes, pageRoot);
}
window.addEventListener("load", loadApp);
