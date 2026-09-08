// Delayed Greeting

const delayedGreeting = (name: string, delay: number, callback: () => void) => {
  setTimeout(() => {
    console.log(`Hi ${name}, thanks for waiting!`);
    callback();
  }, delay);
};

delayedGreeting("Achini", 1500, () => {
  console.log("Callback executed!");
});
