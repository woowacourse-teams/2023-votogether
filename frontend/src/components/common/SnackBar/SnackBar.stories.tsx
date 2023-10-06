import type { Meta } from '@storybook/react';

import { useToggle } from '@hooks';

import SnackBar from '.';

const meta: Meta<typeof SnackBar> = {
  component: SnackBar,
};

export default meta;

const buttonStyle = { display: 'block', margin: '10px', background: 'gray', cursor: 'pointer' };

export const SizeCase = () => {
  const {
    isOpen: isSmOpen,
    openComponent: openSmComponent,
    closeComponent: closeSmComponent,
  } = useToggle();
  const {
    isOpen: isMdOpen,
    openComponent: openMdComponent,
    closeComponent: closeMdComponent,
  } = useToggle();
  const {
    isOpen: isLgOpen,
    openComponent: openLgComponent,
    closeComponent: closeLgComponent,
  } = useToggle();
  const {
    isOpen: isFreeOpen,
    openComponent: openFreeComponent,
    closeComponent: closeFreeComponent,
  } = useToggle();

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

  const handleSmCancelClick = () => {
    closeSmComponent();
  };

  const handleMdCancelClick = () => {
    closeMdComponent();
  };

  const handleLgCancelClick = () => {
    closeLgComponent();
  };

  const handleFreeCancelClick = () => {
    closeFreeComponent();
  };

  return (
    <>
      <button onClick={handleSmButtonClick} style={buttonStyle}>
        sm 사이즈 스낵바 열기 버튼
      </button>
      {isSmOpen && (
        <SnackBar size="sm" position="bottom">
          게시물이 삭제되었습니다.
          <button onClick={handleSmCancelClick} style={buttonStyle}>
            닫기
          </button>
        </SnackBar>
      )}
      <button onClick={handleMdButtonClick} style={buttonStyle}>
        md 사이즈 스낵바 열기 버튼
      </button>
      {isMdOpen && (
        <SnackBar size="md" position="bottom">
          게시물이 삭제되었습니다.
          <button onClick={handleMdCancelClick} style={buttonStyle}>
            닫기
          </button>
        </SnackBar>
      )}
      <button onClick={handleLgButtonClick} style={buttonStyle}>
        lg 사이즈 스낵바 열기 버튼
      </button>
      {isLgOpen && (
        <SnackBar size="lg" position="bottom">
          게시물이 삭제되었습니다.
          <button onClick={handleLgCancelClick} style={buttonStyle}>
            취소
          </button>
          <button onClick={handleLgCancelClick} style={buttonStyle}>
            확인
          </button>
        </SnackBar>
      )}
      <button onClick={handleFreeButtonClick} style={buttonStyle}>
        free 사이즈 스낵바 열기 버튼
      </button>
      {isFreeOpen && (
        <SnackBar size="free" position="bottom">
          게시물이 삭제되었습니다.
          <button onClick={handleFreeCancelClick} style={buttonStyle}>
            닫기
          </button>
        </SnackBar>
      )}
    </>
  );
};

export const PositionCase = () => {
  const {
    isOpen: isTopOpen,
    openComponent: openTopComponent,
    closeComponent: closeTopComponent,
  } = useToggle();
  const {
    isOpen: isBottomOpen,
    openComponent: openBottomComponent,
    closeComponent: closeBottomComponent,
  } = useToggle();

  const handleTopButtonClick = () => {
    openTopComponent();
  };

  const handleBottomButtonClick = () => {
    openBottomComponent();
  };

  const handleTopCancelClick = () => {
    closeTopComponent();
  };

  const handleBottomCancelClick = () => {
    closeBottomComponent();
  };

  return (
    <>
      <button onClick={handleTopButtonClick} style={buttonStyle}>
        top position 스낵바 열기 버튼
      </button>
      {isTopOpen && (
        <SnackBar size="sm" position="top">
          게시물이 삭제되었습니다.
          <button onClick={handleTopCancelClick} style={buttonStyle}>
            닫기
          </button>
        </SnackBar>
      )}
      <button onClick={handleBottomButtonClick} style={buttonStyle}>
        bottom position 스낵바 열기 버튼
      </button>
      {isBottomOpen && (
        <SnackBar size="sm" position="bottom">
          게시물이 삭제되었습니다.
          <button onClick={handleBottomCancelClick} style={buttonStyle}>
            닫기
          </button>
        </SnackBar>
      )}
    </>
  );
};
