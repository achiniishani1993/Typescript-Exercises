import { describe, test, expect } from "vitest";
import { findBook } from "./library.ts";

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

});