// Array Processor with a Return Value


type ReduceCallback = (accumulator: number, current: number) => number;

function processNumbers(arr: number[], callback: ReduceCallback){
  let total = 0;

  for (let i = 0; i < arr.length; i++) {
    total = callback(total, arr[i]!);
  }

  return total;
}

const numbers = [20, 4, 55, 89, 11];

const result = processNumbers(numbers, (accumulator, current) => {
  return accumulator + current;
});

console.log(result);
