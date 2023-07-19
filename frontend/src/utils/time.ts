const convertTimeFromStringToNumber = (responseDate: string) => {
  const dateComponents = responseDate.split(' ');
  const datePieces = dateComponents[0].split('-');
  const timePieces = dateComponents[1].split(':');
  return Number([...datePieces, ...timePieces].join(''));
};

export const checkClosedPost = (startTime: string, endTime: string) => {
  const startTimeNumber = convertTimeFromStringToNumber(startTime);
  const endTimeNumber = convertTimeFromStringToNumber(endTime);
  return startTimeNumber >= endTimeNumber;
};
