// Skill 4: Generics ( <T> means reusable placeholder)

// Wrap It Up
// Write a generic arrow function wrapInArray<T>
// takes one item and returns it inside an array.
// Call it with a string and with a number. Log both results.

const wrapInArray = <T>(item: T): T[] => {
  return [item];
};

console.log(wrapInArray("cat"));
console.log(wrapInArray(4));

// First in Line

// Write a generic arrow function firstItem<T> 
// that takes an array and returns its first item.
// Test it with [1, 2, 3] and ["a", "b", "c"] . Log both results.

const firstItem = <T>(item: T[]): T => {
  return item[0];
};

console.log(firstItem([1,2,3]));
console.log(firstItem(["a","b","c"]));

// Challenge (optional) Swap Places

// Write a generic arrow function swap<T> 
// takes two items and returns them in reverse order inside an array
// Call it with two strings and two numbers. Log both results.

const swap = <T>(first: T, second: T): T[] => {
  return [second, first];
};

console.log(swap("hello", "world"));
console.log(swap(1, 2));