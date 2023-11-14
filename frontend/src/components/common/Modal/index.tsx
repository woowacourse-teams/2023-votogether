import { useEffect, useRef, PropsWithChildren } from 'react';

import { ModalButton } from '@type/modalButton';
import { Size } from '@type/style';

import SquareButton from '../SquareButton';

import * as S from './style';

interface ModalProps extends PropsWithChildren {
  title?: string;
  size?: Size;
  primaryButton: ModalButton;
  secondaryButton: ModalButton;
  handleModalClose: () => void;
}

export default function Modal({
  title,
  children,
  size = 'sm',
  primaryButton,
  secondaryButton,
  handleModalClose,
}: ModalProps) {
  const BackDropRef = useRef<HTMLDivElement>(null);

  const { text: primaryText, handleClick: primaryClick, ...primaryButtonRest } = primaryButton;
  const {
    text: secondaryText,
    handleClick: secondaryClick,
    ...secondaryButtonRest
  } = secondaryButton;

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (e.target === BackDropRef.current) {
        handleModalClose();
      }
    };

    document.addEventListener('click', handler);

    return () => document.removeEventListener('click', handler);
  }, [BackDropRef, handleModalClose]);

  return (
    <S.All>
      <S.HiddenCloseButton
        onClick={handleModalClose}
        tabIndex={0}
        aria-label="팝업 창 닫기"
      ></S.HiddenCloseButton>
      <S.Backdrop ref={BackDropRef}></S.Backdrop>
      <S.Container tabIndex={0} size={size}>
        <S.Title aria-label={`제목: ${title}`} tabIndex={0}>
          {title}
        </S.Title>
        {children && <S.Body>{children}</S.Body>}
        <S.ButtonContainer>
          <S.ButtonWrapper>
            <SquareButton onClick={secondaryClick} theme="gray" {...secondaryButtonRest}>
              {secondaryText}
            </SquareButton>
          </S.ButtonWrapper>
          <S.ButtonWrapper>
            <SquareButton onClick={primaryClick} theme="fill" {...primaryButtonRest}>
              {primaryText}
            </SquareButton>
          </S.ButtonWrapper>
        </S.ButtonContainer>
      </S.Container>
    </S.All>
  );
}
