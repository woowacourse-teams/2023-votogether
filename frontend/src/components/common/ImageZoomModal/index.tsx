import { ForwardedRef, MouseEvent, forwardRef } from 'react';

import cancel from '@assets/x_mark_black.svg';

import * as S from './style';

interface ImageZoomModalProps {
  src: string;
  handleCloseClick: (event: MouseEvent<HTMLDialogElement>) => void;
  closeZoomModal: () => void;
}

const ImageZoomModal = forwardRef(function ImageZoomModal(
  { src, handleCloseClick, closeZoomModal }: ImageZoomModalProps,
  ref: ForwardedRef<HTMLDialogElement>
) {
  return (
    <S.Dialog
      ref={ref}
      tabIndex={1}
      aria-label="이미지를 확대해서 볼 수 있는 창이 열렸습니다. 이미지 확대 창 닫기 버튼을 누르거나 ESC를 누르면 닫을 수 있습니다."
      aria-modal={true}
      onClick={handleCloseClick}
    >
      <S.Container>
        <S.HiddenCloseButton onClick={closeZoomModal}>이미지 확대 창 닫기</S.HiddenCloseButton>
        <S.CloseButton onClick={closeZoomModal} aria-label="이미지 확대 창 닫기">
          <S.IconImage src={cancel} alt="취소 아이콘" />
        </S.CloseButton>
        <S.Image src={src}></S.Image>
      </S.Container>
    </S.Dialog>
  );
});

export default ImageZoomModal;
