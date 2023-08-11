import type { Meta } from '@storybook/react';

import { useToast } from '@hooks/useToast';

import Toast from '.';

const meta: Meta<typeof Toast> = {
  component: Toast,
};

export default meta;

export const SizeCase = () => {
  const { isOpen: isSmOpen, openToast: openSmComponent, toastMessage: smMessage } = useToast();
  const { isOpen: isMdOpen, openToast: openMdComponent, toastMessage: mdMessage } = useToast();
  const { isOpen: isLgOpen, openToast: openLgComponent, toastMessage: lgMessage } = useToast();
  const {
    isOpen: isFreeOpen,
    openToast: openFreeComponent,
    toastMessage: freeMessage,
  } = useToast();

  return (
    <>
      <button
        onClick={() => openSmComponent('게시물이 삭제되었습니다.')}
        style={{ display: 'block', margin: '10px', background: 'gray', cursor: 'pointer' }}
      >
        sm 사이즈 토스트 열기 버튼
      </button>
      {isSmOpen && (
        <Toast size="sm" position="bottom">
          {smMessage}
        </Toast>
      )}
      <button
        onClick={() => openMdComponent('게시물이 삭제되었습니다.')}
        style={{ display: 'block', margin: '10px', background: 'gray', cursor: 'pointer' }}
      >
        md 사이즈 토스트 열기 버튼
      </button>
      {isMdOpen && (
        <Toast size="md" position="bottom">
          {mdMessage}
        </Toast>
      )}
      <button
        onClick={() => openLgComponent('게시물이 삭제되었습니다.')}
        style={{ display: 'block', margin: '10px', background: 'gray', cursor: 'pointer' }}
      >
        lg 사이즈 토스트 열기 버튼
      </button>
      {isLgOpen && (
        <Toast size="lg" position="bottom">
          {lgMessage}
        </Toast>
      )}
      <button
        onClick={() => openFreeComponent('게시물이 삭제되었습니다.')}
        style={{ display: 'block', margin: '10px', background: 'gray', cursor: 'pointer' }}
      >
        free 사이즈 토스트 열기 버튼
      </button>
      {isFreeOpen && (
        <Toast size="free" position="bottom">
          {freeMessage}
        </Toast>
      )}
    </>
  );
};

export const PositionCase = () => {
  const { isOpen: isTopOpen, openToast: openTopComponent, toastMessage: topMessage } = useToast();
  const {
    isOpen: isBottomOpen,
    openToast: openBottomComponent,
    toastMessage: bottomMessage,
  } = useToast();

  return (
    <>
      <button
        onClick={() => openTopComponent('게시물이 삭제되었습니다.')}
        style={{ display: 'block', margin: '10px', background: 'gray', cursor: 'pointer' }}
      >
        top position 토스트 열기 버튼
      </button>
      {isTopOpen && (
        <Toast size="sm" position="top">
          {topMessage}
        </Toast>
      )}
      <button
        onClick={() => openBottomComponent('게시물이 삭제되었습니다.')}
        style={{ display: 'block', margin: '10px', background: 'gray', cursor: 'pointer' }}
      >
        bottom position 토스트 열기 버튼
      </button>
      {isBottomOpen && (
        <Toast size="sm" position="bottom">
          {bottomMessage}
        </Toast>
      )}
    </>
  );
};
