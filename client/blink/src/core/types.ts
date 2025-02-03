export type EncryptMessageResult = {
  encryptedMessage: string;
  decryptionKey: string;
};

export type DecryptedMessageResult =
  | DecryptMessageSuccess
  | DecryptMessageError;

export type DecryptMessageSuccess = {
  success: true;
  decryptedMessage: string;
};

export type DecryptMessageError = {
  success: false;
};
