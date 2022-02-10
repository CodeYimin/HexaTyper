export function binaryStringToNumber(string: string): number {
  let solution = 0;

  for (let i = 0; i < string.length; i++) {
    if (string[i] === "1") {
      solution += Math.pow(2, string.length - i - 1);
    }
  }

  return solution;
}

export function binaryStringToHexa(string: string): string {
  if (string.length > 4) {
    throw new Error(
      "Cannot convert binary with more than 4 bits to hexa decimal"
    );
  }

  return numberToHexa[binaryStringToNumber(string)];
}

export const hexaDecimals: string = "0123456789ABCDEF";

export const numberToHexa: Record<number, string> = {
  0: "0",
  1: "1",
  2: "2",
  3: "3",
  4: "4",
  5: "5",
  6: "6",
  7: "7",
  8: "8",
  9: "9",
  10: "A",
  11: "B",
  12: "C",
  13: "D",
  14: "E",
  15: "F",
};
