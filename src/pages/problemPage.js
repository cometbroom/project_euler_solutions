import { setupNavigator } from "../components/navigator";
import { NAVIGATOR_QUERY } from "../constants";
import { appData } from "../data/data";
import createObservableState from "../lib/observableState";
import { createProblemElement } from "../views/problemView";

let state = createObservableState();
const props = {
  onKeyUp: inputKeyUpHandler,
};

const initProblemPage = (page = 0) => {
  if (page >= appData.problems.length) page = 0;
  const root = createProblemElement(state, props);
  setupNavigator(state);
  state.updateState({
    current: page,
    ...appData.problems[parseInt(page, 10)],
  });
  return root;
};

function inputKeyUpHandler() {
  const numValue = parseInt(this.value);
  if (typeof numValue === "number" && this.value > 0) {
    const _state = state.getState();
    _state.inputs[parseInt(this.id, 10)] = numValue;
    state.updateState(_state);
  }
}

export default initProblemPage;
