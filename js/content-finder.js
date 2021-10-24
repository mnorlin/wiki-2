function reverseLcg(number, { a, c, m }) {
  // Modular multiplicative inverse
  function modInv(a, m) {
    // Extended Euclidean algorithm, ax + by = gcd(a,b)
    function egcd(a, b) {
      if (a == 0) {
        return { g: b, x: 0n, y: 1n };
      } else {
        const { g, x, y } = egcd(b % a, a);
        return { g: g, x: y - (b / a) * x, y: x };
      }
    }

    return egcd(a, m).x % m;
  }

  const seed = (modInv(a, m) * (number - c)) % m;

  return seed < 0 ? seed + m : seed;
}

// Convert an array representing a number of an arbritary base, to base10
function baseTen(number, base) {
  function convert(acc, val, i, array) {
    return acc + BigInt(val) * BigInt(base) ** BigInt(array.length - 1 - i);
  }
  return number.reduce(convert, 0n);
}

// Convert a text to an array of its corresponding codepoints
function textToCodePoints(text, codeMap) {
  return Array.from(text).map((char) => codeMap.indexOf(char.codePointAt(0)));
}

const codeMap = codeMapGenerator();
const reservedCodepoints = 7151n;

function codeMapGenerator() {
  function set_codepoint(codepoint) {
    unicode_set.push(codepoint);
  }

  function set_codepoints(start, stop) {
    for (let i = start; i <= stop; i++) {
      unicode_set.push(i);
    }
  }

  function unset_codepoint(codepoint) {
    unicode_set = unicode_set.filter((cp) => cp != codepoint);
  }

  function unset_codepoints(start, stop) {
    for (let i = start; i <= stop; i++) {
      unicode_set = unicode_set.filter((cp) => cp != i);
    }
  }

  let unicode_set = [];

  // Horizontal tabulation
  set_codepoint(9);

  // Linebreak LF
  set_codepoint(10);

  // Linebreak CR
  set_codepoint(13);

  // Space
  set_codepoint(32);

  // Basic latin
  set_codepoints(33, 126);

  // Latin-1 supplement
  set_codepoints(161, 255);

  // Latin-1 extended A
  set_codepoints(256, 383);

  // Latin-1 extended B
  set_codepoints(384, 591);

  // IPA-extension
  set_codepoints(592, 687);

  // Spacing modifier Letters
  set_codepoints(688, 767);

  // Combining Diactrical Marks
  set_codepoints(768, 879);

  // Greek and Coptic
  set_codepoints(800, 1023);
  unset_codepoints(888, 889);
  unset_codepoints(896, 899);
  unset_codepoint(907);
  unset_codepoint(909);
  unset_codepoint(930);

  // Hebrew
  set_codepoints(1425, 1524);
  unset_codepoints(1480, 1487);
  unset_codepoints(1515, 1519);

  // Arabic
  set_codepoints(1536, 1791);
  unset_codepoint(1565);

  // Arabic supplement
  set_codepoints(1872, 1919);

  // Runic
  set_codepoints(5792, 5887);
  unset_codepoints(5881, 5887);

  // Latin Extended additional
  set_codepoints(7680, 7935);

  // General Punctuation ZWJ
  set_codepoints(8203, 8207);

  // Superscripts and Subscripts
  set_codepoints(8304, 8351);
  unset_codepoints(8306, 8307);
  unset_codepoint(8335);
  unset_codepoints(8349, 8351);

  // Currency symbols
  set_codepoints(8352, 8399);
  unset_codepoints(8383, 8399);

  // Letterlike symbols
  set_codepoints(8448, 8527);

  // Arrows
  set_codepoints(8592, 8703);

  // Mathematical operators
  set_codepoints(8704, 8959);

  // Miscellaneous technical
  set_codepoints(8960, 9215);
  unset_codepoints(9211, 9215);

  // Enclodes Alphanumericals
  set_codepoints(9312, 9471);

  // Box Drawing
  set_codepoints(9472, 9599);

  // Block Elements
  set_codepoints(9600, 9631);

  // Geometric Shapes
  set_codepoints(9632, 9727);

  // Miscallaneous symbols
  set_codepoints(9728, 9983);

  // Dingbats
  set_codepoints(9984, 10175);

  // Miscellaneous Mathematical Symbols-A block
  set_codepoints(10176, 10223);

  // Braille Patterns
  set_codepoints(10240, 10495);

  // Miscellaneous Mathematical Symbols-B block
  set_codepoints(10624, 10751);

  // Supplemental Mathematical operators
  set_codepoints(10752, 11007);

  // Hiragana
  set_codepoints(12353, 12438);

  // Katakana
  set_codepoints(12448, 12543);

  // Katakana Phoenic extension
  set_codepoints(12784, 12799);

  // Arabic Presentation Forms-A
  set_codepoints(64336, 64449);

  // Variation selectors
  set_codepoints(65024, 65039);

  // Mathematical Alphanumeric symbols
  set_codepoints(119808, 120831);
  unset_codepoint(119893);
  unset_codepoint(119965);
  unset_codepoints(119968, 119969);
  unset_codepoints(119971, 119972);
  unset_codepoints(119975, 119976);
  unset_codepoint(119981);
  unset_codepoint(119994);
  unset_codepoint(119996);
  unset_codepoint(120004);
  unset_codepoint(120070);
  unset_codepoints(120075, 120076);
  unset_codepoint(120085);
  unset_codepoint(120093);
  unset_codepoint(120122);
  unset_codepoint(120127);
  unset_codepoint(120133);
  unset_codepoint(120135);
  unset_codepoints(120136, 120137);
  unset_codepoint(120145);
  unset_codepoints(120486, 120487);
  unset_codepoints(120780, 120781);

  // Majong Tiles
  set_codepoints(126976, 127019);

  // Domino tile
  set_codepoints(127024, 127123);

  // Playing card
  set_codepoints(127136, 127221);
  unset_codepoints(127151, 127152);
  unset_codepoint(127168);
  unset_codepoint(127184);

  // Enclosed Alphanumeric Supplement
  set_codepoints(127232, 127487);
  unset_codepoints(127245, 127247);
  unset_codepoint(127279);
  unset_codepoints(127340, 127343);
  unset_codepoints(127387, 127461);

  // Miscellaneous Symbols and Pictographs
  set_codepoints(127744, 128511);
  unset_codepoint(128378);
  unset_codepoint(128420);

  // Emoticons
  set_codepoints(128512, 128591);

  // Ornamental Dingbats
  set_codepoints(128592, 128639);

  // Transport and map symbols
  set_codepoints(128640, 128767);
  unset_codepoints(128721, 128735);
  unset_codepoints(128749, 128751);
  unset_codepoints(128756, 128767);

  // Supplemental Symbols and Pictographs
  set_codepoints(129296, 129535);
  unset_codepoint(129343);
  unset_codepoints(129357, 129359);
  unset_codepoints(129388, 129407);
  unset_codepoints(129432, 129487);
  set_codepoint(129472);
  unset_codepoints(129511, 129535);

  // console.log(unicode_set.length);
  return unicode_set;
}

const lcgParams = {
  a: 2n ** 38496n + 1n,
  c: 2n ** 23209n - 1n,
  m: 2n ** 38501n,
};

onmessage = (e) => {
  const pageNumber = reverseLcg(baseTen(textToCodePoints(e.data, codeMap).reverse(), reservedCodepoints), lcgParams);
  postMessage({ searchString: e.data, pageNumber: pageNumber });
};
