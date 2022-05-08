import { appData } from "../data/data";
import solveProblem from "../helpers/solveProblem";
import state$ from "../state";
import createAlgorithmView from "../views/problemView";

state$.updateState({ problems: appData.problems });

function createProblemPage(problemNum = "0") {
  problemNum = parseInt(problemNum, 10);

  //Default page if out of bound
  if (problemNum < 0 || problemNum >= state$.getState().problems.length) {
    router.navigateTo("main", 0);
  }
  const view = createAlgorithmView();

  const pageDidLoad = () => {
    state$.subscribe(view.update);
    state$.updateState({ problemNum: problemNum });
    new Promise((resolve) => {
      setTimeout(resolve, 2000);
    }).then(() => state$.updateState({ animation: "end" }));
    solveProblem();
  };

  const pageWillUnload = () => {
    state$.unsubscribe(view.update);
  };

  return { root: view.root, pageDidLoad, pageWillUnload };
}

export default createProblemPage;
