import { reverseLcg } from "./magic/lcg.js";
import { baseTen } from "./magic/base-conversion.js";
import { textToCodePoints } from "./magic/text-mapping.js";
import { codeMap, reservedCodepoints } from "./config/code-map.js";
import lcgParams from "./config/lcg-params.js";

onmessage = (e) => {
  const pageNumber = reverseLcg(baseTen(textToCodePoints(e.data, codeMap).reverse(), reservedCodepoints), lcgParams);
  postMessage({ searchString: e.data, pageNumber: pageNumber });
};
