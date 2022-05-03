const sumMultiplesOf3n5 = function (in1, in2, in3) {
  let result = 0;
  const in1Start = in1;
  const in2Start = in2;

  while (in1 < in3) {
    result += in1;
    in1 += in1Start;
  }

  while (in2 < in3) {
    in2 % in1Start !== 0 && (result += in2);
    in2 += in2Start;
  }
  return result;
};

const evenFibonacciNums = function (in1) {
  let [x, y, temp, total] = [1, 1, 0, 0];

  do {
    if (x % 2 === 0) total += x;
    temp = x;
    x += y;
    y = temp;
  } while (x < in1);
  return total;
};

const largestPrimeFactor = function (in1) {
  const getSearchMax = (num) => Math.ceil(Math.sqrt(num));

  const isPrime = (num) => {
    for (let i = 2; i <= getSearchMax(num); ++i) {
      if (num % i === 0) return false;
    }
    return true;
  };

  //Backwards search to save iterations.
  for (let i = getSearchMax(in1); i >= 3; --i) {
    if (in1 % i === 0 && isPrime(i)) return i;
  }
  return -1;
};

const largestPalindromeProduct = function () {
  let largest = 0;

  //Our minimum and maximum value for brute solving 3 digits.
  const [min, max] = [100, 999];
  for (let i = max; i >= min; --i) {
    for (let j = max; j >= min; --j) {
      let solution = i * j;
      let reversedSolution = parseInt(
        solution.toString().split("").reverse().join(""),
        10
      );
      //Filter the maximum
      if (reversedSolution == solution && solution > largest)
        largest = solution;
    }
  }
  return largest;
};

export default [
  sumMultiplesOf3n5,
  evenFibonacciNums,
  largestPrimeFactor,
  largestPalindromeProduct,
];
