// Your Own Promise

const checkStock = new Promise((resolve, reject) => {
  console.log(`inside stock`);
  const inStock = true;
  if (inStock) {
    resolve(`stock has`);
  } else {
    reject(`No stock`);
  }
});
console.log(`oustside stock`);
checkStock
  .then((message) => {
    console.log(message);
  })
  .catch((error) => {
    console.log(error);
  });

// inside stock
// oustside stock
// stock has

// why - The Promise executor runs first, so "inside stock" prints first, while .then() runs after the current code finishes, so "stock has" prints last
