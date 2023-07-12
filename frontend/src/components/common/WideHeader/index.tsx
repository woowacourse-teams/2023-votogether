import LogoButton from '../LogoButton';
import SearchBar from '../SearchBar';

import * as S from './style';

export default function WideHeader() {
  return (
    <S.Container>
      <LogoButton inclusion="full" />
      <SearchBar size="sm" />
    </S.Container>
  );
}
