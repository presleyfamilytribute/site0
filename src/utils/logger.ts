export const logger = {
  log: (message: string, ...optionalParams: unknown[]) => {
    console.log(`[LOG]: ${message}`, ...optionalParams);
  },
  error: (message: string, ...optionalParams: unknown[]) => {
    console.error(`[ERROR]: ${message}`, ...optionalParams);
  },
};