export const sumMultiplesOf3n5 = (in1, in2, in3) => {
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

export const evenFibonacciNums = (in1) => {
  let [x, y, temp, total] = [1, 1, 0, 0];

  do {
    if (x % 2 === 0) total += x;
    temp = x;
    x += y;
    y = temp;
  } while (x < in1);
  return total;
};
