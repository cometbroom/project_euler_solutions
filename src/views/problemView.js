import { appData } from "../data/data";

const currentProblem = appData.problems[appData.currentProblem];
const resultParams = [];

export const createProblemElement = () => {
  const element = document.createElement("div");

  const title = document.createElement("h2");
  const inputs = createInputs(currentProblem.inputs.length);
  const codeBlock = createCodeBlock();
  const result = document.createElement("h3");
  title.textContent = currentProblem.title;
  result.textContent = `Result: ${currentProblem.result(...resultParams)}`;

  element.append(title, inputs, codeBlock, result);
  return element;
};

const createInputs = (amount) => {
  const divElement = document.createElement("div");

  for (let i = 0; i < amount; ++i) {
    const inputEl = document.createElement("input");
    inputEl.type = "text";
    resultParams.push(currentProblem.inputs[i]);
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
