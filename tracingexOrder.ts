// Tracing Execution Order

const myPromise = new Promise((resolve, reject) => {
  console.log(`1.This exe function starts immediately`);
  const success = true;
  if (success) {
    resolve(`Resolved operation success`);
  } else {
    reject(`Resolved operation failed`);
  }
  console.log(`function has finished`)
});


myPromise
  .then((message) => {
    console.log(message);
  })
  .catch((error) => {
    console.log(error);
  });

  console.log("New log");

//   I think my log will print before resolved operation success because .then() callback runs asynchronously

// 1.This exe function starts immediately
// function has finished
// New log
// Resolved operation success