import React, { useEffect, useRef } from 'react';

import { Size } from '@type/style';

import * as S from './style';

interface ModalProps {
  onModalClose: () => void;
  children: React.JSX.Element;
  size: Size;
}

export default function Modal({ onModalClose, children, size }: ModalProps) {
  const BackDropRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (e.target === BackDropRef.current) {
        onModalClose();
      }
    };

    document.addEventListener('click', handler);

    return () => document.removeEventListener('click', handler);
  }, [BackDropRef, onModalClose]);

  return (
    <S.All>
      <S.HiddenCloseButton
        onClick={onModalClose}
        tabIndex={0}
        aria-label="팝업 창 닫기"
      ></S.HiddenCloseButton>
      <S.Backdrop ref={BackDropRef}></S.Backdrop>
      <S.Container tabIndex={0} size={size}>
        {children}
      </S.Container>
    </S.All>
  );
}
