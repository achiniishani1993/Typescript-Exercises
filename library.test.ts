import { describe, test, expect } from "vitest";
import { findBook, checkOutBook , registerLoan } from "./library.ts";

describe("Library Unit Tests", () => {

  test("findBook dune with correct details", () => {
    const result = findBook("dune");

    expect(result).toEqual({
      title: "dune",
      copiesAvailable: 3
    });
  });

  test("findBook when no copies are available", () => {
    const result = findBook("foundation");

    expect(result).toEqual({
      title: "foundation",
      copiesAvailable: 0
    });
  });

  test("findBook an unknown book", () => {
    expect(() => findBook("harry potter")).toThrow();
  });

  test("findBook a number instead of a book title", () => {
    expect(() => findBook(42)).toThrow();
  });

//   checkoutbook exercise 5

test("checkOutBook a number", () => {
  const result = checkOutBook({
    title: "dune",
    copiesAvailable: 3
  });

  expect(typeof result).toBe("number");
});

test("checkOutBook a whole number", () => {
  const result = checkOutBook({
    title: "dune",
    copiesAvailable: 3
  });

  expect(Number.isInteger(result)).toBe(true);
});

test("checkOutBook a loan ID between 1000 and 9999", () => {
  const result = checkOutBook({
    title: "dune",
    copiesAvailable: 3
  });

  expect(result).toBeGreaterThanOrEqual(1000);
  expect(result).toBeLessThanOrEqual(9999);
});

test("checkOutBook no copies are available", () => {
  expect(() => checkOutBook({
    title: "foundation",
    copiesAvailable: 0
  })).toThrow("No copies available");
});

test("checkOutBook copies Available is missing", () => {
  expect(() => checkOutBook({
    title: "dune"
  })).toThrow();
});

// registerloan

test("registerLoan a valid loan object", () => {
  const result = registerLoan(1234, "dune", 7);

  expect(result).toEqual({
    loanId: 1234,
    title: "dune",
    memberId: 7
  });
});

test("registerLoan memberId is zero", () => {
  expect(() => registerLoan(1234, "dune", 0)).toThrow();
});

test("registerLoan title is not in the catalogue", () => {
  expect(() => registerLoan(1234, "harry potter", 7)).toThrow();
});

});