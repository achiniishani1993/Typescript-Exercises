import { describe, it, expect } from "vitest";
import { calculateDiscount } from "./quality-gate-demo";

describe("calculateDiscount", () => {
  it("should calculate a 10% discount", () => {
    expect(calculateDiscount(100)).toBe(90);
  });

  it("should reject negative prices", () => {
    expect(() => calculateDiscount(-10)).toThrow(
      "Price cannot be negative"
    );
  });
});
