export const getErrorMessage = (e: any): string => {
  let message = "Unknown error.";
  if (e instanceof Error) {
    message = e.message;
  }
  return message;
};
