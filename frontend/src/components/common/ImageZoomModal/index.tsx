import { ForwardedRef, KeyboardEvent, MouseEvent, forwardRef } from 'react';

import * as S from './style';

interface ImageZoomModalProps {
  src: string;
  handleCloseClick: (event: MouseEvent<HTMLDialogElement>) => void;
  handleCloseKeyDown: (event: KeyboardEvent<HTMLDialogElement>) => void;
  closeDialog: () => void;
}

const ImageZoomModal = forwardRef(function ImageZoomModal(
  { src, handleCloseClick, handleCloseKeyDown, closeDialog }: ImageZoomModalProps,
  ref: ForwardedRef<HTMLDialogElement>
) {
  return (
    <S.Dialog ref={ref} onKeyDown={handleCloseKeyDown} onClick={handleCloseClick}>
      <S.CloseButton onClick={closeDialog}>x</S.CloseButton>
      <S.Image src={src}></S.Image>;
    </S.Dialog>
  );
});

export default ImageZoomModal;
