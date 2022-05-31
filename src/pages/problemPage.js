import { appData } from "../data/data.js";
import solveProblem from "../helpers/solveProblem.js";
import state$ from "../state.js";
import createProblemView from "../views/problemView.js";

state$.updateState({ problems: appData.problems });

const props = {
  inputKeyUp: inputKeyUpHandler,
};

function createProblemPage(problemNum = "0") {
  problemNum = parseInt(problemNum, 10);

  //Default page if out of bound
  if (problemNum < 0 || problemNum >= state$.getState().problems.length) {
    router.navigateTo("main", 0);
  }
  const view = createProblemView(props);

  const pageDidLoad = () => {
    state$.subscribe(view.update);
    state$.updateState({ problemNum: problemNum });
    solveProblem();
  };

  const pageWillUnload = () => {
    state$.unsubscribe(view.update);
  };

  return { root: view.root, pageDidLoad, pageWillUnload };
}

function inputKeyUpHandler() {
  let timeoutId;
  clearTimeout(timeoutId);
  if (parseInt(this.value) < 0) this.value = 0;
  //Timeout to calculate only after 600 ms delay
  timeoutId = setTimeout(() => {
    const numValue = parseInt(this.value);
    //Check our input
    if (typeof numValue === "number" && this.value > 0) {
      const state = state$.getState();
      const currentProblem = state.problems[state.problemNum];
      const inputs = state.inputs || currentProblem.inputs;

      //Add the number to inputs in the state
      inputs[parseInt(this.id, 10)] = numValue;

      //Update state to refresh displays
      state$.updateState({ inputs, loading: true });
      solveProblem();
    }
  }, 600);
}

export default createProblemPage;
