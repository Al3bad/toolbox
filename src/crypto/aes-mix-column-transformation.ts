// Description
// - This script calculates the Mix Column transformation output in the AES encryption
import GFCalculator from "./../calcs/galois-field-calc";
// import { Base } from "../common/utils/formatters";
// import { binToDecimal } from "./../common/utils/converters";

export const multiplyMatrix = (
  A: number[][],
  B: number[][],
  polynomial: number,
) => {
  const result = new Array(A.length)
    .fill(0)
    .map((_) => new Array(B[0].length).fill(0));

  return result.map((row, i) => {
    return row.map((_, j) => {
      console.log(`cell (${i}x${j})`);
      const cellResult = A[i].reduce((sum, elm, k) => {
        // console.log(
        //   `( ${Base.toHex(elm)} x ${Base.toHex(B[k][j])} ) = ${Base.toBin(elm)} x ${Base.toBin(B[k][j])} = ${Base.toBin(GFCalculator.multiply(elm, B[k][j], polynomial))}`,
        // );

        return sum ^ GFCalculator.multiply(elm, B[k][j], polynomial);
      }, 0);

      // console.log(
      //   `XOR result = ${Base.toBin(cellResult)} = ${Base.toHex(cellResult)}\n`,
      // );
      return cellResult;
    });
  });
};

// Usage example
// const P = "100011011"; // GF(2^8)
//
// // Constant matrix
// const constant = [
//   [0x02, 0x03, 0x01, 0x01],
//   [0x01, 0x02, 0x03, 0x01],
//   [0x01, 0x01, 0x02, 0x03],
//   [0x03, 0x01, 0x01, 0x02],
// ];
//
// // Input matrix
// const input = [
//   [0x23, 0xcb, 0x7c, 0x6f],
//   [0xfc, 0xc0, 0xf2, 0xd1],
//   [0x59, 0x67, 0x00, 0x20],
//   [0xa0, 0x5a, 0x6a, 0xf0],
// ];
//
// console.table(
//   Base.toHexMatrix(multiplyMatrix(constant, input, binToDecimal(P))),
// );
