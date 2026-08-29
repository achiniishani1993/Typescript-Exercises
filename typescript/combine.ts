// Skill 4: Chaining Array Methods on Interface Data

// Filter Only
//id , name , price , tags
interface Product {
  id: number;
  name: string;
  price: number;
 tags: string[];
}

// create an array of at least 5 products

const products: Product[] = [
  { id: 1, name: "lipstick", price: 500, tags: ["beauty"] },
  { id: 2, name: "Bike toy", price: 700, tags: ["toy item" ]},
  { id: 3, name: "Piano", price: 5500, tags: ["instrument", "work"] },
  { id: 4, name: "Cream", price: 600, tags: ["beauty"] },
  { id: 4, name: "Tv", price: 8600, tags: ["electronic", "work"] },
];

// filter products priced under 1000. Log the result.

const cheepProducs = products.filter((p) => p.price < 1000);

console.log(cheepProducs);

// Filter + Map


const workProducts = products
  .filter((p) => p.tags.includes("work"))
  .map((p) => p.name);

console.log(workProducts);

// Challenge (optional) Filter + Map + Join

// Example from the class
/* const expensiveProducts = products
  .filter((p) => p.price > 900)
  .map((p) => p.name)
  .join(", ");

console.log("expensive Products:", expensiveProducts); */

const multiProducts = products
  .filter((p) => p.tags.length > 1)
  .map((p) => `${p.name} (${p.price})`)
  .join(", ");
 
console.log(`Multi tage:`, multiProducts );