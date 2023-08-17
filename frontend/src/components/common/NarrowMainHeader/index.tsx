import { MouseEvent } from 'react';

import { useToggle } from '@hooks/useToggle';

import IconButton from '../IconButton';
import LogoButton from '../LogoButton';
import SearchBar from '../SearchBar';

import * as S from './style';

interface NarrowMainHeaderProps {
  handleMenuOpenClick: () => void;
  handleLogoClick: () => void;
}

export default function NarrowMainHeader({
  handleMenuOpenClick,
  handleLogoClick,
}: NarrowMainHeaderProps) {
  const {
    isOpen: isSearchInputOpen,
    openComponent: openSearchInput,
    closeComponent: closeSearchInput,
  } = useToggle();

  return isSearchInputOpen ? (
    <S.Background onClick={closeSearchInput}>
      <S.Container onClick={(event: MouseEvent) => event.stopPropagation()}>
        <SearchBar size="free" isOpen={isSearchInputOpen} autoFocus />
      </S.Container>
    </S.Background>
  ) : (
    <S.Container>
      <IconButton category="category" onClick={handleMenuOpenClick} />
      <LogoButton content="icon" onClick={handleLogoClick} />
      <IconButton category="search" onClick={openSearchInput} />
    </S.Container>
  );
}
