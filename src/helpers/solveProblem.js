import state$ from "../state.js";

const workerList = [];

function solveProblem() {
  clearThreads();
  const solverProcess = new Worker("src/data/problemWorker.js", {
    type: "module",
  });

  const state = state$.getState();
  const { inputs } = state.problems[state.problemNum];

  //Inquiry to our worker
  solverProcess.postMessage(["problem", state.problemNum, inputs]);
  const startTimer = Date.now();

  let timerId;

  //Process DOM after our worker is done
  solverProcess.onmessage = (e) => {
    state$.updateState({
      result: e.data,
      elapsed: Date.now() - startTimer,
      loading: false,
      timeout: false,
    });
    clearTimeout(timerId);
    solverProcess.terminate();
  };
  workerList.push(solverProcess);
  timerId = setTimeout(() => {
    clearThreads();
    state$.updateState({
      result: 0,
      loading: false,
      timeout: true,
    });
  }, 5000);
}

function clearThreads() {
  workerList.forEach((worker, index) => {
    worker.terminate();
    worker = null;
    workerList.splice(index, 1);
  });
}

export default solveProblem;
