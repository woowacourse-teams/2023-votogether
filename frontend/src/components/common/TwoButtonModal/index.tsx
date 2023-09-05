import { PropsWithChildren, useEffect, useRef } from 'react';

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

export default function TwoButtonModal({
  title,
  primaryButton,
  secondaryButton,
  children,
}: CommentModalProps) {
  const BackDropRef = useRef<HTMLDivElement>(null);

  const { text: primaryText, handleClick: primaryClick } = primaryButton;
  const { text: secondaryText, handleClick: secondaryClick } = secondaryButton;

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (e.target === BackDropRef.current) {
        secondaryClick();
      }
    };

    document.addEventListener('click', handler);

    return () => document.removeEventListener('click', handler);
  }, [BackDropRef, secondaryClick]);

  return (
    <S.Container ref={BackDropRef}>
      <S.ModalContainer>
        <S.Title aria-label={`제목: ${title}`} tabIndex={0}>
          {title}
        </S.Title>
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
