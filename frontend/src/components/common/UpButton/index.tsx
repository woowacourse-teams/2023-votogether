import React, { useState } from 'react';

import chevronUp from '@assets/chevron_up_primary.svg';
import mascotYo from '@assets/dangseon-yo.png';

import * as S from './style';

interface UpButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export default function UpButton({ ...rest }: UpButtonProps) {
  const [count, setCount] = useState(0);

  //이벤트를 위한 코드
  const handleLogoClick = () => {
    if (count > 5) return;

    setCount(count + 1);
  };
  const handleClick = () => {
    setCount(0);
  };

  return (
    <>
      <S.Button {...rest}>
        <img src={chevronUp} alt="페이지 최상단으로 스크롤 올리기" onClick={handleLogoClick} />
      </S.Button>
      <S.Image src={mascotYo} onClick={handleClick} $isMoving={count > 5} />
    </>
  );
}
