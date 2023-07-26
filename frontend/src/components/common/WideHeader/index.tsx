import LogoButton from '../LogoButton';
import SearchBar from '../SearchBar';

import * as S from './style';

export default function WideHeader({ handleLogoClick }: { handleLogoClick: () => void }) {
  return (
    <S.Container>
      <LogoButton content="full" onClick={handleLogoClick} />
      <SearchBar size="sm" />
    </S.Container>
  );
}
