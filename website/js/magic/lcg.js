// LCG, Linear Congruental Algorithm
export function lcg(seed, { a, c, m }) {
  return (a * seed + c) % m;
}

// Euclidean algorithm, finds greatest common divisor
export function gcd(a, b) {
  return a != 0 ? gcd(b % a, a) : b;
}

// Find the seed of an LCG generated number
export function reverseLcg(number, { a, c, m }) {
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

// Check if LCG parameters follows the Hull–Dobell Theorem
export function verifyLcgParams({ a, c, m }) {
  function divisibleAllPrimes(a, b) {
    if (b === 1n) return true;
    const c = gcd(a, b);
    if (c === 1n) return false;
    return divisibleAllPrimes(a, b / c);
  }

  const test1 = gcd(m, c) === 1n;
  const test2 = divisibleAllPrimes(a - 1n, m);
  const test3 = m % 4n === 0n ? (a - 1n) % 4n === 0n : true;

  console.log(`m and the offset c are relatively prime: ${test1}`);
  console.log(`a-1 is divisible by all prime factors of m: ${test2}`);
  console.log(`a-1 is divisible by 4 if m is divisible by 4: ${test3}`);
}
