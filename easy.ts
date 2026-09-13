// Task 1: Coin Flip

const flipCoin = () => {
  return new Promise((resolve, reject) => {
    const outcome = Math.random() > 0.5;
    outcome ? resolve("You win!") : reject("You lose!");
  });
};

const finalOutput = async () => {
  try {
    const results = await flipCoin();
    console.log(results);
  } catch (error) {
    console.log(error);
  }
};

finalOutput();

// Task 2: Resolve or Reject

const myPromise = new Promise((resolve, reject) => {
  const success = true;
  if (success) {
    resolve("Resolved operation successfully!");
  } else {
    reject("Resolved operation rejected!");
  }
});

const output = async () => {
  try {
    const message = await myPromise;
    console.log(message);
  } catch (error) {
    console.log("rejected reason:", error);
  }
};

output();

// Task 3: Delayed Message

const delayedMessage = (message: string, delay: number) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(message);
    }, delay);
  });
};

const delay = async () => {
  try {
    const outcome = await delayedMessage(
      "Hi Im Achini thank you for waiting",
      3000,
    );
    console.log(outcome);
  } catch (error) {
    console.log(error);
  }
};

delay();
