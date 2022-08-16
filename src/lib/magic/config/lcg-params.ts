/**
 * Hull-Dobell Theorem
 * (https://en.wikipedia.org/wiki/Linear_congruential_generator)
 * m and the offset c are relatively prime
 * a-1 is divisible by all prime factors of m
 * a-1 is divisible by 4 if m is divisible by 4
 */
export default {
	a: 2n ** 38496n + 1n,
	c: 2n ** 23209n - 1n,
	m: 2n ** 38501n
};
