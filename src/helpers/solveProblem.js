import state$ from "../state.js";

const workerList = [];

function solveProblem() {
  clearThreads();
  const solverProcess = new Worker("src/data/problemWorker.js", {
    type: "module",
  });

  state$.updateState({ loading: true });
  const state = state$.getState();
  const { inputs } = state.problems[state.problemNum];

  //Inquiry to our worker
  solverProcess.postMessage(["problem", state.problemNum, inputs]);
  const startTimer = Date.now();

  //Process DOM after our worker is done
  solverProcess.onmessage = (e) => {
    state$.updateState({
      result: e.data,
      elapsed: Date.now() - startTimer,
      loading: false,
      timeout: false,
    });
    clearTimeout(
      workerList.find((worker) => worker.thread == solverProcess).timer
    );
    solverProcess.terminate();
  };
  const timer = setTimeout(() => {
    state$.updateState({
      result: 0,
      loading: false,
      timeout: true,
    });
  }, 5000);
  workerList.push({ thread: solverProcess, timer });
}

function clearThreads() {
  workerList.forEach((worker, index) => {
    worker.thread.terminate();
    clearTimeout(worker.timer);
    worker = null;
    workerList.splice(index, 1);
  });
}

export default solveProblem;
