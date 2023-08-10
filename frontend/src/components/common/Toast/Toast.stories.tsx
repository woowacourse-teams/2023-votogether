import type { Meta } from '@storybook/react';

import { useToast } from '@hooks/useToast';

import Toast from '.';

const meta: Meta<typeof Toast> = {
  component: Toast,
};

export default meta;

export const SizeCase = () => {
  const { isOpen: isSmOpen, openComponent: openSmComponent } = useToast();
  const { isOpen: isMdOpen, openComponent: openMdComponent } = useToast();
  const { isOpen: isLgOpen, openComponent: openLgComponent } = useToast();
  const { isOpen: isFreeOpen, openComponent: openFreeComponent } = useToast();

  const handleSmButtonClick = () => {
    openSmComponent();
  };

  const handleMdButtonClick = () => {
    openMdComponent();
  };

  const handleLgButtonClick = () => {
    openLgComponent();
  };

  const handleFreeButtonClick = () => {
    openFreeComponent();
  };

  return (
    <>
      <button
        onClick={handleSmButtonClick}
        style={{ display: 'block', margin: '10px', background: 'gray', cursor: 'pointer' }}
      >
        sm 사이즈 토스트 열기 버튼
      </button>
      {isSmOpen && (
        <Toast size="sm" position="bottom">
          게시물이 삭제되었습니다.
        </Toast>
      )}
      <button
        onClick={handleMdButtonClick}
        style={{ display: 'block', margin: '10px', background: 'gray', cursor: 'pointer' }}
      >
        md 사이즈 토스트 열기 버튼
      </button>
      {isMdOpen && (
        <Toast size="md" position="bottom">
          게시물이 삭제되었습니다.
        </Toast>
      )}
      <button
        onClick={handleLgButtonClick}
        style={{ display: 'block', margin: '10px', background: 'gray', cursor: 'pointer' }}
      >
        lg 사이즈 토스트 열기 버튼
      </button>
      {isLgOpen && (
        <Toast size="lg" position="bottom">
          게시물이 삭제되었습니다.
        </Toast>
      )}
      <button
        onClick={handleFreeButtonClick}
        style={{ display: 'block', margin: '10px', background: 'gray', cursor: 'pointer' }}
      >
        free 사이즈 토스트 열기 버튼
      </button>
      {isFreeOpen && (
        <Toast size="free" position="bottom">
          게시물이 삭제되었습니다.
        </Toast>
      )}
    </>
  );
};

export const PositionCase = () => {
  const { isOpen: isTopOpen, openComponent: openTopComponent } = useToast();
  const { isOpen: isBottomOpen, openComponent: openBottomComponent } = useToast();

  const handleSmButtonClick = () => {
    openTopComponent();
  };

  const handleMdButtonClick = () => {
    openBottomComponent();
  };

  return (
    <>
      <button
        onClick={handleSmButtonClick}
        style={{ display: 'block', margin: '10px', background: 'gray', cursor: 'pointer' }}
      >
        top position 토스트 열기 버튼
      </button>
      {isTopOpen && (
        <Toast size="sm" position="top">
          게시물이 삭제되었습니다.
        </Toast>
      )}
      <button
        onClick={handleMdButtonClick}
        style={{ display: 'block', margin: '10px', background: 'gray', cursor: 'pointer' }}
      >
        bottom position 토스트 열기 버튼
      </button>
      {isBottomOpen && (
        <Toast size="sm" position="bottom">
          게시물이 삭제되었습니다.
        </Toast>
      )}
    </>
  );
};
