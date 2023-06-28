const numbers = [1, 2, 3, /*...*/, 100];
const n = 100; // Total numbers from 1 to 100

function findMissingNumber(numbers, n) {
  const sum = numbers.reduce((acc, curr) => acc + curr, 0);
  const expectedSum = (n * (n + 1)) / 2;
  return expectedSum - sum;
}

const missingNumber = findMissingNumber(numbers, n);
console.log('Missing number:', missingNumber);
