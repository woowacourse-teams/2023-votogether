import React from 'react';

import * as S from './style';

export default function Skeleton() {
  return (
    <S.Container>
      <S.FirstBox />
      <S.SecondBox />
      <S.ThirdBox />
    </S.Container>
  );
}
