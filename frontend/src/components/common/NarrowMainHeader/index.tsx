import IconButton from '../IconButton';
import LogoButton from '../LogoButton';

import * as S from './style';

interface NarrowMainHeaderProps {
  handleMenuOpenClick: () => void;
  handleLogoClick: () => void;
}

export default function NarrowMainHeader({
  handleMenuOpenClick,
  handleLogoClick,
}: NarrowMainHeaderProps) {
  return (
    <S.Container>
      <IconButton category="category" onClick={handleMenuOpenClick} />
      <LogoButton content="icon" onClick={handleLogoClick} />
      <IconButton category="search" />
    </S.Container>
  );
}
