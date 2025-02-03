export type EncryptMessageResult = {
  encryptedMessage: string;
  decryptionKey: string;
};

export type DecryptMessageResult = DecryptMessageSuccess | DecryptMessageError;

export type DecryptMessageSuccess = {
  success: true;
  decryptedMessage: string;
};

export type DecryptMessageError = {
  success: false;
};
