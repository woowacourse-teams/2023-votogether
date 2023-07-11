import React from 'react';

import * as S from './style';

interface ProgressBarProps {
  percent: number;
  isSelect: boolean;
}

export default function ProgressBar({ percent, isSelect }: ProgressBarProps) {
  return (
    <S.Container>
      <S.Bar progress={`${percent}%`} isSelect={isSelect} />
    </S.Container>
  );
}
