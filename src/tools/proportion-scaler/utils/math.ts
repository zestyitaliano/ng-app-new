export const gcd = (a: number, b: number): number => {
  return b === 0 ? a : gcd(b, a % b);
};

export const getSimplifiedRatio = (width: number, height: number): string | null => {
  if (!width || !height || width <= 0 || height <= 0) return null;
  
  // Check if close to integers
  const wRounded = Math.round(width);
  const hRounded = Math.round(height);
  
  if (Math.abs(width - wRounded) > 0.01 || Math.abs(height - hRounded) > 0.01) {
    return null; // Not integers, don't show simple ratio
  }

  const divisor = gcd(wRounded, hRounded);
  return `${wRounded / divisor}:${hRounded / divisor}`;
};

export const roundValue = (value: number, isRounded: boolean): string => {
  if (isRounded) {
    return Math.round(value).toString();
  }
  // Max 2 decimal places, but remove trailing zeros
  return parseFloat(value.toFixed(2)).toString();
};

export const isValidNumber = (val: string): boolean => {
  if (val === '') return false;
  const num = parseFloat(val);
  return !isNaN(num) && num > 0;
};