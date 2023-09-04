import { useNavigate } from 'react-router-dom';

import { PassionUser } from '@type/ranking';

import { useToggleSwitch } from '@hooks/useToggleSwitch';

import IconButton from '@components/common/IconButton';
import Layout from '@components/common/Layout';
import NarrowTemplateHeader from '@components/common/NarrowTemplateHeader';
import ToggleSwitch from '@components/common/ToggleSwitch';

import PassionUserRanking from './PassionUser';
import PopularPost from './PopularPost';
import * as S from './style';

const rankerInfo: PassionUser = {
  rank: 1,
  nickname: 'gil-dong',
  postCount: 11,
  voteCount: 79,
  score: 134,
};

const userRankingInfo: PassionUser = {
  rank: 1111,
  nickname: 'wow',
  postCount: 1,
  voteCount: 3,
  score: 8,
};

const rankerList: PassionUser[] = new Array(10)
  .fill(rankerInfo)
  .map((ranker, index) => ({ ...ranker, rank: index + 1 }));

export default function Ranking() {
  const navigate = useNavigate();
  const { selectedButton, firstButton, secondButton } = useToggleSwitch('열정 유저', '인기글 유저');

  return (
    <Layout isSidebarVisible={true}>
      <S.HeaderWrapper>
        <NarrowTemplateHeader>
          <IconButton
            category="back"
            onClick={() => {
              navigate(-1);
            }}
          />
        </NarrowTemplateHeader>
      </S.HeaderWrapper>
      <S.Container>
        <S.PageHeader>🏆 랭킹 🏆</S.PageHeader>
        <S.ContentContainer>
          <ToggleSwitch
            size="md"
            selectedButton={selectedButton}
            firstButton={firstButton}
            secondButton={secondButton}
          />
          {selectedButton === '열정 유저' && (
            <PassionUserRanking rankerList={rankerList} userRanking={userRankingInfo} />
          )}
          {selectedButton === '인기글 유저' && <PopularPost />}
        </S.ContentContainer>
      </S.Container>
    </Layout>
  );
}
