import { add } from "../src/add";

describe("String Calculator", () => {
  test("Returns 0 for empty string", () => {
    expect(add("")).toBe(0);
  });

  test("Returns sum for comma separated number string with 1 to 2 numbers", () => {
    expect(add("0")).toBe(0);
    expect(add("1")).toBe(1);
    expect(add("    7    ")).toBe(7);
    expect(add("     ,     ")).toBe(0);
    expect(add("1,5")).toBe(6);
  });

  test("Allow the add method to handle any amount of numbers.", () => {
    expect(add("1,5, 2,3,  4")).toBe(15);
    expect(add("1,2, 3,10,  4, 111, 1222,")).toBe(1353);
    expect(add("1,2,    ,")).toBe(3);
    expect(add("    , 1,2,    ,4,   ")).toBe(7);
  })

  test("Allow the add method to handle new lines between numbers", () => {
    expect(add("1\n2,3")).toBe(6);
    expect(add("1\n2\n3")).toBe(6);
    expect(add("1,\n2,3")).toBe(6);
    expect(add("1,\n2,3\n5")).toBe(11);
    expect(add("1,\n2,3\n,5")).toBe(11);
    expect(add("  ,  , \n  , 1,\n2,3\n,5         ")).toBe(11);
    expect(add("1,\n,2")).toBe(3);
    expect(add("\n1\n2\n")).toBe(3);
    expect(add("   \n , \n ,2, 3")).toBe(5);
  });

  test("Support custom single-character delimiters", () => {
    expect(add("//;\n1;2")).toBe(3);
    expect(add("//|\n1|2|3")).toBe(6);
    expect(add("//,\n1,2,3")).toBe(6);
    expect(add("//-\n1-2-3")).toBe(6);
  });
  
  test("Support custom delimiter with newline and ignore spaces", () => {
    expect(add("//;\n1 ; 2 ; 3")).toBe(6);
    expect(add("//;\n1 ; 2 ; 3   ;")).toBe(6);
    expect(add("//,\n1,2\n3   \n \n \n ,")).toBe(6);
  });

  test("Throw an exception for negative number", () => {
    expect(() => add("1,-2,3")).toThrow("negative numbers not allowed -2");
    expect(() => add("1,-2,-5,3")).toThrow("negative numbers not allowed -2,-5");
    expect(() => add("1\n-2,3,-4")).toThrow("negative numbers not allowed -2,-4");
    expect(() => add("//;\n1;-2;-3")).toThrow("negative numbers not allowed -2,-3");
    expect(() => add("//;\n1;-2;-3   ;   \n")).toThrow("negative numbers not allowed -2,-3");
    expect(add("//-\n1--2-3")).toThrow("negative numbers not allowed -2,-3");
  });
});
