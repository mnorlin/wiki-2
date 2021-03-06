// Convert an array of numbers to their corresponding character
export function codePointsToText(codePointArray, codeMap) {
  return codePointArray.map((cp) => (codeMap[cp] ? String.fromCodePoint(codeMap[cp]) : "")).join("");
}

// Convert a text to an array of its corresponding codepoints
export function textToCodePoints(text, codeMap) {
  return Array.from(text).map((char) => codeMap.indexOf(char.codePointAt(0)));
}
