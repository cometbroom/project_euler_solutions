const INACTIVE_BTN = "inactive-btn";
import { createElement } from "../tools/DOMCreate.js";

function createNavigatorView(props) {
  const section = createElement("section", { class: "navigator" });
  const prevButton = createElement("button", { content: "Previous" });
  const nextButton = createElement("button", { content: "Next" });
  section.append(prevButton, nextButton);

  prevButton.addEventListener("click", props.onPrevClick);
  nextButton.addEventListener("click", props.onNextClick);

  const update = (state) => {
    if (state.problemNum <= 0) {
      prevButton.classList.add(INACTIVE_BTN);
    } else {
      prevButton.classList.remove(INACTIVE_BTN);
    }

    if (state.problemNum >= state.problems.length - 1) {
      nextButton.classList.add(INACTIVE_BTN);
    } else {
      nextButton.classList.remove(INACTIVE_BTN);
    }
  };

  return { root: section, update };
}

export default createNavigatorView;
