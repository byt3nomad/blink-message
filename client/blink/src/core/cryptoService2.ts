import { DecryptMessageResult } from "./types";
import { EncryptMessageResult } from "./types";
const encoder = new TextEncoder();
const decoder = new TextDecoder();
const IV_LENGTH = 12;

const encodeBase64 = (bytes: Uint8Array) => {
  const binaryString = Array.from(bytes, (byte) =>
    String.fromCodePoint(byte)
  ).join("");

  return btoa(binaryString);
};

const decodeBase64 = (text: string) => {
  const decodedText = atob(text);
  return Uint8Array.from(decodedText, (char) => char.charCodeAt(0));
};

const generateIv = () => {
  return window.crypto.getRandomValues(new Uint8Array(IV_LENGTH));
};

const extractIv = (decryptionKey: string) => {
  const decryptionKeyBytes = decodeBase64(decryptionKey);

  return decryptionKeyBytes.slice(0, IV_LENGTH);
};

const generateCryptoKey = async () => {
  return window.crypto.subtle.generateKey(
    {
      name: "AES-GCM",
      length: 256,
    },
    true,
    ["encrypt", "decrypt"]
  );
};

const extractCryptoKey = async (decryptionKey: string) => {
  const decryptionKeyBytes = decodeBase64(decryptionKey);
  const cryptoKeyBytes = decryptionKeyBytes.slice(IV_LENGTH);

  return window.crypto.subtle.importKey(
    "raw",
    cryptoKeyBytes,
    "AES-GCM",
    true,
    ["encrypt", "decrypt"]
  );
};

const encryptMessage = async (
  message: string,
  key: CryptoKey,
  iv: Uint8Array
) => {
  const encodedMessage = encoder.encode(message);

  const encryptedMessage = await window.crypto.subtle.encrypt(
    { name: "AES-GCM", iv: iv },
    key,
    encodedMessage
  );

  return encodeBase64(new Uint8Array(encryptedMessage));
};

const decryptMessage = async (
  encryptedMessage: string,
  key: CryptoKey,
  iv: Uint8Array
) => {
  const encryptedMessageBytes = decodeBase64(encryptedMessage);

  const decryptedMessageBytes = await window.crypto.subtle.decrypt(
    { name: "AES-GCM", iv },
    key,
    encryptedMessageBytes
  );

  return decoder.decode(decryptedMessageBytes);
};

const generateDecryptionKey = async (key: CryptoKey, iv: Uint8Array) => {
  const exportedKey = await window.crypto.subtle.exportKey("raw", key);
  const keyBytes = new Uint8Array(exportedKey);

  const unifiedBytes = new Uint8Array([...iv, ...keyBytes]);
  return encodeBase64(unifiedBytes);
};

const cryptoService2 = {
  encryptMessage: async (message: string): Promise<EncryptMessageResult> => {
    const cryptoKey = await generateCryptoKey();
    const iv = generateIv();

    const encryptedMessage = await encryptMessage(message, cryptoKey, iv);
    const decryptionKey = await generateDecryptionKey(cryptoKey, iv);

    return { encryptedMessage, decryptionKey };
  },
  decryptMessage: async (
    encryptedMessage: string,
    decryptionKey: string
  ): Promise<DecryptMessageResult> => {
    try {
      const iv = extractIv(decryptionKey);
      const cryptoKey = await extractCryptoKey(decryptionKey);

      const decryptedMessage = await decryptMessage(
        encryptedMessage,
        cryptoKey,
        iv
      );

      return { success: true, decryptedMessage };
    } catch (error) {
      return { success: false };
    }
  },
};

export default cryptoService2;
