import { useEffect, useRef } from 'react';

import { TIME_UNIT, TIMEBOX_CHILD_HEIGHT } from './constants';
import * as S from './style';

interface TimePickerOptionProps {
  currentTime: number;
  option: string;
  handlePickTime: (option: string, updatedTime: number) => void;
}

export default function TimePickerOption({
  currentTime,
  option,
  handlePickTime,
}: TimePickerOptionProps) {
  const timeUnit = TIME_UNIT[option];
  const timeBoxRef = useRef<HTMLDivElement>(null);
  const timeBoxChildRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timeBox = timeBoxRef.current;
    const timeBoxChild = timeBoxChildRef.current;
    if (!timeBox || !timeBoxChild) return;

    timeBox.scrollTop = timeBoxChild.offsetHeight * (currentTime - 1);
  }, []);

  useEffect(() => {
    const timeBox = timeBoxRef.current;

    if (!timeBox) return;
    window.console.log(timeBox.scrollTop);

    if (currentTime === 0) timeBox.scrollTop = 0;

    const handleScroll = () => {
      const pickedTimeIndex = Math.floor(
        (timeBox.scrollTop + timeBox.clientHeight / 2) / TIMEBOX_CHILD_HEIGHT
      );

      if (pickedTimeIndex >= 0 && pickedTimeIndex < timeUnit) {
        handlePickTime(option, pickedTimeIndex);
      }
    };

    timeBox.addEventListener('scroll', handleScroll);

    return () => {
      timeBox.removeEventListener('scroll', handleScroll);
    };
  }, [currentTime, handlePickTime, option, timeUnit]);

  return (
    <S.Container>
      <S.PickedTimeOverlay />
      <S.TimeBox ref={timeBoxRef}>
        {Array.from({ length: timeUnit }).map((_, index) => (
          <S.Time
            key={index}
            ref={index === currentTime ? timeBoxChildRef : null}
            $isPicked={currentTime === index}
          >
            {index}
          </S.Time>
        ))}
        <S.Empty />
      </S.TimeBox>
    </S.Container>
  );
}
