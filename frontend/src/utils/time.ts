const convertNowTimeToNumber = () => {
  const now = new Date();

  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');

  return Number(`${year}${month}${day}${hours}${minutes}`);
};

const convertTimeFromStringToNumber = (date: string) => {
  const dateComponents = date.split(' ');
  const datePieces = dateComponents[0].split('-');
  const timePieces = dateComponents[1].split(':');
  return Number([...datePieces, ...timePieces].join(''));
};

export const checkClosedPost = (deadline: string) => {
  const nowTimeNumber = convertNowTimeToNumber();
  const endTimeNumber = convertTimeFromStringToNumber(deadline);
  return nowTimeNumber >= endTimeNumber;
};
