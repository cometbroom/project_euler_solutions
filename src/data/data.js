import pSolvers from "./problemSolvers.js";

export const appData = {
  problems: [
    {
      title: (in1, in2, in3) =>
        `Sum of multiples of ${in1} and ${in2} until ${in3}`,
      inputs: [3, 5, 1000],
      result: pSolvers[0],
    },
    {
      title: (in1) => `Sum of even Fibonacci numbers smaller than ${in1}`,
      inputs: [4e6],
      result: pSolvers[1],
    },
    {
      title: (in1) => `Largest prime factor of ${in1}`,
      inputs: [600851475143],
      result: pSolvers[2],
    },
    {
      title: (in1) => `Largest palindrome from ${in1}-digit numbers`,
      inputs: [3],
      result: pSolvers[3],
    },
    {
      title: (in1) => `Smallest multiple of numbers from 1 to ${in1}`,
      inputs: [20],
      result: pSolvers[4],
    },
    {
      title: (in1) =>
        `The difference of sum of the squares and square of sum of the first ${in1} natural numbers`,
      inputs: [100],
      result: pSolvers[5],
    },
  ],
};
