import IconButton from '../IconButton';
import LogoButton from '../LogoButton';

import * as S from './style';

export default function NarrowOriginHeader() {
  return (
    <S.Container>
      <IconButton category="category" />
      <LogoButton inclusion="icon" />
      <IconButton category="search" />
    </S.Container>
  );
}
