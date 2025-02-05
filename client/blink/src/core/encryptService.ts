import cryptoService from "./cryptoService";
import { DecryptedMessageResult } from "./types";
import { EncryptMessageResult } from "./types";
const encoder = new TextEncoder();
const decoder = new TextDecoder();
const IV_LENGTH = 12;
const SALT_LENGTH = 12;

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

const generateSalt = () => {
  return window.crypto.getRandomValues(new Uint8Array(SALT_LENGTH));
};

const extractIv = (decryptionKey: string) => {
  const decryptionKeyBytes = decodeBase64(decryptionKey);

  return decryptionKeyBytes.slice(0, IV_LENGTH);
};

const deriveKeyFromPassword = async (password: string, salt: Uint8Array) => {
  const encodedPassword = encoder.encode(password);
  const baseKey = await cryptoService.importPbkdf2Key(encodedPassword);

  return cryptoService.deriveKey(salt, baseKey);
};

const extractCryptoKey = async (decryptionKey: string) => {
  const decryptionKeyBytes = decodeBase64(decryptionKey);
  const cryptoKeyBytes = decryptionKeyBytes.slice(IV_LENGTH);

  return cryptoService.importAesKey(cryptoKeyBytes);
};

const encryptMessage = async (
  message: string,
  cryptoKey: CryptoKey,
  iv: Uint8Array
) => {
  const encodedMessage = encoder.encode(message);
  const encryptedMessage = await cryptoService.encrypt(
    encodedMessage,
    iv,
    cryptoKey
  );
  return encodeBase64(new Uint8Array(encryptedMessage));
};

const encryptKeyWithPassword = async (
  password: string,
  keyToEncrypt: CryptoKey,
  iv: Uint8Array,
  salt: Uint8Array
) => {
  const exportedKeyToEncrypt = await cryptoService.exportKey(keyToEncrypt);
  const keyFromPassword = await deriveKeyFromPassword(password, salt);

  return cryptoService.encrypt(exportedKeyToEncrypt, iv, keyFromPassword);
};

const decryptMessage = async (
  encryptedMessage: string,
  key: CryptoKey,
  iv: Uint8Array
) => {
  const encryptedMessageBytes = decodeBase64(encryptedMessage);

  const decryptedMessageBytes = await cryptoService.decrypt(
    iv,
    key,
    encryptedMessageBytes
  );

  return decoder.decode(decryptedMessageBytes);
};

const encodeDecryptionKey = async (key: CryptoKey, iv: Uint8Array) => {
  const exportedKey = await cryptoService.exportKey(key);
  const keyBytes = new Uint8Array(exportedKey);

  const unifiedBytes = new Uint8Array([...iv, ...keyBytes]);
  return encodeBase64(unifiedBytes);
};

const encodeDecryptionKeyComponents = async (
  iv: Uint8Array,
  salt: Uint8Array,
  encryptedKeyWithPassword: ArrayBuffer
) => {
  const keyBytes = new Uint8Array(encryptedKeyWithPassword);

  const unifiedBytes = new Uint8Array([...iv, ...salt, ...keyBytes]);
  return encodeBase64(unifiedBytes);
};

const encryptService = {
  encryptMessage: async (message: string): Promise<EncryptMessageResult> => {
    const key = await cryptoService.generateKey();
    const iv = generateIv();

    const encryptedMessage = await encryptMessage(message, key, iv);
    const decryptionKey = await encodeDecryptionKey(key, iv);

    return { encryptedMessage, decryptionKey };
  },
  encryptMessageWithPassword: async (
    message: string,
    password: string
  ): Promise<EncryptMessageResult> => {
    const key = await cryptoService.generateKey();
    const iv = generateIv();
    const salt = generateSalt();

    // encrypt the message with the key
    const encryptedMessage = await encryptMessage(message, key, iv);
    //encrypt the key with the password (the decryption key is not returned)
    const encryptedKeyWithPassword = await encryptKeyWithPassword(
      password,
      key,
      iv,
      salt
    );
    const decryptionKey = await encodeDecryptionKeyComponents(
      iv,
      salt,
      encryptedKeyWithPassword
    );

    return { encryptedMessage, decryptionKey };
  },
  decryptMessage: async (
    encryptedMessage: string,
    decryptionKey: string
  ): Promise<DecryptedMessageResult> => {
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

export default encryptService;
