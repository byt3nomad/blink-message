export type DecryptedMessageSuccess = {
  success: true;
  message: string;
};
export type DecryptedMessageFailure = {
  success: false;
  error: string;
};
export type DecryptedMessageResult =
  | DecryptedMessageSuccess
  | DecryptedMessageFailure;
