export const deleteOverlappingNewLine = (text: string) => {
  return text.replace(/(\n{2,})/g, '\n');
};
