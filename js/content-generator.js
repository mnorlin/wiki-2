import { lcg } from "./magic/lcg.js";
import { baseConvert } from "./magic/base-conversion.js";
import { codePointsToText } from "./magic/text-mapping.js";
import { codeMap, reservedCodepoints } from "./config/code-map.js";
import lcgParams from "./config/lcg-params.js";

onmessage = (e) => {
  if (e.data == 0) {
    postMessage({ pageNumber: 0n, text: "", image: [[]] });
    return;
  }

  const number = lcg(BigInt(e.data), lcgParams);
  const image = extractColors(lcg(BigInt(e.data), lcgParams));
  const text = codePointsToText(baseConvert(number, BigInt(reservedCodepoints)).reverse(), codeMap);

  postMessage({ pageNumber: e.data, text, image });
};

function extractColors(number) {
  const bigNumberString = number.toString();
  const aThird = parseInt(bigNumberString.length / 3);

  const colors = 8n;

  const red = bigNumberString.slice(0, aThird);
  const green = bigNumberString.slice(aThird, 2 * aThird);
  const blue = bigNumberString.slice(2 * aThird, 3 * aThird);

  const redArray = baseConvert(BigInt(red), colors).map((number) => number * (255n / colors));
  const greenArray = baseConvert(BigInt(green), colors).map((number) => number * (255n / colors));
  const blueArray = baseConvert(BigInt(blue), colors).map((number) => number * (255n / colors));

  const colorArray = redArray.map((red, i) => {
    return { r: red, g: greenArray[i], b: blueArray[i] };
  });

  const dimension = parseInt(Math.sqrt(colorArray.length));
  const colorMatrix = [];
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
