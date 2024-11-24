export const rupee = String.fromCodePoint(0x20b9);

export function formatToDollar(cents: number) {
  const dollar = Math.floor(cents / 100).toFixed(2);
  return `${rupee}${dollar}`;
}

export function convertToCurrency(num: number): string {
  const numStr = num.toString().split(".");
  let intPart = numStr[0];
  const decimalPart = numStr.length > 1 ? "." + numStr[1] : "";

  // Regex to insert commas in the Indian number system format
  const lastThreeDigits = intPart?.slice(-3);
  const otherDigits = intPart?.slice(0, -3);

  if (otherDigits !== "") {
    intPart =
      otherDigits?.replace(/\B(?=(\d{2})+(?!\d))/g, ",") +
      "," +
      lastThreeDigits;
  }

  return intPart + decimalPart;
}
