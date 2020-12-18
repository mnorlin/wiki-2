export default function getTransitionTime(length) {
  const property = getComputedStyle(document.documentElement).getPropertyValue(`--transition-time-${length}`);

  if (property.includes("ms")) {
    return property.replace("ms", "");
  }

  return property.replace("s", "") * 1000;
}
