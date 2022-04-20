import { evenFibonacciNums, sumMultiplesOf3n5 } from "./problemSolvers";

export const appData = {
  problems: [
    {
      title: "Sum of multiples of 3 and 5 till 1000",
      inputs: [3, 5, 1000],
      result: sumMultiplesOf3n5,
    },
    {
      title: "Even Fibonacci numbers",
      inputs: [4e6],
      result: evenFibonacciNums,
    },
  ],
};
