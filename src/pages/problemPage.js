import { appData } from "../data/data";
import createObservableState from "../lib/observableState";
import { createProblemElement } from "../views/problemView";

let state;
const props = {
  onKeyUp: inputKeyUpHandler,
};

const initProblemPage = (page = 0) => {
  if (page >= appData.problems.length) page = 0;
  state = createObservableState();
  const root = createProblemElement(state, props);
  state.updateState({
    current: page,
    ...appData.problems[page],
  });
  return { root };
};

function inputKeyUpHandler(e) {
  const numValue = parseInt(this.value);
  if (typeof numValue === "number" && this.value > 0) {
    const _state = state.getState();
    _state.inputs[parseInt(this.id, 10)] = numValue;
    state.updateState(_state);
  }
}

export default initProblemPage;
