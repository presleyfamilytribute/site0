export const focusElement = (id: string): void => {
  const element = document.getElementById(id);
  if (element) {
    element.focus();
  }
};