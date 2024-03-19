import { $ } from "./../main";

console.log("shift-cipher.ts");

const encryptFormEl: HTMLFormElement = $(".shift-cipher.encrypt form")!;

const onShiftEncrypt = (e: SubmitEvent) => {
  e.preventDefault();

  const plaintextEl: HTMLInputElement = $(
    ".shift-cipher.encrypt input[name=plaintext]",
  )!;
  const ciphertextEl: HTMLInputElement = $(
    ".shift-cipher.encrypt input[name=ciphertext]",
  )!;
  const keyEl: HTMLInputElement = $(".shift-cipher.encrypt input[name=key]")!;

  // Extract values & parse them
  const key = parseInt(keyEl.value);
  const plaintext = plaintextEl.value.toUpperCase();

  plaintextEl.value = plaintext;

  // Perform encryption
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

  // Set the value in frontend
  ciphertextEl.value = ciphertext;
};

encryptFormEl.addEventListener("submit", onShiftEncrypt);
