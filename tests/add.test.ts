import { add } from "../src/add";

describe("String Calculator", () => {
  test("Returns 0 for empty string", () => {
    expect(add("")).toBe(0);
  });

  test("Returns sum for comma separated number string with 1 to 2 numbers", () => {
    expect(add("0")).toBe(0);
    expect(add("1")).toBe(1);
    expect(add("1,5")).toBe(6);
  });
});
