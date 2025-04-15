export const trackEvent = (event: string, data: Record<string, unknown>): void => {
  console.log(`Event: ${event}`, data);
  // Integrate with Google Analytics or other tools here.
};