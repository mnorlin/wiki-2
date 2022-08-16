/*
// Recursive, but slow.
export function baseConvert(number: bigint, base: bigint): bigint[] {
	const floor = number / base;
	if (floor < 1n) return [number];
	return baseConvert(floor, base).concat(number % base);
}
*/

// Convert base10 number to an arbitrary base
export function baseConvert(number: bigint, base: number): number[] {
	const bigBase = BigInt(base);
	let convertedNumber = [];
	while (number >= base) {
		convertedNumber.push(Number(number % bigBase));
		number = number / bigBase;
		if (number < 1n) break;
	}
	convertedNumber.push(Number(number));

	return convertedNumber.reverse();
}

// Convert an array representing a number of an arbritary base, to base10
export function baseTen(number: number[], base: number) {
	function convert(acc: bigint, val: number, i: number, array: number[]) {
		return acc + BigInt(val) * BigInt(base) ** BigInt(array.length - 1 - i);
	}
	return number.reduce(convert, 0n);
}
