import lcgParams from "/js/config/lcg-params.js";

export function toPercent(pageNumber) {
  return (Number((BigInt(pageNumber) * 10000n) / lcgParams.m) / 100).toFixed(1);
}

export function fromPercent(percent) {
  return (BigInt(Math.floor(100 * percent)) * lcgParams.m) / 10000n;
}
