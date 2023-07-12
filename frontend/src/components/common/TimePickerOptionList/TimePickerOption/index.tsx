import React, { useEffect, useRef, Dispatch } from 'react';

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
    const handleScroll = () => {
      const timeBox = timeBoxRef.current;
      // clientHeight는 항상 100px로 고정되어 있음 (TimeBox의 높이가 100px 이기 때문)
      if (timeBox) {
        const pickedTimeIndex = Math.floor((timeBox.scrollTop + timeBox.clientHeight / 2) / 50);

        if (pickedTimeIndex >= 0 && pickedTimeIndex < timeBox.children.length) {
          handlePickTime(pickedTimeIndex);
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
