export const getTrimmedWord = (word: string) => {
  return word
    .split(' ')
    .map(word => word.trim())
    .filter(word => word !== '')
    .join(' ');
};
