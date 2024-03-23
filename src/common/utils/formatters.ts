import { binToDecimal, hexToDecimal } from "./converters";

enum BaseFormat {
  Binary = 2,
  Hex = 16,
  Decimal = 10,
}

export class Base {
  static toDecimal = (val: string) => {
    val = val.replace(/(_|\s)+/g, "");
    if (val.startsWith("0x")) return hexToDecimal(val);
    if (val.startsWith("0b")) return binToDecimal(val);
    else return parseInt(val);
  };

  static toHex = (val: number) => {
    return Base.convert(val, "0x", BaseFormat.Hex, 2);
  };

  static toBin = (val: number) => {
    return Base.convert(val, "0b", BaseFormat.Binary, 4);
  };

  static toHexMatrix = (matrix: number[][]) => {
    const matrixHex: string[][] = new Array(matrix.length);
    matrix.forEach((row) => {
      const rowStr: string[] = [];
      row.forEach((val) => rowStr.push(Base.toHex(val)));
      matrixHex.push(rowStr);
    });
    return matrixHex;
  };

  private static convert = (
    val: number,
    prefix: string,
    base: number,
    minWidth: number,
  ) => {
    let convertedVal = val.toString(base);
    return (
      prefix +
      convertedVal.padStart(
        convertedVal.length + (minWidth - (convertedVal.length % minWidth)),
        "0",
      )
    );
  };
}
