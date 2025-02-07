import cryptoService from "./cryptoService";
import encodingService from "./encodingService";
import { DecryptedMessageResult } from "./types";
import { EncryptMessageResult } from "./types";
const IV_LENGTH = 12;
const SALT_LENGTH = 12;

const extractIv = (decryptionKey: string) => {
  const decryptionKeyBytes = encodingService.decodeBase64(decryptionKey);

  return decryptionKeyBytes.slice(0, IV_LENGTH);
};

const deriveKeyFromPassword = async (password: string, salt: Uint8Array) => {
  const encodedPassword = encodingService.encodeUtf8(password);
  const baseKey = await cryptoService.importPbkdf2Key(encodedPassword);

  return cryptoService.deriveKey(salt, baseKey);
};

const extractCryptoKey = async (decryptionKey: string) => {
  const decryptionKeyBytes = encodingService.decodeBase64(decryptionKey);
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

const createDecryptionKey = async (key: CryptoKey, iv: Uint8Array) => {
  const exportedKey = await cryptoService.exportKey(key);
  const keyBytes = new Uint8Array(exportedKey);

  const unifiedBytes = new Uint8Array([...iv, ...keyBytes]);
  return encodingService.encodeBase64(unifiedBytes);
};

const createDecryptionKeyComponents = async (
  iv: Uint8Array,
  salt: Uint8Array,
  encryptedKeyWithPassword: ArrayBuffer
) => {
  const keyBytes = new Uint8Array(encryptedKeyWithPassword);

  const unifiedBytes = new Uint8Array([...iv, ...salt, ...keyBytes]);
  return encodingService.encodeBase64(unifiedBytes);
};

const encryptService = {
  encryptMessage: async (message: string): Promise<EncryptMessageResult> => {
    const key = await cryptoService.generateKey();
    const iv = cryptoService.generateRandomBytes(IV_LENGTH);

    const encryptedMessage = await encryptMessage(message, key, iv);
    const decryptionKey = await createDecryptionKey(key, iv);

    return { encryptedMessage, decryptionKey };
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
    const encryptedKeyWithPassword = await encryptKeyWithPassword(
      password,
      key,
      iv,
      salt
    );
    const decryptionKey = await createDecryptionKeyComponents(
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
