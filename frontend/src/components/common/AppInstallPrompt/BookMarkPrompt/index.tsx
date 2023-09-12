import arrowUp from '@assets/arrow-up-on-square.svg';
import logo from '@assets/logo.svg';
import cancel from '@assets/x_mark_black.svg';

import * as S from './style';

interface BookMarkPromptProps {
  handleCancelClick: () => void;
}

export default function BookMarkPrompt({ handleCancelClick }: BookMarkPromptProps) {
  return (
    <S.Container>
      <S.Content>
        <S.Header>
          <S.LogoImage src={logo} alt="보투게더 로고 이미지" />
          <S.HeaderContent>
            <S.HeaderTop>
              <S.Title>VoTogether</S.Title>
              <S.CancelButton onClick={handleCancelClick}>
                <S.IconImage src={cancel} alt="취소 아이콘" />
              </S.CancelButton>
            </S.HeaderTop>
            <S.Description>
              VoTogether는 앱처럼 원활히 사용할 수 있습니다. 설치하시겠습니까?
            </S.Description>
          </S.HeaderContent>
        </S.Header>
        <S.DescriptionWrapper>
          <S.Description>
            브라우저 메뉴바에서 <S.IconImage src={arrowUp} alt="추가하기 아이콘" /> 모양 버튼을 눌러
            "홈 화면에 추가하기"를 통해 설치를 할 수 있습니다.
          </S.Description>
        </S.DescriptionWrapper>
      </S.Content>
    </S.Container>
  );
}
