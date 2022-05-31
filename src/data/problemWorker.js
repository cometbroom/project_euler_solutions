import pSolvers from "./problemSolvers";

onmessage = function (e) {
  const [message, target, values] = [e.data[0], e.data[1], e.data[2]];
  if (message == "problem") {
    this.postMessage(pSolvers[target](...values));
    return;
  }
};
