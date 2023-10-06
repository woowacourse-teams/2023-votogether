import React from 'react';

import * as S from './style';

interface ProgressBarProps {
  percent: number;
  isSelected: boolean;
}

export default function ProgressBar({ percent, isSelected }: ProgressBarProps) {
  return (
    <S.Container>
      <S.Bar $progress={percent} $isSelected={isSelected} />
    </S.Container>
  );
}
