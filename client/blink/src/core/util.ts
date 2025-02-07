export const getErrorMessage = (e: any): string => {
  let message = "Unknown error.";
  if (e instanceof Error) {
    message = e.message;
  }
  return message;
};

export const formatDate = (date: number): string => {
  return new Intl.DateTimeFormat(navigator.language, {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).format(new Date(date));
};

export const catchAsyncError = <T>(
  promise: Promise<T>
): Promise<[undefined, T] | [Error]> => {
  return promise
    .then((data) => {
      return [undefined, data] as [undefined, T];
    })
    .catch((error: Error) => {
      return [error];
    });
};

export const catchError = <T>(
  fn: (...args: any[]) => T,
  ...args: any[]
): [undefined, T] | [Error] => {
  try {
    const result = fn(...args);
    return [undefined, result];
  } catch (error) {
    return [error instanceof Error ? error : new Error(String(error))];
  }
};
