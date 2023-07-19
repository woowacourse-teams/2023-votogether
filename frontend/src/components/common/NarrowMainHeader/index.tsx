import IconButton from '../IconButton';
import LogoButton from '../LogoButton';

import * as S from './style';

interface NarrowMainHeaderProps {
  handleMenuOpenClick: () => void;
}

export default function NarrowMainHeader({ handleMenuOpenClick }: NarrowMainHeaderProps) {
  return (
    <S.Container>
      <IconButton category="category" onClick={handleMenuOpenClick} />
      <LogoButton content="icon" />
      <IconButton category="search" />
    </S.Container>
  );
}
