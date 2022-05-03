import gsap from "gsap";
import { INACTIVE_BTN, NAVIGATOR_QUERY, UI_QUERY } from "../constants";
import { appData } from "../data/data";
import router from "../lib/router";
import { currentPage } from "../pages/problemPage";
import { addQuestionAnimation } from "./animations";

//WN Write Jest testing for components and pages.

let alreadyCreated = false;
let _prevBtn;
let _nextBtn;
let _currentPagePure = null;

export const setupNavigator = (state) => {
  if (_currentPagePure === null) _currentPagePure = currentPage;
  setSectionElements();

  setInactive([_prevBtn, _nextBtn]);

  if (alreadyCreated) return;
  if (_currentPagePure > 0) setupButton(_prevBtn, "prev");
  if (_currentPagePure < appData.problems.length - 1)
    setupButton(_nextBtn, "next");
};

const setSectionElements = () => {
  const section = document.querySelector(NAVIGATOR_QUERY);
  [_prevBtn, _nextBtn] = section.querySelectorAll("button");
};

function setInactive(btns) {
  btns.forEach((btn) => {
    btn.classList.add(INACTIVE_BTN);
    btn.onclick = null;
  });
}

const setupButton = (target, move) => {
  target.classList.remove(INACTIVE_BTN);

  target.onclick = function () {
    switch (move) {
      case "next":
        if (_currentPagePure < appData.problems.length - 1) {
          _currentPagePure++;
          addQuestionAnimation("next", _currentPagePure);
        }
        break;
      case "prev":
        if (_currentPagePure > 0) {
          _currentPagePure--;
          addQuestionAnimation("prev", _currentPagePure);
        }
        break;
    }
  };
};
