const largestPalindromeProduct = () => {
  let largest = 0;
  const [min, max] = [100, 999];
  let minJ = max - 100;
  for (let i = max; i >= min; --i) {
    for (let j = max; j >= minJ; --j) {
      let solution = i * j;
      let reversedSolution = parseInt(
        solution.toString().split("").reverse().join(""),
        10
      );
      if (reversedSolution == solution && solution > largest)
        largest = solution;
    }
  }
  console.log(largest);
};

largestPalindromeProduct();
