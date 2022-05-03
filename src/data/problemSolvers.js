const sumMultiplesOf3n5 = function (in1, in2, in3) {
  let result = 0;
  //Keep track of our initial inputs
  const in1Start = in1;
  const in2Start = in2;

  //Add multiple to result while it's smaller than our limit
  while (in1 < in3) {
    result += in1;
    //get next level of multiple 3, 6, 9 etc...
    in1 += in1Start;
  }

  //Same for our second multiple
  while (in2 < in3) {
    //Don't add if it's a multiple of our first multiple
    in2 % in1Start !== 0 && (result += in2);
    in2 += in2Start;
  }
  return result;
};

const evenFibonacciNums = function (in1) {
  let [x, y, temp, total] = [1, 1, 0, 0];

  do {
    //If fibonacci number is even add to total.
    if (x % 2 === 0) total += x;
    //Get our current number to add the previous number to it
    temp = x;
    x += y;
    //Make current our previous to keep moving
    y = temp;
  } while (x < in1);
  return total;
};

const largestPrimeFactor = function (in1) {
  //We only to to search until the square root to find prime factor
  const getSearchMax = (num) => Math.ceil(Math.sqrt(num));

  const isPrime = (num) => {
    //To see prime we can start from 2 and divide with all smaller numbers
    //until square root
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
  //for 999 check until 100 then 998 etc...
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
