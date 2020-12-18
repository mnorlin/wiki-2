// Convert base10 number to an arbitrary base
export function baseConvert(number, base) {
  const floor = number / base;
  if (floor < 1) return [number];
  return baseConvert(floor, base).concat(number % base);
}

// Convert an array representing a number of an arbritary base, to base10
export function baseTen(number, base) {
  function convert(acc, val, i, array) {
    return acc + BigInt(val) * BigInt(base) ** BigInt(array.length - 1 - i);
  }
  return number.reduce(convert, 0n);
}
