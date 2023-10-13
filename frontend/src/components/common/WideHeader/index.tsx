import { MouseEvent, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import { useToggle } from '@hooks';

import { PATH } from '@constants/path';

import IconButton from '../IconButton';
import LogoButton from '../LogoButton';
import SearchBar from '../SearchBar';
import ToolTip from '../ToolTip';

import AlarmContainer from './AlarmContainer';
import * as S from './style';

export default function WideHeader() {
  const navigate = useNavigate();
  const { isOpen, openComponent, closeComponent } = useToggle();
  const toolTipRef = useRef<HTMLDivElement | null>(null);

  const movePostListPage = () => {
    navigate('/');
  };

  const moveRankingPage = () => {
    navigate(PATH.RANKING);
  };

  const handleToolTipClick = (e: MouseEvent<HTMLDivElement>) => {
    const targetElement = e.target;
    targetElement === toolTipRef.current && closeComponent();
  };

  return (
    <S.Container>
      <S.LogoWrapper>
        <LogoButton content="full" onClick={movePostListPage} />
      </S.LogoWrapper>
      <S.Wrapper>
        <SearchBar size="sm" />
        <IconButton category="alarm" onClick={openComponent} />
        <IconButton category="ranking" onClick={moveRankingPage} />
      </S.Wrapper>
      {isOpen && (
        <S.ToolTipBackdrop onClick={handleToolTipClick} ref={toolTipRef}>
          <ToolTip size="free">
            <AlarmContainer />
          </ToolTip>
        </S.ToolTipBackdrop>
      )}
    </S.Container>
  );
}
