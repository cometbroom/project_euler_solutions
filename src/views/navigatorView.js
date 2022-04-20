import { INACTIVE_BTN } from "../constants";
import { appData } from "../data/data";
import router from "../lib/router";
import { createElement } from "../tools/DOMCreate";

export const createNavigatorElement = (state) => {
  const section = createElement("section", { class: "navigator" });
  const prevBtn = createElement("button", { content: "Previous" });
  const nextBtn = createElement("button", { content: "Next" });
  state.subscribe((newState) => {
    prevBtn.classList.add(INACTIVE_BTN);
    nextBtn.classList.add(INACTIVE_BTN);
    if (newState.current > 0) setupButton(newState, prevBtn, "prev");
    if (newState.current < appData.problems.length - 1)
      setupButton(newState, nextBtn, "next");
  });
  section.append(prevBtn, nextBtn);
  return section;
};

const setupButton = (state, target, move) => {
  target.classList.remove(INACTIVE_BTN);
  target.addEventListener("click", () => {
    if (move == "next") {
      router.navigateTo("problems", state.current + 1);
    }
    if (move == "prev") {
      router.navigateTo("problems", state.current - 1);
    }
  });
};
