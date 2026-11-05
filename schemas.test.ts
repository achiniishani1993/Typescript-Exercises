import { describe, test, expect } from "vitest";

import {
  PizzaTypeSchema,
  PizzaSchema,
  AmountSchema,
  OrderIdSchema
} from "./pizzashop";

describe("Pizza Shop Schema Tests", () => {

  test("PizzaTypeSchema accepts margherita", () => {
    const result = PizzaTypeSchema.parse("margherita");

    expect(result).toBe("margherita");
  });

  test("PizzaTypeSchema rejects capital M Margherita", () => {
    expect(() => PizzaTypeSchema.parse("Margherita")).toThrow();
  });

  test("PizzaSchema accepts a valid pizza object", () => {
    const result = PizzaSchema.parse({
      type: "pepperoni",
      price: 120
    });

    expect(result).toEqual({
      type: "pepperoni",
      price: 120
    });
  });

  test("PizzaSchema rejects pizza without price", () => {
    expect(() => PizzaSchema.parse({
      type: "pepperoni"
    })).toThrow();
  });

  test("AmountSchema rejects a string instead of a number", () => {
    expect(() => AmountSchema.parse("100")).toThrow();
  });

  test("OrderIdSchema accepts zero", () => {
    const result = OrderIdSchema.parse(0);

    expect(result).toBe(0);
  });

});