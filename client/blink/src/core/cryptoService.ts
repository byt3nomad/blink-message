const cryptoService = {
  generateKey: async () => {
    return window.crypto.subtle.generateKey(
      {
        name: "AES-GCM",
        length: 256,
      },
      true,
      ["encrypt", "decrypt"]
    );
  },
  encrypt: (data: ArrayBuffer, iv: Uint8Array, cryptoKey: CryptoKey) => {
    return window.crypto.subtle.encrypt(
      { name: "AES-GCM", iv: iv },
      cryptoKey,
      data
    );
  },

  importAesKey: (key: Uint8Array) => {
    return window.crypto.subtle.importKey("raw", key, "AES-GCM", true, [
      "encrypt",
      "decrypt",
    ]);
  },
  importPbkdf2Key: (key: Uint8Array) => {
    return window.crypto.subtle.importKey("raw", key, "PBKDF2", false, [
      "deriveBits",
      "deriveKey",
    ]);
  },
  deriveKey: (salt: Uint8Array, baseKey: CryptoKey) => {
    return window.crypto.subtle.deriveKey(
      {
        name: "PBKDF2",
        salt,
        iterations: 100000,
        hash: "SHA-256",
      },
      baseKey,
      { name: "AES-GCM", length: 256 },
      true,
      ["encrypt", "decrypt"]
    );
  },
  exportKey: async (key: CryptoKey) => {
    return window.crypto.subtle.exportKey("raw", key);
  },
  decrypt: (iv: Uint8Array, key: CryptoKey, data: Uint8Array) => {
    return window.crypto.subtle.decrypt({ name: "AES-GCM", iv }, key, data);
  },
  generateRandomBytes: (length: number) => {
    return window.crypto.getRandomValues(new Uint8Array(length));
  },
};

export default cryptoService;
