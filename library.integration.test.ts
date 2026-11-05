import { describe, test, expect } from "vitest";
import { borrowBook } from "./library";

describe("Library Integration Tests", () => {

  test("borrowBook successfully borrows dune", () => {
    const result = borrowBook("dune", 7);

    expect(result.title).toBe("dune");
    expect(result.memberId).toBe(7);
  });

  test("borrowBook generates a loan ID between 1000 and 9999", () => {
    const result = borrowBook("dune", 7);

    expect(typeof result.loanId).toBe("number");
    expect(result.loanId).toBeGreaterThanOrEqual(1000);
    expect(result.loanId).toBeLessThanOrEqual(9999);
  });

  test("borrowBook throws when no copies are available", () => {
    expect(() => borrowBook("foundation", 7))
      .toThrow("No copies available");
  });

  test("borrowBook throws when member ID is negative", () => {
    expect(() => borrowBook("dune", -1)).toThrow();
  });

});