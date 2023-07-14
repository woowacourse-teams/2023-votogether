import IconButton from '../IconButton';
import LogoButton from '../LogoButton';

import * as S from './style';

export default function NarrowMainHeader() {
  return (
    <S.Container>
      <IconButton category="category" />
      <LogoButton content="icon" />
      <IconButton category="search" />
    </S.Container>
  );
}
