import { PropsWithChildren } from 'react';

import SquareButton from '@components/common/SquareButton';

import * as S from './style';

interface CommentModalProps extends PropsWithChildren {
  title: string;
  secondaryText: string;
  primaryText: string;
  primaryClick: () => void;
  secondaryClick: () => void;
}

export default function CommentModal({
  title,
  primaryText,
  primaryClick,
  secondaryText,
  secondaryClick,
  children,
}: CommentModalProps) {
  return (
    <S.Container>
      <S.ModalContainer>
        <S.Title>{title}</S.Title>
        {children}
        <S.ButtonContainer>
          <S.ButtonWrapper>
            <SquareButton onClick={secondaryClick} theme="gray">
              {secondaryText}
            </SquareButton>
          </S.ButtonWrapper>
          <S.ButtonWrapper>
            <SquareButton onClick={primaryClick} theme="fill">
              {primaryText}
            </SquareButton>
          </S.ButtonWrapper>
        </S.ButtonContainer>
      </S.ModalContainer>
    </S.Container>
  );
}
