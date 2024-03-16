console.log("affine-cipher.ts");

const $ = document.querySelector.bind(document)!;

const encryptFormEl: HTMLFormElement = $(".affine-cipher.encrypt form")!;
const decryptFormEl: HTMLFormElement = $(".affine-cipher.decrypt form")!;

const onAffineEncrypt = (e: SubmitEvent) => {
  e.preventDefault();

  const plaintextEl: HTMLInputElement = $(
    ".affine-cipher.encrypt input[name=plaintext]",
  )!;
  const ciphertextEl: HTMLInputElement = $(
    ".affine-cipher.encrypt input[name=ciphertext]",
  )!;
  const key1El: HTMLInputElement = $(
    ".affine-cipher.encrypt input[name=key1]",
  )!;
  const key2El: HTMLInputElement = $(
    ".affine-cipher.encrypt input[name=key2]",
  )!;

  // Extract values & parse them
  const key1 = parseInt(key1El.value);
  const key2 = parseInt(key2El.value);
  const plaintext = plaintextEl.value.toUpperCase();

  plaintextEl.value = plaintext;

  // Perform encryption
  const ciphertext = plaintext
    .split("")
    .map((char) => {
      if (char === " ") {
        return char;
      } else {
        const A_CODE = "A".charCodeAt(0);
        const code = char.charCodeAt(0) - A_CODE;

        const cipherChar = (key1 * code + key2) % 26;

        return String.fromCharCode(cipherChar + A_CODE);
      }
    })
    .join("");

  // Set the value in frontend
  ciphertextEl.value = ciphertext;
};

const onAffineDecrypt = (e: SubmitEvent) => {
  e.preventDefault();

  const ciphertextEl: HTMLInputElement = $(
    ".affine-cipher.decrypt input[name=ciphertext]",
  )!;
  const plaintextEl: HTMLInputElement = $(
    ".affine-cipher.decrypt input[name=plaintext]",
  )!;
  const key1El: HTMLInputElement = $(
    ".affine-cipher.decrypt input[name=key1]",
  )!;
  const key2El: HTMLInputElement = $(
    ".affine-cipher.decrypt input[name=key2]",
  )!;

  // Extract values & parse them
  const key1 = parseInt(key1El.value);
  const key2 = parseInt(key2El.value);
  const ciphertext = ciphertextEl.value.toUpperCase();

  ciphertextEl.value = ciphertext;

  // Perform decryption
  const plaintext = ciphertext
    .split("")
    .map((char) => {
      if (char === " ") {
        return char;
      } else {
        const A_CODE = "A".charCodeAt(0);
        const code = char.charCodeAt(0) - A_CODE;

        let plainChar = getInverse(key1) * (code - key2);
        plainChar = (plainChar < 0 ? 26 + plainChar : plainChar) % 26;

        return String.fromCharCode(plainChar + A_CODE);
      }
    })
    .join("");

  // Set the value in frontend
  plaintextEl.value = plaintext;
};

const getInverse = (value: number) => {
  for (let i = 1; i <= 26; i++) {
    if ((value * i) % 26 === 1) return i;
  }
  return 0;
};

encryptFormEl.addEventListener("submit", onAffineEncrypt);
decryptFormEl.addEventListener("submit", onAffineDecrypt);
