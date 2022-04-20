import { createElement } from "../tools/DOMCreate";

let currentProblem;

export const createProblemElement = (state, props) => {
  const element = document.createElement("div");

  const title = document.createElement("h2");
  currentProblem = state.getState();
  const inputs = createInputs(props.onKeyUp, state);
  const codeBlock = createCodeBlock();
  const result = document.createElement("h3");

  title.textContent = currentProblem.title;
  state.subscribe((newState) => {
    result.textContent = `Result: ${newState.result(...newState.inputs)}`;
  });
  result.textContent = `Result: ${currentProblem.result(
    ...currentProblem.inputs
  )}`;

  element.append(title, inputs, codeBlock, result);
  return element;
};

const createInputs = (onKeyUp, state) => {
  const divElement = document.createElement("div");
  divElement.classList.add("p-inputs");

  const inputsState = state.getState().inputs;

  for (let i = 0; i < inputsState.length; ++i) {
    const inputEl = createElement("input", {
      id: i,
      type: "text",
      value: inputsState[i],
    });

    inputEl.addEventListener("keyup", onKeyUp);
    divElement.appendChild(inputEl);
  }
  return divElement;
};

const createCodeBlock = () => {
  const element = document.createElement("pre");
  element.classList.add("prettyprint", "lang-js");

  element.textContent = currentProblem.result;
  return element;
};

export const updateResult = () => {
  result.innerHTML = `Result: ${currentProblem.result(
    ...currentProblem.inputs
  )}`;
};
