// Skill 2: Interfaces & Type Aliases ( & means AND)

// Book Interface

// Define an interface
// Create one Book object and write an arrow function
//  returns a string like: "The book Dune has 412 pages.

interface Book {
  title: string;
  pages: number;
}

const book: Book = {
  title: "Harry Poter",
  pages: 60,
};

const describeBook = (book: Book) => {
  return `The book ${book.title} has ${book.pages} pages.`;
};

console.log(describeBook(book));

// Combining Interfaces

// Create two interfaces
// Create a type alias SchoolTeacher that combines Teacher AND Employee using &
// Create one SchoolTeacher object and write an arrow function called printTeacherInfo that logs all four
// properties in a readable sentence.

interface Teacher {
  name: string;
  subject: string;
}

interface Employee {
  id: number;
  email: string;
}

type SchoolTeacher = Teacher & Employee;

const schoolTeacher: SchoolTeacher = {
  name: "Michiel",
  subject: "backend utveckling",
  id: 120,
  email: "michiel@gmail.com",
};


// In this printTeacherInfo function, void is used because only logging the information, not returning 

const printTeacherInfo = (schoolTeacher: SchoolTeacher):void => {
  console.log (`${schoolTeacher.name} is teaching ${schoolTeacher.subject} at sundsgarden school, his id is ${schoolTeacher.id} and email is ${schoolTeacher.email}.`);
};

printTeacherInfo(schoolTeacher);

// Challenge (optional) Favorite Car

// Define an interface Car
// Write an arrow function called printCar
// returns a string like: "Brand: Toyota, Year: 2022"
// Call the function with your favorite car and log the result.

interface Car {
    brand: string;
    year: number;
};
const favoriteCar: Car = {
  brand: "Toyota",
  year: 2022
};

const printCar = (favcar:Car) => {
return ` Brand: ${favcar.brand}, Year: ${favcar.year}`;
};



console.log(printCar(favoriteCar));