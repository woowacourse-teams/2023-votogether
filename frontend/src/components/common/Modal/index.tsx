import React, { useEffect, useRef, Dispatch } from 'react';

import { ModalSizeType } from '@type/modalSize';

import * as S from './style';

interface ModalProps {
  onModalClose: Dispatch<React.SetStateAction<boolean>>;
  children: React.JSX.Element;
  size: ModalSizeType;
}

export default function Modal({ onModalClose, children, size }: ModalProps) {
  const BackDropRef = useRef<HTMLDivElement>(null);

  const closeModal = () => {
    onModalClose(false);
  };

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (e.target === BackDropRef.current) {
        closeModal();
      }
    };

    document.addEventListener('click', handler);

    return () => document.removeEventListener('click', handler);
  }, [BackDropRef, closeModal]);

  return (
    <S.All>
      <S.Backdrop ref={BackDropRef}></S.Backdrop>
      <S.Container size={size}>{children}</S.Container>
    </S.All>
  );
}
