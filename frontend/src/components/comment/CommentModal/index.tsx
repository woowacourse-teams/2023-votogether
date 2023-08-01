import { PropsWithChildren } from 'react';

import SquareButton from '@components/common/SquareButton';

import * as S from './style';

interface ButtonProps {
  text: string;
  handleClick: () => void;
}

interface CommentModalProps extends PropsWithChildren {
  title: string;
  primaryButton: ButtonProps;
  secondaryButton: ButtonProps;
}

export default function CommentModal({
  title,
  primaryButton,
  secondaryButton,
  children,
}: CommentModalProps) {
  const { text: primaryText, handleClick: primaryClick } = primaryButton;
  const { text: secondaryText, handleClick: secondaryClick } = secondaryButton;

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
