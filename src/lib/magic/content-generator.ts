import { lcg } from './magic/lcg';
import { baseConvert } from './magic/base-conversion';
import { codePointsToText } from './magic/text-mapping';
import { codeMap, reservedCodepoints } from './config/code-map';
import lcgParams from './config/lcg-params';

onmessage = (e) => {
	if (e.data <= 0) {
		postMessage({ pageNumber: BigInt(e.data), text: undefined, image: [[]] });
		return;
	}
	const number = lcg(BigInt(e.data), lcgParams);
	const image = extractColors(lcgParams.m - number);
	const text = codePointsToText(baseConvert(number, reservedCodepoints).reverse(), codeMap);
	postMessage({ pageNumber: e.data, text, image: image });
};

function extractColors(number: bigint) {
	const bigNumberString = number.toString();
	const aThird = Math.trunc(Number(bigNumberString.length / 3));

	const colors = 8;

	const red = bigNumberString.slice(0, aThird);
	const green = bigNumberString.slice(aThird, 2 * aThird);
	const blue = bigNumberString.slice(2 * aThird, 3 * aThird);

	const redArray = baseConvert(BigInt(red), colors).map((number) => number * (255 / colors));
	const greenArray = baseConvert(BigInt(green), colors).map((number) => number * (255 / colors));
	const blueArray = baseConvert(BigInt(blue), colors).map((number) => number * (255 / colors));

	const colorArray = redArray.map((red, i) => {
		return { r: red, g: greenArray[i], b: blueArray[i] };
	});

	const dimension = Math.trunc(Number(Math.sqrt(colorArray.length)));
	const colorMatrix: typeof colorArray[] = [];
	colorMatrix[0] = [];
	let row = 0;

	for (let i = 0; i < colorArray.length; i++) {
		if ((i + 1) % dimension === 0) {
			row++;
			colorMatrix[row] = [];
		}
		colorMatrix[row].push(colorArray[i]);
	}

	return colorMatrix;
}
