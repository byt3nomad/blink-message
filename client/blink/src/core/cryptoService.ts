const encoder = new TextEncoder();

const generateKey = async () => {
  return await window.crypto.subtle.generateKey(
    {
      name: "AES-GCM",
      length: 256,
    },
    true,
    ["encrypt", "decrypt"]
  );
};

export const encryptMessage = async (message: string) => {
  const encoded = encoder.encode(message);
  const key = await generateKey();

  const iv = window.crypto.getRandomValues(new Uint8Array(12));
  const encryptedMessage = await window.crypto.subtle.encrypt(
    { name: "AES-GCM", iv: iv },
    key,
    encoded
  );
};
