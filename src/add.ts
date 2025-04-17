export function add(numberString: string): number {
  if (numberString === "") return 0;

  // Replace all new lines with comma and apply the existing logic
  const cleaned = numberString.replace(/\n/g, ",");
  const numbers = cleaned.split(",").map(Number);

  let sm = 0;
  for (let i = 0; i < numbers.length; i++) {
    sm += numbers[i];
  }
  return sm;
}
