// Description
// - This script calculates the Mix Column transformation output in the AES encryption
import GFCalculator from "./../calcs/galois-field-calc";

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
