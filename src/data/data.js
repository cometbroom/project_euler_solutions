import {
  evenFibonacciNums,
  largestPrimeFactor,
  sumMultiplesOf3n5,
} from "./problemSolvers";

export const appData = {
  problems: [
    {
      title: (in1, in2, in3) =>
        `Sum of multiples of ${in1} and ${in2} until ${in3}`,
      inputs: [3, 5, 1000],
      result: sumMultiplesOf3n5,
    },
    {
      title: (in1) => `Sum of even Fibonacci numbers smaller than ${in1}`,
      inputs: [4e6],
      result: evenFibonacciNums,
    },
    {
      title: (in1) => `Largest prime factor of ${in1}`,
      inputs: [600851475143],
      result: largestPrimeFactor,
    },
  ],
};
