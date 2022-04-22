export const sleepFor = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const callNowAndAfter = (whatToDo, ms) => {
  whatToDo();
  sleepFor(ms).then(whatToDo);
};
