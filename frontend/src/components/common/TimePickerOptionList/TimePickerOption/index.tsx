import React, { useEffect, useRef } from 'react';

import { TIME_KOREAN, TIME_UNIT, TIMEBOX_CHILD_HEIGHT } from './constants';
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

  const handleScroll = () => {
    const timeBox = timeBoxRef.current;

    if (!timeBox) return;

    const pickedTimeIndex = Math.round(timeBox.scrollTop / TIMEBOX_CHILD_HEIGHT);

    if (pickedTimeIndex >= 0 && pickedTimeIndex < timeUnit) {
      handlePickTime(option, pickedTimeIndex);
    }
  };

  const handleWheel = (event: React.WheelEvent<HTMLDivElement>) => {
    const timeBox = timeBoxRef.current;

    if (!timeBox) return;

    if (event.deltaY > 0) {
      timeBox.scrollTop += TIMEBOX_CHILD_HEIGHT;
    }
    if (event.deltaY < 0) {
      timeBox.scrollTop -= TIMEBOX_CHILD_HEIGHT;
    }
  };

  useEffect(() => {
    const timeBox = timeBoxRef.current;

    if (!timeBox) return;

    const cancelWheel = (e: WheelEvent) => e.preventDefault();
    timeBox.addEventListener('wheel', cancelWheel, { passive: false });

    return () => timeBox.removeEventListener('wheel', cancelWheel);
  }, []);

  useEffect(() => {
    const timeBox = timeBoxRef.current;
    const timeBoxChild = timeBoxChildRef.current;
    if (!timeBox || !timeBoxChild) return;

    timeBox.scrollTop = timeBoxChild.offsetHeight * currentTime;
  }, []);

  return (
    <S.Container>
      <S.PickedTimeOverlay />
      <S.TimeBox
        aria-label={`현재 선택된 ${TIME_KOREAN[option]}은 ${currentTime} 입니다. 위, 아래 방향키 혹은 터치로 시간 조절이 가능합니다.`}
        tabIndex={0}
        onScroll={handleScroll}
        ref={timeBoxRef}
        onWheel={handleWheel}
      >
        <S.Empty />
        {Array.from({ length: timeUnit }).map((_, index) => (
          <S.Time
            key={index}
            aria-live="polite"
            aria-label={`현재 선택된 ${TIME_KOREAN[option]}은 ${currentTime} 입니다.`}
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
