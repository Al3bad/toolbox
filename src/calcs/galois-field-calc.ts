import { $ } from "./../main";
import { binToDecimal } from "./../common/utils/converters";
import { Base } from "./../common/utils/formatters";

export enum GFOperation {
  Addition = "add",
  Subtraction = "subtract",
  Multiplication = "multiply",
  Division = "divide",
}

export default class GFCalculator {
  static add = (a: number, b: number) => a ^ b;

  static subtract = (a: number, b: number) => a ^ b;

  static multiply = (a: number, b: number, polynomial: number) => {
    let result = 0;
    while (b) {
      // If the least significant bit of b is set
      if (b & 1) result ^= a;
      // Multiply a by x in the field
      a = (a << 1) ^ (a & 0x80 ? polynomial : 0);
      // Shift b one bit to the right
      b >>>= 1;
    }
    return result;
  };
  static divide = (a: number, b: number, polynomial: number) => {
    const inverse = GFCalculator.Inverse(b, polynomial);
    return GFCalculator.multiply(a, inverse, polynomial);
  };

  // Extended Euclidean Algorithm to find the multiplicative inverse
  private static extendedEuclidean = (a: number, b: number) => {
    let [old_r, r] = [a, b];
    let [old_s, s] = [1, 0];
    let [old_t, t] = [0, 1];

    while (r !== 0) {
      const quotient = Math.floor(old_r / r);
      [old_r, r] = [r, old_r - quotient * r];
      [old_s, s] = [s, old_s - quotient * s];
      [old_t, t] = [t, old_t - quotient * t];
    }

    return [old_s, old_t, old_r]; // Return [s, t, gcd(a, b)]
  };

  // Function to find the multiplicative inverse
  private static Inverse(num: number, polynomial: number) {
    const [s, _, gcd] = GFCalculator.extendedEuclidean(num, polynomial);
    if (gcd !== 1)
      throw new Error("The number is not invertible in the field.");
    return s < 0 ? s + 256 : s; // Ensure positive result
  }
}

const onComputeButtonClicked = (e: SubmitEvent) => {
  e.preventDefault();

  const A_El = $(".galois-field-calc input[name=A]")! as HTMLInputElement;
  const B_El = $(".galois-field-calc input[name=B]")! as HTMLInputElement;
  const polynomialEl = $(
    ".galois-field-calc select[name=polynomial]",
  )! as HTMLInputElement;
  const operationEl = $(
    ".galois-field-calc input[name=operation]:checked",
  )! as HTMLInputElement;

  // Extract values & parse them
  const A = Base.toDecimal(A_El.value);
  const B = Base.toDecimal(B_El.value);
  const polynomial = binToDecimal(polynomialEl.value);
  const operation = operationEl.value;

  // TODO: validate user input
  // ...

  let result;
  switch (operation) {
    case GFOperation.Addition || GFOperation.Subtraction:
      result = GFCalculator.add(A, B);
      break;
    case GFOperation.Multiplication:
      result = GFCalculator.multiply(A, B, polynomial);
      break;
    case GFOperation.Division:
      result = GFCalculator.divide(A, B, polynomial);
      break;
    default:
      alert("Invalid operation!");
      return;
  }

  const resultDec = $(
    ".galois-field-calc .result-dec",
  )! as HTMLParagraphElement;
  const resultHex = $(
    ".galois-field-calc .result-hex",
  )! as HTMLParagraphElement;
  const resultBin = $(
    ".galois-field-calc .result-binary",
  )! as HTMLParagraphElement;

  resultDec.innerHTML = result.toString();
  resultHex.innerHTML = Base.toHex(result);
  resultBin.innerHTML = Base.toBin(result);
};

const formEl = $(".galois-field-calc form")! as HTMLFormElement;

formEl.addEventListener("submit", onComputeButtonClicked);
