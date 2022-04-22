import { INACTIVE_BTN, NAVIGATOR_QUERY } from "../constants";
import { appData } from "../data/data";
import router from "../lib/router";

export const setupNavigator = (state) => {
  const { section, prevBtn, nextBtn } = getSectionElements();

  const updateFcn = (newState) => {
    setInactive(prevBtn, nextBtn);
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
  nextBtn.classList.add(INACTIVE_BTN);
}

const setupButton = (state, target, move) => {
  target.classList.remove(INACTIVE_BTN);
  target.onclick = function () {
    if (move == "next") {
      router.navigateTo("problems", state.current + 1);
    }
    if (move == "prev") {
      router.navigateTo("problems", state.current - 1);
    }
  };
};
