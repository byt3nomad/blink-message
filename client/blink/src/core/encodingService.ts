const textEncoder = new TextEncoder();
const textDecoder = new TextDecoder();

const encodingService = {
  encodeBase64: (bytes: Uint8Array) => {
    const binaryString = Array.from(bytes, (byte) =>
      String.fromCodePoint(byte)
    ).join("");

    return btoa(binaryString);
  },
  decodeBase64: (text: string) => {
    const decodedText = atob(text);
    return Uint8Array.from(decodedText, (char) => char.charCodeAt(0));
  },
  encodeUtf8: (text: string) => {
    return textEncoder.encode(text);
  },
  decodeUtf8: (data: ArrayBuffer) => {
    return textDecoder.decode(data);
  },
};

export default encodingService;
