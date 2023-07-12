import React, { useEffect, useRef } from 'react';

import { ModalSizeType } from '@type/modalSize';

import * as S from './style';

interface ModalProps {
  onModalClose: () => void;
  children: React.JSX.Element;
  size: ModalSizeType;
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
      <S.Backdrop ref={BackDropRef}></S.Backdrop>
      <S.Container size={size}>{children}</S.Container>
    </S.All>
  );
}
