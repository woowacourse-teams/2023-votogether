import logo from '@assets/logo.svg';
import cancel from '@assets/x_mark_black.svg';

import * as S from './style';

interface MobileInstallPromptProps {
  handleInstallClick: () => void;
  handleCancelClick: () => void;
}

export default function MobileInstallPrompt({
  handleInstallClick,
  handleCancelClick,
}: MobileInstallPromptProps) {
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
        <S.InstallButton onClick={handleInstallClick}>홈 화면에 추가</S.InstallButton>
      </S.Content>
    </S.Container>
  );
}
