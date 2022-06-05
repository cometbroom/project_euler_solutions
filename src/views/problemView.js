import hljs from "highlight.js/lib/core";
import javascript from "highlight.js/lib/languages/javascript";
import { numberStaggerAnimation } from "../components/staggerAnim";
import { createElement } from "../tools/DOMCreate";

hljs.registerLanguage("javascript", javascript);

function createProblemView(props) {
  const { root, result, elapsed, ...children } = createElStructure();
  root.append(...Object.values(children));

  const { codeBlock, title, inputs } = children;

  const update = (state) => {
    const problem = state.problems[state.problemNum];
    title.textContent = `Problem ${state.problemNum + 1}: ${problem.title(
      ...problem.inputs
    )}`;
    //Add out inputs according to our state and add event listeners
    assignInputs(inputs, props.inputKeyUp, problem);

    codeBlock.textContent = problem.result.toString();
    hljs.highlightElement(codeBlock);

    result.textContent = `Result: ${state.result}`;
    // elapsed.textContent = `Calculated in: ${state.elapsed} ms`;
    elapsed.textContent = state.elapsed;
    numberStaggerAnimation(elapsed, state.elapsed);
    if (state.loading) elapsed.textContent = `Loading...`;
    if (state.timeout) elapsed.textContent = `Timeout.`;
    if (state.elapsed < 200) elapsed.style.color = "rgb(18, 194, 27)";
    else {
      const [hslMax, bounder] = [30, 1000];
      const timeToHslDeg = hslMax - state.elapsed / bounder;
      if (timeToHslDeg < 0) elapsed.style.color = "red";
      else elapsed.style.color = `hsl(${timeToHslDeg}, 100%, 50%)`;
    }
  };

  return { root, update };
}

const assignInputs = (target, inputChange, problem) => {
  const inputs = problem.inputs;
  //Go through inputs and see if we can find by id, if not then they need to be created.
  for (let i = 0; i < inputs.length; ++i) {
    const inputEl = document.getElementById(`${i} input`);
    if (!inputEl)
      createInput(`${i} input`, "number", inputs[i], target, inputChange);
    else inputEl.value = inputs[i];
    //Don't append if we already have inputs
    if (!target.hasChildNodes()) target.appendChild(inputEl);
  }
};

const createInput = (id, type, value, appendTarget, inputChange) => {
  //Create input element with id type and value
  const input = createElement("input", { id, type, value });
  input.addEventListener("input", inputChange);
  appendTarget.appendChild(input);
};

function createElStructure() {
  const root = createElement("div", { class: "problem-view" });
  const title = createElement("h2");
  const inputs = createElement("div", { class: "p-inputs" });
  const codeBlock = createElement("pre", { classes: ["language-javascript"] });
  const resultContainer = createElement("div", { class: "result-display" });
  const result = createElement("h3", { content: `Result: ...` });
  const elapsed = createElement("h4", {
    content: `Calculated in: ...`,
  });
  resultContainer.append(result, elapsed);

  return { root, title, inputs, codeBlock, resultContainer, result, elapsed };
}

export default createProblemView;
