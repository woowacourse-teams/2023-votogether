import React, {
  ForwardedRef,
  KeyboardEvent,
  MouseEvent,
  PropsWithChildren,
  forwardRef,
} from 'react';

import * as S from './style';

interface DrawerProps extends PropsWithChildren {
  handleDrawerClose: () => void;
  width: string;
  placement: 'left' | 'right';
}

const ARIA_MESSAGE =
  '사용자 정보 및 카테고리 정보가 있는 사이드바가 열렸습니다. 사이드바 닫기 버튼을 누르거나 ESC를 누르면 닫을 수 있습니다.';

export default forwardRef(function Drawer(
  { handleDrawerClose, width, placement, children }: DrawerProps,
  ref: ForwardedRef<HTMLDialogElement>
) {
  const handleCloseClick = (event: MouseEvent<HTMLDialogElement>) => {
    const modalBoundary = event.currentTarget.getBoundingClientRect();

    if (
      modalBoundary.left > event.clientX ||
      modalBoundary.right < event.clientX ||
      modalBoundary.top > event.clientY ||
      modalBoundary.bottom < event.clientY
    ) {
      handleDrawerClose();
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDialogElement>) => {
    if (event.currentTarget.open && event.key === 'Escape') {
      event.preventDefault();

      handleDrawerClose();
    }
  };

  return (
    <S.Dialog
      tabIndex={1}
      aria-label={ARIA_MESSAGE}
      aria-modal={true}
      ref={ref}
      $placement={placement}
      $width={width}
      onKeyDown={handleKeyDown}
      onClose={handleCloseClick}
      onClick={handleCloseClick}
    >
      <S.CloseButton onClick={handleDrawerClose}>사이드바 닫기버튼</S.CloseButton>
      {children}
    </S.Dialog>
  );
});
