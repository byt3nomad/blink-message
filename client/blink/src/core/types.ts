export type EncryptMessageResult = {
  encryptedMessage: string;
  decryptionData: string;
};

export type DecryptedMessageResult = DecryptMessageSuccess | ErrorResult;

export type DecryptMessageSuccess = {
  success: true;
  decryptedMessage: string;
};

export type ErrorResult = {
  success: false;
  errorType: ErrorType;
  errorMessage: string;
};

export enum ErrorType {
  MessageDecryptionFailed,
  InvalidPassword,
}

export const ErrorMessages: Record<ErrorType, string> = {
  [ErrorType.MessageDecryptionFailed]: "Decryption of the message failed.",
  [ErrorType.InvalidPassword]: "The provided password is invalid.",
};

export const getError = (type: ErrorType): ErrorResult => {
  return {
    success: false,
    errorType: type,
    errorMessage: ErrorMessages[type],
  };
};
