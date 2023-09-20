export const deleteOverlappingNewLine = (text: string) => {
  return text.replace(/(\n{5,})/g, '\n\n\n\n\n');
};
