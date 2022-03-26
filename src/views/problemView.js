import { appData } from "../data/data";

const currentProblem = appData.problems[appData.currentProblem];
const result = document.createElement("h3");

export const createProblemElement = () => {
  const element = document.createElement("div");

  const title = document.createElement("h2");
  const inputs = createInputs(currentProblem.inputs.length);
  const codeBlock = createCodeBlock();
  title.textContent = currentProblem.title;
  result.textContent = `Result: ${currentProblem.result(
    ...currentProblem.inputs
  )}`;

  element.append(title, inputs, codeBlock, result);
  return element;
};

const createInputs = (amount) => {
  const divElement = document.createElement("div");
  divElement.classList.add("p-inputs");

  for (let i = 0; i < amount; ++i) {
    const inputEl = document.createElement("input");
    inputEl.type = "text";
    inputEl.value = currentProblem.inputs[i];
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
