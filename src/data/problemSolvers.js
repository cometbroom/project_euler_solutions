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
  //We only have to search until the square root to find prime factor
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

const largestPalindromeProduct = function (digits) {
  let largest = 0;

  //Our minimum and maximum value taken by counting digits. 3 would get 100 to 999.
  const [min, max] = [Math.pow(10, digits - 1), Math.pow(10, digits) - 1];
  //for 999 check until 100 then 998 check until 100 etc...
  //this is until I find a faster algorithm
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


const smallestMultipleNum = function (in1) {
  //Find prime factors of our number
  function primeFactors(number) {
    const factors = [];
    let divisor = 2;

    //While bigger than 2, keep dividing by relevant divisor and pushing factor
    while (number >= 2) {
      if (number % divisor === 0) {
        factors.push(divisor);
        number = number / divisor;
      } else divisor++;
    }
    return factors;
  }

  //Have a set of divisors for unique numbers
  const factors = new Set();

  //Find factors of numbers up to our target
  for (let i = 2; i <= in1; ++i) {
    primeFactors(i).forEach((factor) => factors.add(factor));
  }

  //Our result needs to be multiplied by greatest power of factors
  let result = 1;
  factors.forEach((factor) => {
    //While square of factor is smaller than our input, keep squaring to get greatest power
    //So for example 2 would get 16 when input is 20 as 32 becomes greater
    const factorPrevious = factor;
    while (factor * factorPrevious <= in1) factor *= factorPrevious;
    //Multiply our greatest power to the result
    result *= factor;
  });
  return result;
};

const sumSquareDifference = function (upperBound) {
  let sumSquare = 0;
  let squareSum = 0;
  //Calculate everything in one loop for maximum speed.
  for (let i = 1, j = 1; i <= upperBound; ++i, ++j) {
    sumSquare += j;
    squareSum += Math.pow(i, 2);
  }
  return Math.pow(sumSquare, 2) - squareSum;
};

export default [
  sumMultiplesOf3n5,
  evenFibonacciNums,
  largestPrimeFactor,
  largestPalindromeProduct,
  smallestMultipleNum,
  sumSquareDifference,
];
