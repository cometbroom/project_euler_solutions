import gsap from "../../snowpack/pkg/gsap.js";
import {
  INACTIVE_BTN,
  MAIN_QUERY,
  NAVIGATOR_QUERY,
  UI_QUERY,
} from "../constants.js";
import { appData } from "../data/data.js";
import router from "../lib/router.js";
import { currentPage } from "../pages/problemPage.js";
import { createElement } from "../tools/DOMCreate.js";
import { addQuestionAnimation } from "./animations.js";

//WN Write Jest testing for components and pages.

//Placeholders for our next and previous button elements
let _prevBtn;
let _nextBtn;

//Keep track of current page in navigator to avoid timeout delay
let _currentPagePure = null;

export const setupNavigator = () => {
  //
  if (_currentPagePure === null) _currentPagePure = currentPage;
  //Populate next and previous button elements
  setSectionElements();

  setInactive([_prevBtn, _nextBtn]);

  if (_currentPagePure > 0) setupButton(_prevBtn, "prev");
  if (_currentPagePure < appData.problems.length - 1)
    setupButton(_nextBtn, "next");
};

const setSectionElements = () => {
  let section = document.querySelector(NAVIGATOR_QUERY);
  if (section === null) {
    section = createNavigatorElements();
  }
  [_prevBtn, _nextBtn] = section.querySelectorAll("button");
};

const createNavigatorElements = () => {
  const main = document.querySelector(MAIN_QUERY);
  const section = createElement("section", { class: "navigator" });
  const btn1 = createElement("button", { content: "Previous" });
  const btn2 = createElement("button", { content: "Next" });
  section.append(btn1, btn2);
  main.appendChild(section);
  return section;
};

const setInactive = (btns) => {
  btns.forEach((btn) => {
    btn.classList.add(INACTIVE_BTN);
    btn.onclick = null;
  });
};

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
