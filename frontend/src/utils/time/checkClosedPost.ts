import { StringDate } from '@type/time';

export const checkClosedPost = (deadline: StringDate) => {
  return Date.now() >= Number(new Date(deadline));
};
