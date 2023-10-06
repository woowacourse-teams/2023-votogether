import React, { useEffect, useRef, PropsWithChildren } from 'react';

import { Size } from '@type/style';

import SquareButton from '../SquareButton';

import * as S from './style';

interface ButtonProps {
  text: string;
  handleClick: () => void;
}

interface ModalProps extends PropsWithChildren {
  title?: string;
  size: Size;
  primaryButton: ButtonProps;
  secondaryButton: ButtonProps;
}

export default function Modal({
  title,
  children,
  size,
  primaryButton,
  secondaryButton,
}: ModalProps) {
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
    <S.All>
      <S.HiddenCloseButton
        onClick={secondaryClick}
        tabIndex={0}
        aria-label="팝업 창 닫기"
      ></S.HiddenCloseButton>
      <S.Backdrop ref={BackDropRef}></S.Backdrop>
      <S.Container tabIndex={0} size={size}>
        <S.Title aria-label={`제목: ${title}`} tabIndex={0}>
          {title}
        </S.Title>
        <S.Body>{children}</S.Body>
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
      </S.Container>
    </S.All>
  );
}
