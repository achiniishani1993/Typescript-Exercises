// Challenge (optional): Forcing a Rejection

const myPromise = new Promise((resolve, reject) => {
  console.log(`1. This executor function starts immediately`);

  const success = false;

  if (success) {
    resolve(`Resolved operation success`);
  } else {
    reject(`Operation failed`);
  }

  console.log(`2. Function has finished`);
});

// Pending: still waiting for a result. Waiting either success or fail
// Fulfilled: Completed successfully using resolve() then results will handle by the .then
// Rejected: The Promise failed using reject() and the error handle by the .catch

myPromise
  .then((message) => {
    console.log(message);
  })
  .catch((error) => { console.log(`Something went wrong: ${error}`);
  });
