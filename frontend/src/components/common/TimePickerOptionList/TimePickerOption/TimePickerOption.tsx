import React, { useEffect, useRef, Dispatch } from 'react';

import * as S from './style';

export interface TimePickerOptionProps {
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
    const handleScroll = () => {
      const timeBox = timeBoxRef.current;

      if (timeBox) {
        const centerHourIndex = Math.floor((timeBox.scrollTop + timeBox.clientHeight / 2) / 50);

        if (centerHourIndex >= 0 && centerHourIndex < timeBox.children.length) {
          handlePickTime(centerHourIndex);
        }
      }
    };

    const timeBox = timeBoxRef.current;

    if (timeBox) {
      timeBox.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (timeBox) {
        timeBox.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

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
