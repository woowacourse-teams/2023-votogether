import { MouseEvent } from 'react';
import { useNavigate } from 'react-router-dom';

import { useToggle } from '@hooks';

import { PATH } from '@constants/path';

import AlarmIconButton from '../ActiveContainer';
import IconButton from '../IconButton';
import LogoButton from '../LogoButton';
import SearchBar from '../SearchBar';

import * as S from './style';

interface NarrowMainHeaderProps {
  handleCategoryOpenClick: () => void;
  handleAlarmOpenClick: () => void;
  isAlarmActive?: boolean;
}

export default function NarrowMainHeader({
  handleCategoryOpenClick,
  handleAlarmOpenClick,
  isAlarmActive,
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
      <AlarmIconButton isActive={isAlarmActive ?? false}>
        <IconButton category="alarm" onClick={handleAlarmOpenClick} />
      </AlarmIconButton>
      <IconButton category="ranking" onClick={moveRankingPage} />
    </S.Container>
  );
}
