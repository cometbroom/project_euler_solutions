import hljs from "highlight.js/lib/core";
import javascript from "highlight.js/lib/languages/javascript";
import { createElement } from "../tools/DOMCreate";

hljs.registerLanguage("javascript", javascript);

function createAlgorithmView() {
  const { root, result, elapsed, ...children } = createElStructure();
  root.append(...Object.values(children));

  const { codeBlock, title } = children;

  const update = (state) => {
    const problem = state.problems[state.problemNum];
    title.textContent = `Problem ${state.problemNum + 1}: ${problem.title(
      ...problem.inputs
    )}`;

    codeBlock.textContent = problem.result.toString();
    hljs.highlightElement(codeBlock);

    result.textContent = `Result: ${state.result}`;
    elapsed.textContent = `Calculated in: ${state.elapsed} ms`;
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

export default createAlgorithmView;
