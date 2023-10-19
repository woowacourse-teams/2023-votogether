import { useState } from 'react';

import mascot from '@assets/dangseon.png';

import * as S from './style';

//이벤트를 위한 코드
export default function EventMascot() {
  const [isVisible, setIsVisible] = useState(true);

  const handleClick = () => {
    setIsVisible(false);
  };

  return (
    <S.Container onClick={handleClick} $isVisible={isVisible}>
      <S.Image src={mascot} />
    </S.Container>
  );
}
