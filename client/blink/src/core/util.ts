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
