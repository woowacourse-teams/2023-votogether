import { useNavigate } from 'react-router-dom';

import Layout from '@components/common/Layout';
import SquareButton from '@components/common/SquareButton';

import { APP_LAUNCH_EVENT } from '@constants/announcement';

import * as S from './style';

export default function Announcement() {
  const navigate = useNavigate();
  const { TITLE } = APP_LAUNCH_EVENT;

  return (
    <Layout isSidebarVisible={false}>
      <S.Wrapper>
        <S.Title>{TITLE}</S.Title>
        <S.MainWrapper>
          <S.Content>
            안녕하세요, 보투게더(VoTogether)는 우아한테크코스에서 진행한 프로젝트로, 투표 중심의
            커뮤니티 플랫폼입니다! <br></br>
            <br></br>🤷‍♂️: 돈이 부족한 취준생인데 알바를 병행하는게 좋을까요, 최대한 절약하는게
            좋을까요? <br></br>🤷‍♀️: 요즘 체력이 떨어지는데 어떤 운동을 시작하면 좋을까요? <br></br>
            🤷‍♂️: 오늘의 점심 메뉴는 뭐가 좋을까?
            <h3>다 함께, 즐겁게, 심플하게! 보투게더를 이용해 보세요!</h3> <br></br>
            <strong>✅ 보투게더(VoTogether)</strong>는 투표를 통해 의견을 공유하고, 일상의 재미를
            발견하는 커뮤니티 서비스예요. <br></br> <br></br>
            <strong>
              🖋 고민이 있으신가요? 글을 써보세요!
              <br></br>
              😆 심심하신가요? 투표를 해보세요! <br></br>❔ 궁금하신가요? 관심사를 탐색해 보세요!
            </strong>
            <br></br>
            <br></br>
            보투게더는 사람들의 다양한 주제로 질문하고 답변하면서, 사람들의 반응을 확인할 수 있다는
            점에서 특별해요. <br></br> 자, 이제 보투게더를 이용할 준비되셨나요? 😆😃<br></br>
            나의 이야기가 우리의 이야기가 되는 공간, 보투게더에서 우리 함께해요! 👍 <br></br>
            보투게더의 탄생🥳을 함께 축하하고 기념하기 위해, 오늘 출시 이벤트를 진행하고 있어요!
            출시 이벤트에서 다음 내역을 달성해주신 이용자 분들께는 기프티콘 등 소정 상품🎁을
            증정하고 있어요✨😆 <br></br>
            <br></br>
            <strong>
              ⭐ 게시글을 가장 많이 작성🖋️해주신 이용자! <br></br>⭐ 작성한 게시글에 가장 많은
              투표✅를 해주신 이용자! <br></br>⭐ 최고 인기글🔥을 작성하신 이용자!
            </strong>
            <br></br>
            <br></br>
            (이벤트 기간은 9월 14일(목)~9월 26일(화)이며, 상품 수령 대상자 명단은 공지사항
            페이지에서 확인 가능합니다🙂)
          </S.Content>
          <S.ButtonWrapper>
            <SquareButton
              theme="fill"
              onClick={() => {
                navigate('/');
              }}
            >
              홈으로 가기
            </SquareButton>
          </S.ButtonWrapper>
        </S.MainWrapper>
      </S.Wrapper>
    </Layout>
  );
}
