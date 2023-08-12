import arrowUp from '@assets/arrow-up-on-square.svg';
import logo from '@assets/logo.svg';
import cancel from '@assets/x_mark_black.svg';

import * as S from './style';

interface MobileInstallPromptProps {
  platform: 'ios' | 'android';
  handleInstallClick: () => void;
  handleCancelClick: () => void;
}

export default function MobileInstallPrompt({
  platform,
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
              VoTogether는 앱에서 원활히 사용할 수 있습니다. 설치하시겠습니까?
            </S.Description>
          </S.HeaderContent>
        </S.Header>
        {platform === 'ios' && (
          <S.IosContainer>
            <S.IconImage src={arrowUp} alt="추가하기 아이콘" />
            <S.Description>버튼을 눌러 홈 화면에 추가하기를 통해 설치를 해주세요</S.Description>
          </S.IosContainer>
        )}
        {platform === 'android' && (
          <S.InstallButton onClick={handleInstallClick}>홈 화면에 추가</S.InstallButton>
        )}
      </S.Content>
    </S.Container>
  );
}
