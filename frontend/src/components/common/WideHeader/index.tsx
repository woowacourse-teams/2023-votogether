import LogoButton from '../LogoButton';
import SearchBar from '../SearchBar';

import * as S from './style';

export default function WideHeader({ clickLogo }: { clickLogo: () => void }) {
  return (
    <S.Container>
      <LogoButton content="full" onClick={clickLogo} />
      <SearchBar size="sm" />
    </S.Container>
  );
}
