import { createElement } from "../tools/DOMCreate";

const loadingData = {
  dots: 0,
  text: "Loading",
  colorArray: [],
};

function getLoadingScreen(appendTo) {
  /**
   * Makes a loading element and appends it to your target
   * @param {HTMLElement} appendTo - Target to append to
   * @returns {Object} An object with clear method to clear the loading screen.
   */
  const display = createElement("h1", { class: "loading" });
  appendTo.appendChild(display);
  const intervalId = animateLoading(display);

  return {
    clear: () => {
      clearInterval(intervalId);
      appendTo.removeChild(display);
    },
  };
}

function animateLoading(display) {
  return setInterval(() => {
    displayLoadingData(display, loadingData);
    loadingData.dots++;
    if (loadingData.dots > 3) loadingData.dots = 0;
  }, 500);
}

function displayLoadingData(display, data) {
  display.textContent = `${data.text}${".".repeat(data.dots)}`;
}

export default getLoadingScreen;
