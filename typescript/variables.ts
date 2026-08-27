// Skill 1: Typed Variables & Functions
// Student Profile
// Declare three variables 
// write an arrow function called describeStudent 
// Log the result to the console.

let firstName : string = "Achini";
let age : number = 32;
let isEnrolled : boolean = true;

const describeStudent = (firstName:string, age:number) => {
return `${firstName} is ${age} years old.`;
};

console.log(describeStudent(firstName,age));

// Greeting with Options
// Write an arrow function called formatGreeting

const formatGreeting = ( firstName:string, formal?: boolean) =>{
if (formal){
return `Good Day ${firstName}`;
}else {
   return `Hi ${firstName}`;
}
};

console.log(formatGreeting(firstName, isEnrolled));
console.log (formatGreeting(firstName));