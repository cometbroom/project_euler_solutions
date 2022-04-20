import { appData } from "../data/data";
import createObservableState from "../lib/observableState";
import { createProblemElement } from "../views/problemView";

let state;
const props = {
  onKeyUp: inputKeyUpHandler,
};

const initProblemPage = () => {
  state = createObservableState({
    ...appData.problems[0],
  });

  const root = createProblemElement(state, props);
  return { root };
};

function inputKeyUpHandler(e) {
  const numValue = parseInt(this.value);
  if (typeof numValue === "number" && this.value > 0) {
    const _state = state.getState();
    _state.inputs[this.id] = numValue;
    state.updateState(_state);
  }
}

export default initProblemPage;
