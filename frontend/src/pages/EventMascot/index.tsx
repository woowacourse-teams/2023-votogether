import { useState } from 'react';

import mascotYo from '@assets/dangseon-yo.png';
import mascot from '@assets/dangseon.png';

import * as S from './style';

//이벤트를 위한 코드
export default function EventMascot({ type }: { type: 'ma' | 'mayo' }) {
  const [isVisible, setIsVisible] = useState(true);

  const handleClick = () => {
    setIsVisible(false);
  };

  return (
    <S.Container onClick={handleClick} $isVisible={isVisible}>
      <S.Image src={type === 'ma' ? mascot : mascotYo} />
    </S.Container>
  );
}
