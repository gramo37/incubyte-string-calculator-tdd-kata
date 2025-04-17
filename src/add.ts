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
  }

  const numbers = numbersPart
    .split(delimiter)
    .map(Number)
    .filter(n => !isNaN(n));

  let sm = 0;
  for (let i = 0; i < numbers.length; i++) {
    sm += numbers[i];
  }
  return sm;
}
