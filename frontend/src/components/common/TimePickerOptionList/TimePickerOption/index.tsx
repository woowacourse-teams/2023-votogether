import React, { useEffect, useRef, Dispatch } from 'react';

import { timeBoxChildHeight } from './constants';
import * as S from './style';

interface TimePickerOptionProps {
  handlePickTime: Dispatch<React.SetStateAction<number>>;
  time: number;
  timeUnit: number;
}

export default function TimePickerOption({
  handlePickTime,
  time,
  timeUnit,
}: TimePickerOptionProps) {
  const timeBoxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timeBox = timeBoxRef.current;

    if (!timeBox) return;

    const handleScroll = () => {
      const pickedTimeIndex = Math.floor(
        (timeBox.scrollTop + timeBox.clientHeight / 2) / timeBoxChildHeight
      );

      if (pickedTimeIndex >= 0 && pickedTimeIndex < timeUnit) {
        handlePickTime(pickedTimeIndex);
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
        <S.Time key={index} isPicked={time === index}>
          {index}
        </S.Time>
      ))}
    </S.TimeBox>
  );
}
