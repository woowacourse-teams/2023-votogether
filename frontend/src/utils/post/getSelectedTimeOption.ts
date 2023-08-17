import { DeadlineOption } from '@components/PostForm/constants';

export const getSelectedTimeOption = ({
  day,
  hour,
  minute,
}: {
  day: number;
  hour: number;
  minute: number;
}): DeadlineOption | '사용자지정' | null => {
  if (day === 0 && hour === 0 && minute === 0) return null;
  if (day === 0 && hour === 0 && minute === 10) return '10분';
  if (day === 0 && hour === 0 && minute === 30) return '30분';
  if (day === 0 && hour === 1 && minute === 0) return '1시간';
  if (day === 0 && hour === 6 && minute === 0) return '6시간';
  if (day === 1 && hour === 0 && minute === 0) return '1일';

  return '사용자지정';
};
