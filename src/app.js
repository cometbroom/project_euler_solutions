import createNavigatorComponent from "./components/navigatorComponent.js";
import log from "./lib/logger.js";
import router from "./lib/router.js";
import { routes } from "./pages/routes.js";
import state$ from "./state.js";
import { createElement } from "./tools/DOMCreate.js";

function loadApp() {
  log.setLevel("none");

  const appRoot = document.querySelector("section.ui");

  // Create a DOM element that will serve as the mount point
  const pageRoot = createElement("div", { id: "page-root" });
  appRoot.appendChild(pageRoot);

  const navigatorComponent = createNavigatorComponent();
  document.querySelector("main").appendChild(navigatorComponent.root);

  router.start(routes, pageRoot);
}
window.addEventListener("load", loadApp);

window.elapsedSet = (num) => {
  state$.updateState({ elapsed: num });
};
