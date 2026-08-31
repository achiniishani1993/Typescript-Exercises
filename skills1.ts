// Skill 1: Union Types ( | means OR)
// First task
// Create a type called IDType number or string
// Write an arrow function called showID
//  returns a string like: "Your ID is: 12345" or "Your ID
// is: AB123"

type IDType = number | string; 

const showID = (code: IDType) => {
return(`Your Id is: ${code}`);
}

console.log(showID(1234));

console.log(showID("ABC1234"));


// Second task -Fruit Basket

// Create a type Fruit
// Write an arrow function called eatFruit
// returns a string like: "You ate an apple."
// log both results apple and organge 

type Fruit = "Orange" | "Banana" | "Apple";

const eatFruit = (fru: Fruit)=>{
return (`You ate an ${fru}` )
}

console.log(eatFruit("Apple"));
console.log(eatFruit("Orange"));

// Third task- Challenge (optional) Pass or Fail

// Create a type Result- true or false
// Write an arrow function called printResult
//  returns "Pass" if true , and "Fail" if false.
// Call the function with both values and log the results.

type Result = true | false;

const printResult = (code : Result) => {
if (code === true ) {
     return "Pass";
    }else {
        return "Fail";
    };
};

console.log(printResult(true));
console.log(printResult(false));

// another way to do this 

const secondPrintResult = (code : Result) => {
return code ? "Pass" : "Fail";
};

console.log(printResult(true));
console.log(printResult(false));