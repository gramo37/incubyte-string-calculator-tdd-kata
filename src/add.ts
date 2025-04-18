export function add(numberString: string): number {
  if (!numberString) return 0;

  const bracketFindingRegex = /\[([^\]]+)\]/g;
  const escapeSpecialCharacterRegex = /[.*+-?^${}()|[\]\\]/g;

  // default delimiter: comma or newline
  let delimiter: RegExp = /,|\n/;
  let numbersPart = numberString;

  // Check for custom delimiter syntax: "//[delimiter]\n[numbers]"
  if (numberString.startsWith("//")) {
    const parts = numberString.split("\n");
    const delimiterPart = parts[0].slice(2);
    numbersPart = parts.slice(1).join("\n");

    // Detect square bracket in the string
    const delimiterMatches = [...delimiterPart.matchAll(bracketFindingRegex)];
    if (delimiterMatches.length > 0) {
      // If bracket found escape special characters with \\, to treat it like a normal literal
      // Eg -> * -> \\*
      const delimters = delimiterMatches.map(m => 
        m[1].replace(escapeSpecialCharacterRegex, "\\$&")
      )
      delimiter = new RegExp(
        delimters.join("|") +
          "|\n"
      );
    } else {
      // Normal Flow: Single character delimiter without brackets
      delimiter = new RegExp(`${delimiterPart}|\n`);
    }

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

  return numbers.reduce((sum, n) => sum + n, 0);
}
