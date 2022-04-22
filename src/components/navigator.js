import gsap from "gsap";
import { sleepFor } from "../tools/sleep";
import { INACTIVE_BTN, NAVIGATOR_QUERY, UI_QUERY } from "../constants";
import { appData } from "../data/data";
import router from "../lib/router";

export const setupNavigator = (state) => {
  const { section, prevBtn, nextBtn } = getSectionElements();
  setInactive(prevBtn, nextBtn);

  const updateFcn = (newState) => {
    if (newState.current > 0) setupButton(newState, prevBtn, "prev");
    if (newState.current < appData.problems.length - 1)
      setupButton(newState, nextBtn, "next");
  };

  state.subscribe(updateFcn);
};

const getSectionElements = () => {
  const section = document.querySelector(NAVIGATOR_QUERY);
  const [prevBtn, nextBtn] = section.querySelectorAll("button");
  return { section, prevBtn, nextBtn };
};

function setInactive(prevBtn, nextBtn) {
  prevBtn.classList.add(INACTIVE_BTN);
  prevBtn.onclick = null;
  nextBtn.classList.add(INACTIVE_BTN);
  nextBtn.onclick = null;
}

const setupButton = (state, target, move) => {
  target.classList.remove(INACTIVE_BTN);
  target.onclick = function () {
    switch (move) {
      case "next":
        animate(state.current + 1, true);
        break;
      case "prev":
        animate(state.current - 1);
        break;
    }
  };
};
let timeoutId;

function animate(navTarget, next) {
  const duration = 0.4;
  const [left1, left2] = next ? ["-100%", "100%"] : ["100%", "-100%"];
  gsap.fromTo(
    UI_QUERY,
    { left: "0%", opacity: 1 },
    { left: left1, opacity: 0, duration }
  );
  router.navigateTo("problems", navTarget);
  clearTimeout(timeoutId);

  //Sleep for animation go duration then navigate to next page and do animation come
  timeoutId = setTimeout(() => {
    gsap.fromTo(
      UI_QUERY,
      { left: left2, opacity: 0 },
      { left: "0%", opacity: 1, duration }
    );
  }, duration * 1000 + 100);
}
