import { createElement } from "../tools/DOMCreate";

export const createProblemElement = (state, props) => {
  const { root, ...children } = createElStructure();

  const updateState = (newState) => {
    updateView(children, props, newState);
  };

  root.append(...Object.values(children));

  state.subscribe(updateState);
  return {
    root,
    pageWillUnload: () => {
      state.unsubscribe(updateState);
    },
  };
};

function createElStructure() {
  const root = createElement("div");
  const title = createElement("h2");
  const inputs = createElement("div", { class: "p-inputs" });
  const codeBlock = createElement("pre", {
    classes: ["prettyprint", "lang-js"],
  });
  const result = createElement("h3");
  return { root, title, inputs, codeBlock, result };
}

const updateView = (elements, props, newState) => {
  elements.title.textContent = `Problem ${newState.current}: ${newState.title(
    ...newState.inputs
  )}`;
  assignInputs(elements.inputs, props.onKeyUp, newState);
  assignCodeBlock(elements.codeBlock, newState);
  elements.result.textContent = `Result: ${newState.result(
    ...newState.inputs
  )}`;
};

const assignInputs = (target, inputChange, state) => {
  const inputsState = state.inputs;
  for (let i = 0; i < inputsState.length; ++i) {
    const inputEl = document.getElementById(`${i} input`);
    if (!inputEl)
      createInput(`${i} input`, "text", inputsState[i], target, inputChange);
    else inputEl.value = inputsState[i];
    if (!target.hasChildNodes()) target.appendChild(inputEl);
  }
};

const createInput = (id, type, value, appendTarget, inputChange) => {
  const input = createElement("input", { id, type, value });
  input.addEventListener("input", inputChange);
  appendTarget.appendChild(input);
};

const assignCodeBlock = (target, state) => {
  target.textContent = state.result;
};
