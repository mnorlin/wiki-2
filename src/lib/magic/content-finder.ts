import { reverseLcg } from './magic/lcg';
import { baseTen } from './magic/base-conversion';
import { textToCodePoints } from './magic/text-mapping';
import { codeMap, reservedCodepoints } from './config/code-map';
import lcgParams from './config/lcg-params';

onmessage = (e) => {
	const pageNumber = reverseLcg(
		baseTen(textToCodePoints(e.data, codeMap).reverse(), reservedCodepoints),
		lcgParams
	);
	postMessage({ searchString: e.data, pageNumber: pageNumber });
};
