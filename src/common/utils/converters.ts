export const hexToDecimal = (hex: string) => {
  if (hex.startsWith("0x")) hex = hex.substring(2);
  return parseInt(hex, 16);
};

export const binToDecimal = (binary: string) => {
  if (binary.startsWith("0b")) binary = binary.substring(2);
  return parseInt(binary, 2);
};
