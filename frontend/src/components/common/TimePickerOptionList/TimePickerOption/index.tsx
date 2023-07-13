import React, { useEffect, useRef } from 'react';

import { timeBoxChildHeight } from './constants';
import * as S from './style';

interface TimePickerOptionProps {
  handlePickTime: (option: string, updatedTime: number) => void;
  currentTime: number;
  option: string;
}

const unit: { [key: string]: number } = {
  day: 3,
  hour: 24,
  minute: 60,
};

export default function TimePickerOption({
  handlePickTime,
  currentTime,
  option,
}: TimePickerOptionProps) {
  // const dueDate = useContext()
  const timeUnit = unit[option];
  const timeBoxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timeBox = timeBoxRef.current;

    if (!timeBox) return;

    const handleScroll = () => {
      const pickedTimeIndex = Math.floor(
        (timeBox.scrollTop + timeBox.clientHeight / 2) / timeBoxChildHeight
      );

      if (pickedTimeIndex >= 0 && pickedTimeIndex < timeUnit) {
        handlePickTime(option, pickedTimeIndex);
      }
    };

    timeBox.addEventListener('scroll', handleScroll);

    return () => {
      timeBox.removeEventListener('scroll', handleScroll);
    };
  }, [handlePickTime, timeUnit]);

  return (
    <S.TimeBox ref={timeBoxRef}>
      {Array.from({ length: timeUnit }).map((_, index) => (
        <S.Time key={index} isPicked={currentTime === index}>
          {index}
        </S.Time>
      ))}
    </S.TimeBox>
  );
}
