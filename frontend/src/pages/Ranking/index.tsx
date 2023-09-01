import { useNavigate } from 'react-router-dom';

import { useToggleSwitch } from '@hooks/useToggleSwitch';

import IconButton from '@components/common/IconButton';
import Layout from '@components/common/Layout';
import NarrowTemplateHeader from '@components/common/NarrowTemplateHeader';
import ToggleSwitch from '@components/common/ToggleSwitch';

import PassionUser from './PassionUser';
import PopularPost from './PopularPost';
import * as S from './style';

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
          {selectedButton === '열정 유저' && <PassionUser />}
          {selectedButton === '인기글 유저' && <PopularPost />}
        </S.ContentContainer>
      </S.Container>
    </Layout>
  );
}
