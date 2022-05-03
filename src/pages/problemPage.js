import { setupNavigator } from "../components/navigator";
import { appData } from "../data/data";
import createObservableState from "../lib/observableState";
import { C_TYPE } from "../tools/checkType";
import { createProblemElement } from "../views/problemView";

let state = createObservableState();
const props = {
  onKeyUp: inputKeyUpHandler,
};

//let other modules know the current page
export let currentPage = 0;

const initProblemPage = function (urlPage = 0) {
  //Take page from url as integer
  currentPage = parseInt(urlPage, 10);

  //If out of limit reset to first page
  if (urlPage >= appData.problems.length) urlPage = 0;
  if (C_TYPE.isString(urlPage)) urlPage = parseInt(urlPage, 10);
  const root = stateIntoView(state, urlPage);
  return root;
};

const stateIntoView = (state, page) => {
  const view = createProblemElement(state, props);

  //Setup our navigator with state
  setupNavigator(state);
  state.updateState({
    current: page,
    ...appData.problems[page],
  });
  return view;
};

function inputKeyUpHandler() {
  let timeoutId;
  clearTimeout(timeoutId);
  //Timeout to calculate only after 600 ms delay
  timeoutId = setTimeout(() => {
    const numValue = parseInt(this.value);
    //Check our input
    if (typeof numValue === "number" && this.value > 0) {
      const _state = state.getState();

      //Add the number to inputs in the state
      _state.inputs[parseInt(this.id, 10)] = numValue;

      //Update state to refresh displays
      state.updateState(_state);
    }
  }, 600);
}

export default initProblemPage;
