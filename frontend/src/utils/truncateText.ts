/**
 * 문자열을 maxLength 값을 초과하면 말줄임표를 붙인다
 */
export function truncateText(text: string, maxLength: number = 10) {
  if (text.length <= maxLength) return text;

  return text.slice(0, maxLength) + '...';
}
