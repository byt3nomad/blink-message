export type EncryptMessageResult = {
  encryptedMessage: string;
  decryptionData: string;
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
