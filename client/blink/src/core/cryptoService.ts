const encoder = new TextEncoder();
const decoder = new TextDecoder();

const importKey = async (jsonKey: string) => {
  return await window.crypto.subtle.importKey(
    "jwk",
    {
      alg: "A256GCM",
      ext: true,
      k: jsonKey,
      key_ops: ["encrypt", "decrypt"],
      kty: "oct",
    },
    "AES-GCM",
    true,
    ["encrypt", "decrypt"]
  );
};

const encodeBase64 = (buffer: ArrayBuffer | Uint8Array): string => {
  let view = buffer instanceof ArrayBuffer ? new Uint8Array(buffer) : buffer;
  const text = String.fromCharCode(...view);
  return btoa(text);
};

const decodeBase64 = (text: string): Uint8Array<ArrayBuffer> => {
  const decodedText = atob(text);
  const byteArray = new Uint8Array(decodedText.length);

  for (let i = 0; i < decodedText.length; i++) {
    byteArray[i] = decodedText.charCodeAt(i);
  }

  return byteArray;
};

export type EncryptedMessageResult = {
  key: string;
  encryptedMessage: string;
  iv: string;
};

type DecryptSuccess = {
  success: true;
  message: string;
};

type DecryptFailure = {
  success: false;
};
export type DecryptMessageResult = DecryptSuccess | DecryptFailure;

const cryptoService = {
  encryptMessage: async (content: string): Promise<EncryptedMessageResult> => {
    const encodedMessage = encoder.encode(content);
    const key = await window.crypto.subtle.generateKey(
      {
        name: "AES-GCM",
        length: 256,
      },
      true,
      ["encrypt", "decrypt"]
    );
    const iv = window.crypto.getRandomValues(new Uint8Array(12));

    const encryptedMessage = await window.crypto.subtle.encrypt(
      { name: "AES-GCM", iv: iv },
      key,
      encodedMessage
    );

    return {
      encryptedMessage: encodeBase64(encryptedMessage),
      iv: encodeBase64(iv),
      key: (await window.crypto.subtle.exportKey("jwk", key)).k || "",
    };
  },
  decryptMessage: async (
    message: string,
    iv: string,
    key: string
  ): Promise<DecryptMessageResult> => {
    try {
      const bufferedText = await window.crypto.subtle.decrypt(
        { name: "AES-GCM", iv: decodeBase64(iv) },
        await importKey(key),
        decodeBase64(message)
      );

      return { success: true, message: decoder.decode(bufferedText) };
    } catch (error) {
      return { success: false };
    }
  },
};

export default cryptoService;
