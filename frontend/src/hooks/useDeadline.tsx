import { useState } from 'react';

import { DHMTime, StringDate } from '@type/time';

import { DeadlineOptionInfo, DeadlineOptionName } from '@components/PostForm/constants';

import { MAX_DEADLINE } from '@constants/policy';

import { addTimeToDate } from '@utils/post/addTimeToDate';
import { calculateDeadlineDHMTime } from '@utils/post/calculateDeadlineDHMTime';
import { getSelectedDHMTimeOption } from '@utils/post/getSelectedTimeOption';

export const useDeadline = (createdAt?: StringDate, deadline?: StringDate) => {
  const baseTime = createdAt ? new Date(createdAt) : new Date();
  const deadlineDHMTime = calculateDeadlineDHMTime(createdAt, deadline);

  const [userSelectedDHMTime, setUserSelectedDHMTime] = useState<DHMTime>(deadlineDHMTime);
  const [selectedTimeOption, setSelectedTimeOption] = useState<
    DeadlineOptionName | '사용자지정' | null
  >(getSelectedDHMTimeOption(deadlineDHMTime));

  const changeDeadlineOption = (option: DeadlineOptionInfo) => {
    setUserSelectedDHMTime(option.time);
    setSelectedTimeOption(option.name);
  };

  const changeDeadlinePicker = ({
    option,
    updatedTime,
  }: {
    option: string;
    updatedTime: number;
  }) => {
    setUserSelectedDHMTime(prev => {
      const newDHMTime = {
        ...prev,
        [option]: updatedTime,
      };

      setSelectedTimeOption(getSelectedDHMTimeOption(newDHMTime));
      return newDHMTime;
    });
  };

  const resetDeadline = () => {
    const updatedTime = {
      day: 0,
      hour: 0,
      minute: 0,
    };

    setUserSelectedDHMTime(updatedTime);
    setSelectedTimeOption(null);
  };

  const getFinalDeadline = () => {
    return addTimeToDate(userSelectedDHMTime, baseTime);
  };

  const getLimitDeadline = () => {
    const maxTime = { day: MAX_DEADLINE, hour: 0, minute: 0 };

    return addTimeToDate(maxTime, baseTime);
  };

  return {
    userSelectedDHMTime,
    selectedTimeOption,
    changeDeadlineOption,
    changeDeadlinePicker,
    resetDeadline,
    getFinalDeadline,
    getLimitDeadline,
  };
};
