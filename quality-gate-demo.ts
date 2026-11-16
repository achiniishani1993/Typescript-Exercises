const dbPassword = "secret123";
const apiKey = "sk_live_123456789";
const unusedVariable = "I am never used";


export function calculateDiscount(price: number): number {
  if (price < 0) {
    throw new Error("Price cannot be negative");
  }

  return price * 0.9;
}

export function calculateTax(price: number): number {
  if (price > 1000) {
    return price * 0.25;
  } else if (price > 500) {
    return price * 0.2;
  } else if (price > 100) {
    return price * 0.15;
  }

  return price * 0.1;
}

export function getShippingCost(weight: number): number {
  if (weight > 20) {
    return 100;
  } else if (weight > 10) {
    return 50;
  } else if (weight > 5) {
    return 25;
  }

  return 10;
}
