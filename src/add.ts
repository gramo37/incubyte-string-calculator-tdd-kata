export function add(numberString: string): number {
  if (numberString === "") return 0;

  const numbers = numberString.split(",").map(Number);

  let sm = 0;
  for (let i = 0; i < numbers.length; i++) {
    sm += numbers[i];
  }
  return sm;
}
