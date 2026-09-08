//  Callback with Multiple Parameters
type CompareCallback = (a: number, b: number) => string;
const compareNumbers = (a: number, b: number, callback: CompareCallback) => {
return callback (a,b);
};

const res1 = compareNumbers(10, 5, (a, b) => {
  if (a > b) return "a is bigger";
  if (b > a) return "b is bigger";
  return "equal";
});
console.log(res1)

const res2 = compareNumbers(10, 5, (a, b) => {
  return String(a - b);
});
console.log(res2)

console.log(typeof res2);