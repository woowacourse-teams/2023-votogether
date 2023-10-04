import { DHMTime } from '@type/time';

import { MAX_DEADLINE } from '@constants/policy';

import { addTimeToDate } from '@utils/post/addTimeToDate';

//시간 수정을 할 수 없다면 true
export const checkIrreplaceableTime = (addTime: DHMTime, createTime: string) => {
  const transCreateTime = createTime.split('-').join('/');
  const changedDeadline = addTimeToDate(addTime, new Date(transCreateTime));

  //마감시한이 0시간 0분 0초 추가된다면 거절
  if (Object.values(addTime).every(time => time === 0)) return true;

  const limitDeadline = addTimeToDate(
    { day: MAX_DEADLINE, hour: 0, minute: 0 },
    new Date(transCreateTime)
  )!;
  const changedDeadlineNumber = Number(new Date(changedDeadline));
  const limitDeadlineNumber = Number(new Date(limitDeadline));

  //작성일시로부터 마감시간 최대일시보다 지정하고자 하는 일시가 크다면 거절
  if (changedDeadlineNumber > limitDeadlineNumber) return true;

  //지금 일시보다 지정하고자 하는 일시가 작다면 거절
  return changedDeadlineNumber <= Date.now();
};
