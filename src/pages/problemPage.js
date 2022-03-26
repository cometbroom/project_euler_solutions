import { UI_QUERY } from "../constants";
import { createProblemElement } from "../views/problemView";

export const initProblemPage = () => {
    const ui = document.querySelector(UI_QUERY);

    ui.appendChild(createProblemElement());
};
