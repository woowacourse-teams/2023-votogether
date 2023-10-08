import { useNavigate } from 'react-router-dom';

import LogoButton from '../LogoButton';
import SquareButton from '../SquareButton';

import * as S from './style';

export interface ErrorItemProps {
  text?: string;
  haveIcon?: boolean;
  retryInteraction?: boolean;
  homeInteraction?: boolean;
}

export default function ErrorItem({
  text = '요청하신 데이터를 불러오는데 실패했습니다.',
  haveIcon = false,
  retryInteraction = false,
  homeInteraction = false,
}: ErrorItemProps) {
  const navigate = useNavigate();

  return (
    <>
      <S.Wrapper>
        {haveIcon && <LogoButton content="icon" style={{ width: '80px', height: '80px' }} />}
        <S.Title>{text}</S.Title>
        {retryInteraction && (
          <S.Description>
            문제가 지속되는 경우 votogether2023@gmail.com 로 문의해주세요.
          </S.Description>
        )}
        <S.ButtonContainer>
          {homeInteraction && (
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
          )}
          {retryInteraction && (
            <S.ButtonWrapper>
              <SquareButton
                onClick={() => window.location.reload()}
                aria-label="다시 시도"
                theme="blank"
              >
                <span>다시 시도</span>
              </SquareButton>
            </S.ButtonWrapper>
          )}
        </S.ButtonContainer>
      </S.Wrapper>
    </>
  );
}
