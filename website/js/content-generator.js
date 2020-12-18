import { lcg } from "./magic/lcg.js";
import { baseConvert } from "./magic/base-conversion.js";
import { codePointsToText } from "./magic/text-mapping.js";
import { codeMap, reservedCodepoints } from "./config/code-map.js";
import lcgParams from "./config/lcg-params.js";

onmessage = (e) => {
  if (e.data == 0) {
    postMessage({ pageNumber: 0n, content: "" });
    return;
  }

  const content = codePointsToText(
    baseConvert(lcg(BigInt(e.data), lcgParams), BigInt(reservedCodepoints)).reverse(),
    codeMap
  );

  postMessage({ pageNumber: e.data, content: content });
};
