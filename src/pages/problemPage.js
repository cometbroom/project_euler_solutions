import { INPUTS_QUERY, UI_QUERY } from "../constants";
import { appData } from "../data/data";
import { createProblemElement, updateResult } from "../views/problemView";

const currentProblem = appData.problems[appData.currentProblem];

export const initProblemPage = () => {
  const ui = document.querySelector(UI_QUERY);

  ui.appendChild(createProblemElement());

  const pInputs = ui.querySelectorAll(INPUTS_QUERY);
  addInputEvents(pInputs);
};

const addInputEvents = (inputsList) => {
  for (let i = 0; i < inputsList.length; ++i) {
    inputsList[i].addEventListener("keyup", function (e) {
      const numValue = parseInt(this.value);
      if (typeof numValue === "number" && this.value > 0) {
        currentProblem.inputs[i] = numValue;
        updateResult();
      }
    });
  }
};
