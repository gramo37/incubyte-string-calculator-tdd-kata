export function add(numberString: string): number {
  if (numberString === "") return 0;

  // default delimiter: comma or newline
  let delimiter = /,|\n/;
  let numbersPart = numberString;

  // Check for custom delimiter syntax: "//[delimiter]\n[numbers]"
  if (numberString.startsWith("//")) {
    const parts = numberString.split("\n");
    delimiter = new RegExp(`${parts[0].slice(2)}|\n`);
    numbersPart = parts.slice(1).join("\n");
    if (parts[0].slice(2) === "-") {
      // Handle negative cases when delimiter is -
      numbersPart = numbersPart.replace(/--/g, "\n@NEG@");
      numbersPart = numbersPart.replace(/-/g, "\n");
      numbersPart = numbersPart.replace("@NEG@", "-");
      delimiter = new RegExp(`\n`);
    }
  }

  const numbers = numbersPart
    .split(delimiter)
    .map(Number)
    .filter(n => !isNaN(n));

  // Add Check for negative numbers
  const negativeNumbers = numbers.filter((n) => n < 0);
  if (negativeNumbers.length > 0) {
    throw new Error(
      `negative numbers not allowed ${negativeNumbers.join(",")}`
    );
  }

  let sm = 0;
  for (let i = 0; i < numbers.length; i++) {
    sm += numbers[i];
  }
  return sm;
}
