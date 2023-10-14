import { MouseEvent } from 'react';
import { useNavigate } from 'react-router-dom';

import { useToggle } from '@hooks';

import { PATH } from '@constants/path';

import IconButton from '../IconButton';
import LogoButton from '../LogoButton';
import SearchBar from '../SearchBar';

import * as S from './style';

interface NarrowMainHeaderProps {
  handleCategoryOpenClick: () => void;
  handleAlarmOpenClick: () => void;
}

export default function NarrowMainHeader({
  handleCategoryOpenClick,
  handleAlarmOpenClick,
}: NarrowMainHeaderProps) {
  const {
    isOpen: isSearchInputOpen,
    openComponent: openSearchInput,
    closeComponent: closeSearchInput,
  } = useToggle();

  const navigate = useNavigate();

  const movePostListPage = () => {
    navigate('/');
  };

  const moveRankingPage = () => {
    navigate(PATH.RANKING);
  };

  return isSearchInputOpen ? (
    <S.Background onClick={closeSearchInput}>
      <S.Container onClick={(event: MouseEvent) => event.stopPropagation()}>
        <SearchBar size="free" isOpen={isSearchInputOpen} autoFocus />
      </S.Container>
    </S.Background>
  ) : (
    <S.Container>
      <IconButton category="category" onClick={handleCategoryOpenClick} />
      <LogoButton content="icon" onClick={movePostListPage} />
      <IconButton category="search" onClick={openSearchInput} />
      <IconButton category="alarm" onClick={handleAlarmOpenClick} />
      <IconButton category="ranking" onClick={moveRankingPage} />
    </S.Container>
  );
}
