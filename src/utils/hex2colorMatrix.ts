import hexRgb from "hex-rgb";

export const hex2colorMatrix = (hex: string, lastRecord: string) => {
  if (!hex) {
    return `1 0 0 0 0
            0 1 0 0 0
            0 0 1 0 0
            ${lastRecord}`;
  }
  const rgb = hexRgb(hex);
  return `${rgb.red / 150} 0 0 0 0
          0 ${rgb.green / 150} 0 0 0
          0 0 ${rgb.blue / 150} 0 0
          ${lastRecord}`;
};
