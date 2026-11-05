import { describe, test, expect } from "vitest";
import { createPizza, orderPizza, sendOrder, chargeCustomer} from "./pizzashop";

describe("Pizza Shop Unit Tests", () => {
  test("createPizza returns correct type and price", () => {
    const pizza = createPizza("margherita");

    expect(pizza).toEqual({ type: "margherita", price: 100 });
  });

  test("createPizza throws for unknown type", () => {
    expect(() => createPizza("hawaii")).toThrow();
  });

  test("sendOrder returns a numeric order id", () => {
    const id = sendOrder({ type: "pepperoni", price: 120 });

    expect(typeof id).toBe("number");
    expect(Number.isInteger(id)).toBe(true);
    expect(id).toBeGreaterThanOrEqual(0);
    expect(id).toBeLessThan(1000);
  });

  test("orderPizza returns true for a valid pizza", () => {
    const result = orderPizza("pepperoni");

    expect(result).toBe(true);
  });

  test("createPizza returns vegetarian pizza with correct price", () => {
  const pizza = createPizza("vegetarian");

  expect(pizza).toEqual({
    type: "vegetarian",
    price: 110,
  });
});

test("chargeCustomer returns true for a valid order ID and amount", () => {
  const result = chargeCustomer(42, 100);

  expect(result).toBe(true);
});

test("chargeCustomer order ID is undefined", () => {
  expect(() => chargeCustomer(undefined, 100))
    .toThrow("Cannot charge the customer without a valid order ID!");
});

test("chargeCustomer order ID is negative", () => {
  expect(() => chargeCustomer(-1, 100)).toThrow();
});

test("chargeCustomer order ID is not a whole number", () => {
  expect(() => chargeCustomer(12.5, 100)).toThrow();
});

test("chargeCustomer amount is zero", () => {
  expect(() => chargeCustomer(42, 0)).toThrow();
});

});