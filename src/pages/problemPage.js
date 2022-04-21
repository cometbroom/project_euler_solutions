import { setupNavigator } from "../components/navigator";
import { appData } from "../data/data";
import createObservableState from "../lib/observableState";
import { createProblemElement } from "../views/problemView";

let state = createObservableState();
const props = {
  onKeyUp: inputKeyUpHandler,
};

const initProblemPage = (urlPage = 0) => {
  if (urlPage >= appData.problems.length) urlPage = 0;
  const root = stateIntoView(state, urlPage);
  return root;
};

const stateIntoView = (state, page) => {
  const view = createProblemElement(state, props);
  setupNavigator(state);
  state.updateState({
    current: page,
    ...appData.problems[parseInt(page, 10)],
  });
  return view;
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
