const placeOrder = (item: string, callback: () => void) => {
  console.log(`Order Placed for ${item}`);
  callback();
};

placeOrder("Bag", () => {
  console.log("Thanks for your order!");
});
