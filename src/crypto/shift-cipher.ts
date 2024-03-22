import { $ } from "./../main";

console.log("shift-cipher.ts");

const encryptFormEl = $(".shift-cipher.encrypt form")! as HTMLFormElement;

const onShiftEncrypt = (e: SubmitEvent) => {
  e.preventDefault();

  const plaintextEl = $(
    ".shift-cipher.encrypt input[name=plaintext]",
  )! as HTMLInputElement;
  const ciphertextEl = $(
    ".shift-cipher.encrypt input[name=ciphertext]",
  )! as HTMLInputElement;
  const keyEl = $(".shift-cipher.encrypt input[name=key]")! as HTMLInputElement;

  // Extract values & parse them
  const key = parseInt(keyEl.value);
  const plaintext = plaintextEl.value.toUpperCase();

  // TODO: validate user input
  // ...

  plaintextEl.value = plaintext;

  // Perform encryption
  const ciphertext = encrypt(key, plaintext);

  // Set the value in frontend
  ciphertextEl.value = ciphertext;
};

const encrypt = (key: number, plaintext: string) => {
  const start = "A".charCodeAt(0);
  const end = "Z".charCodeAt(0);
  const alphabetsRange = Math.abs(end - start + 1);

  const ciphertext = plaintext
    .split("")
    .map((char) => {
      const charOrigin = char.charCodeAt(0) - start;
      const charShifted = (charOrigin + key) % alphabetsRange;
      return String.fromCharCode(charShifted + start);
    })
    .join("");

  return ciphertext;
};

encryptFormEl.addEventListener("submit", onShiftEncrypt);
