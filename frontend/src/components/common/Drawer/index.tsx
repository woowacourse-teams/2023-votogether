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
    event.preventDefault();

    if (event.currentTarget.open && event.key === 'Escape') {
      handleDrawerClose();
    }
  };

  return (
    <S.Dialog
      ref={ref}
      $placement={placement}
      $width={width}
      onKeyDown={handleKeyDown}
      onClose={handleCloseClick}
      onClick={handleCloseClick}
    >
      {children}
    </S.Dialog>
  );
});
