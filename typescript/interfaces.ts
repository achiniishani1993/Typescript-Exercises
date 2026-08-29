// Skill 3: Interfaces

// Book Interface

interface Book {
    title: string;
    author: string;
    pages: number;
}

const book:Book = {
    title: "The Rock",
    author: "Peter Axy",
    pages: 100

}; 

console.log(book.title);

// Nested & Optional Properties

interface Address {
    city: string;
    postalCode?: string;

}

interface Person {
    name: string;
    age: number;
    address: Address;
}

const personOne: Person = {
    name: "Andry John",
    age: 30,
    address: {
        city: "Perstorp",
        postalCode: "25688"
    }
};

const personTwo: Person = {
    name: "Micheal Jackson",
    age: 50,
    address: {
        city: "New York",
    }
};

console.log(personOne.address.city);
console.log(personTwo.address.city);

// Challenge (optional) Interface with a Typed Function

interface Movie {
    id: number;
    title: string;
    rating: number;
    genres: string[];
}
// Create an array
const movies: Movie[] = [
    {  id: 1, title: "Michael" , rating: 7.4, genres: ["music", "drama", "biography"] },
    {  id: 2, title: "The crown" , rating: 8.6, genres: ["political ", "drama", "biography"] },
     {  id: 3, title: "Monster" , rating: 7.7, genres: ["horror ", "thriller", "biography" , "true crime"] },
      {  id: 3, title: "Sune's Summer" , rating: 7, genres: ["family", "commedy", "romance" ] },
];

// Write a function
function getMoviesByGenre(movies: Movie[], genres: string): Movie[] {
    return movies.filter(m => m.genres.includes(genres));
};

const matchMovies = getMoviesByGenre(movies, "drama");
//console.log(matchMovies)
console.log(matchMovies.map(m => m.title));