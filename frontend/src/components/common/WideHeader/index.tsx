import { useNavigate } from 'react-router-dom';

import { PATH } from '@constants/path';

import IconButton from '../IconButton';
import LogoButton from '../LogoButton';
import SearchBar from '../SearchBar';

import * as S from './style';

export default function WideHeader() {
  const navigate = useNavigate();

  const movePostListPage = () => {
    navigate('/');
  };

  const moveRankingPage = () => {
    navigate(PATH.RANKING);
  };

  return (
    <S.Container>
      <S.LogoWrapper>
        <LogoButton content="full" onClick={movePostListPage} />
      </S.LogoWrapper>
      <S.Wrapper>
        <SearchBar size="sm" />
        <IconButton category="alarm" onClick={moveRankingPage} />
        <IconButton category="ranking" onClick={moveRankingPage} />
      </S.Wrapper>
    </S.Container>
  );
}
