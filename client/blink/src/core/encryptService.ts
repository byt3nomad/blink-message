import cryptoService from "./cryptoService";
import encodingService from "./encodingService";
import { DecryptedMessageResult } from "./types";
import { EncryptMessageResult } from "./types";
const IV_LENGTH = 12;
const SALT_LENGTH = 12;

const deriveKeyFromPassword = async (password: string, salt: Uint8Array) => {
  const encodedPassword = encodingService.encodeUtf8(password);
  const baseKey = await cryptoService.importPbkdf2Key(encodedPassword);

  return cryptoService.deriveKey(salt, baseKey);
};

const extractDecryptionKey = async (decryptionKeyBytes: Uint8Array) => {
  const cryptoKeyBytes = decryptionKeyBytes.slice(IV_LENGTH);

  return cryptoService.importAesKey(cryptoKeyBytes);
};

const encryptMessage = async (
  message: string,
  cryptoKey: CryptoKey,
  iv: Uint8Array
) => {
  const encodedMessage = encodingService.encodeUtf8(message);
  const encryptedMessage = await cryptoService.encrypt(
    encodedMessage,
    iv,
    cryptoKey
  );
  return encodingService.encodeBase64(new Uint8Array(encryptedMessage));
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
  const encryptedMessageBytes = encodingService.decodeBase64(encryptedMessage);

  const decryptedMessageBytes = await cryptoService.decrypt(
    iv,
    key,
    encryptedMessageBytes
  );

  return encodingService.decodeUtf8(decryptedMessageBytes);
};

const encodeKeyWithIv = async (key: CryptoKey, iv: Uint8Array) => {
  const exportedKey = await cryptoService.exportKey(key);
  const keyBytes = new Uint8Array(exportedKey);

  const unifiedBytes = new Uint8Array([...iv, ...keyBytes]);
  return encodingService.encodeBase64(unifiedBytes);
};

const encodeEncryptedKeyWithIvAndSalt = async (
  iv: Uint8Array,
  salt: Uint8Array,
  encryptedKey: ArrayBuffer
) => {
  const keyBytes = new Uint8Array(encryptedKey);

  const unifiedBytes = new Uint8Array([...iv, ...salt, ...keyBytes]);
  return encodingService.encodeBase64(unifiedBytes);
};

const encryptService = {
  encryptMessage: async (message: string): Promise<EncryptMessageResult> => {
    const key = await cryptoService.generateKey();
    const iv = cryptoService.generateRandomBytes(IV_LENGTH);

    const encryptedMessage = await encryptMessage(message, key, iv);
    const decryptionData = await encodeKeyWithIv(key, iv);

    return { encryptedMessage, decryptionData };
  },
  encryptMessageWithPassword: async (
    message: string,
    password: string
  ): Promise<EncryptMessageResult> => {
    const key = await cryptoService.generateKey();
    const iv = cryptoService.generateRandomBytes(IV_LENGTH);
    const salt = cryptoService.generateRandomBytes(SALT_LENGTH);

    // encrypt the message with the key
    const encryptedMessage = await encryptMessage(message, key, iv);
    //encrypt the key with the password (the decryption key is not returned)
    const encryptedKey = await encryptKeyWithPassword(password, key, iv, salt);
    const decryptionData = await encodeEncryptedKeyWithIvAndSalt(
      iv,
      salt,
      encryptedKey
    );

    return { encryptedMessage, decryptionData };
  },
  decryptMessage: async (
    encryptedMessage: string,
    decryptionData: string
  ): Promise<DecryptedMessageResult> => {
    try {
      const decryptionDataBytes = encodingService.decodeBase64(decryptionData);
      const iv = decryptionDataBytes.slice(0, IV_LENGTH);
      const decryptionKey = await extractDecryptionKey(decryptionDataBytes);

      const decryptedMessage = await decryptMessage(
        encryptedMessage,
        decryptionKey,
        iv
      );

      return { success: true, decryptedMessage };
    } catch (error) {
      return { success: false };
    }
  },
  decryptMessageWithPassword: async (
    encryptedMessage: string,
    decryptionData: string,
    password: string
  ) => {
    const decryptionDataBytes = encodingService.decodeBase64(decryptionData);
    const iv = decryptionDataBytes.slice(0, IV_LENGTH);
    const salt = decryptionDataBytes.slice(IV_LENGTH, IV_LENGTH + SALT_LENGTH);
  },
};

export default encryptService;
