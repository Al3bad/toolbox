//---------------------------------------------------
//--> RSA functions
//---------------------------------------------------
export const rsaKeyGen = (p: number, q: number) => {
  // Notes:
  //    e -> public key (encryption key)
  //    d -> private key (decryption key)

  // Check validity of prime numbers
  if (p === q || !isPrime(p) || !isPrime(q))
    throw new Error("p & q must be distinct prime numbers");

  // 1.2 Compute the product
  const n = p * q;
  const phi_n = (p - 1) * (q - 1);

  let publicKey;
  let privateKey;

  // regenerate keys if they're equal
  for (let i = 0; i < 10; i++) {
    // 1.3 Choose an integer e randomly such that
    //    0 < e < phi(n)
    //    gcd(e, phi(n)) = 1
    do {
      const randomNumber = genRandomNumber(1, phi_n - 1);
      if (gcd(randomNumber, phi_n) === 1) publicKey = randomNumber;
    } while (!publicKey);

    // 1.4 Compute d such that:
    //    0 < d < phi(n)
    //    e*d=1 (mod phi(n))
    for (let i = 1; i < phi_n; i++) {
      if ((publicKey * i) % phi_n === 1) privateKey = i;
    }

    if (publicKey !== privateKey) break;
  }

  if (publicKey === undefined || privateKey === undefined)
    throw new Error("Something wrong happend while generating the keys!");

  return {
    publicKey,
    privateKey,
    n,
  };
};

export const rsaEncrypt = (plaintext: string, publicKey: number, n: number) => {
  // 2. Encryption
  //    m^e (mod n)
  const ciphertext = plaintext
    .split("")
    .map((char) => String.fromCharCode(pow(char.charCodeAt(0), publicKey, n)))
    .join("");
  return ciphertext;
};

export const rsaDecrypt = (
  ciphertext: string,
  privateKey: number,
  n: number,
) => {
  // 3. Decryption
  //    ciphertext^d (mod n)
  const plaintext = ciphertext
    .split("")
    .map((char) => String.fromCharCode(pow(char.charCodeAt(0), privateKey, n)))
    .join("");
  return plaintext;
};

export const rsaSign = () => {
  // TODO:
  // s = m^d (mod n)
};

export const rsaVerify = () => {
  // TODO:
  // m = s^e (mod n)
};

//---------------------------------------------------
//--> Helper functions
//---------------------------------------------------
const isPrime = (num: number) => {
  if (num === 1) undefined;
  if (num > 1) {
    for (let i = 2; i < num; i++) if (num % i === 0) return false;
    return true;
  }
  return false;
};

const genRandomNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max + 1)) + min;
};

const gcd = (divisor: number, dividend: number): number => {
  // Using Euclidean Algorithm (recursive)
  // const quotient = Math.floor(dividend / divisor);
  const remainder = dividend % divisor;

  if (remainder === 0) return divisor;
  else return gcd(remainder, divisor);
};

const pow = (a: number, b: number, modulo?: number) => {
  let result = a;
  for (let i = 1; i < b; i++) {
    result = result * a;
    if (modulo !== undefined) result = result % modulo;
  }
  return result;
};

//---------------------------------------------------
//--> Testing
//---------------------------------------------------
const p = 3;
const q = 43;
const { publicKey, privateKey, n } = rsaKeyGen(p, q);

console.log(`Public Key : ${publicKey}`);
console.log(`Private Key: ${privateKey}`);

const plaintext = "Hello World!";
const ciphertext = rsaEncrypt(plaintext, publicKey, n);
const decryptedCiphertext = rsaDecrypt(ciphertext, privateKey, n);

console.log("Ciphertext:");
console.log(ciphertext);
console.log("Plaintext:");
console.log(decryptedCiphertext);
