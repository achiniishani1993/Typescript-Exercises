// Skill 3: Enums (fixed list of options)

// Color Picker

// Create an enum Color
// Write an arrow function called showColor
// returns a string like: "You chose Red"

// Call the function with each of the three colors and log the results.

enum Color {
 Red = "red",
 Green = "green",
 Blue = "blue",
}

const showColor = (color:Color) => {
 return `You chose ${color}`;
};

console.log(showColor(Color.Red)); 
console.log(showColor(Color.Green)); 
console.log(showColor(Color.Blue)); 

// Pizza Order

// Create an enum PizzaSize
// Write an arrow function called orderPizza
// returns a string like: "You ordered a Medium pizza."
// Call the function with all three sizes and log the results.

enum PizzaSize {
    Small = "small",
    Medium = "medium",
    Large = "Large",
}

const orderPizza = (pizza:PizzaSize) => {
return `You ordered a ${pizza} pizza`;
};

console.log(orderPizza(PizzaSize.Small)); 
console.log(orderPizza(PizzaSize.Medium)); 
console.log(orderPizza(PizzaSize.Large)); 

// Challenge (optional) Role-Based Access

// Create an enum Role
// Write an arrow function called printRole
// using a switch statement, returns:
// Admin → "You have full access"
// User → "You have limited access"
// Guest → "You have guest access"
// Call the function with all three roles and log the results.

enum Role {
     Admin = "admin",
     User = "user",
     Guest = "guest",
}

const printRole = (role:Role) => {
switch(role){
   case Role.Admin:
      return "You have full access";
      
    case Role.User:
      return "You have limited access";

    case Role.Guest:
      return "You have guest access";
}

};

console.log(printRole(Role.Admin));
console.log(printRole(Role.User));
console.log(printRole(Role.Guest));