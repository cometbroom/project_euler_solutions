import { appData } from "../data/data";
import solveProblem from "../helpers/solveProblem";
import state$ from "../state";
import createProblemView from "../views/problemView";

state$.updateState({ problems: appData.problems });

function createProblemPage(problemNum = "0") {
  problemNum = parseInt(problemNum, 10);

  //Default page if out of bound
  if (problemNum < 0 || problemNum >= state$.getState().problems.length) {
    router.navigateTo("main", 0);
  }
  const view = createProblemView();

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

export default createProblemPage;
