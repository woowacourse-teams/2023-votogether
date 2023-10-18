import type { Meta } from '@storybook/react';

import { useEffect, useState } from 'react';

import { styled } from 'styled-components';

import { MAX_DEADLINE } from '@constants/policy';

import SquareButton from '../SquareButton';
import TimePickerOptionList from '../TimePickerOptionList';

import Modal from '.';

const meta: Meta<typeof Modal> = {
  component: Modal,
  decorators: [storyFn => <div style={{ width: '100px', height: '50px' }}>{storyFn()}</div>],
};

export default meta;

export const Default = () => {
  const [isOpen, setIsOpen] = useState(true);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const primaryButton = {
    text: 'Primary',
    handleClick: () => {
      alert('You Clicked Primary Button!');
    },
  };

  const secondaryButton = {
    text: 'Secondary',
    handleClick: () => {
      setIsOpen(false);
    },
  };

  return (
    <>
      <SquareButton onClick={openModal} theme="blank">
        Open Modal
      </SquareButton>
      {isOpen && (
        <Modal
          size="sm"
          title="This is Default Modal"
          primaryButton={primaryButton}
          secondaryButton={secondaryButton}
          handleModalClose={closeModal}
        />
      )}
    </>
  );
};

export const Wide = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const primaryButton = {
    text: 'Primary',
    handleClick: () => {
      alert('You Clicked Primary Button!');
    },
  };

  const secondaryButton = {
    text: 'Secondary',
    handleClick: () => {
      setIsOpen(false);
    },
  };

  return (
    <>
      <SquareButton onClick={openModal} theme="blank">
        Open Modal
      </SquareButton>
      {isOpen && (
        <Modal
          title="This is Wide Modal"
          size="lg"
          primaryButton={primaryButton}
          secondaryButton={secondaryButton}
          handleModalClose={closeModal}
        />
      )}
    </>
  );
};

export const CloseByESC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const primaryButton = {
    text: 'Primary',
    handleClick: () => {
      alert('You Clicked Primary Button!');
    },
  };

  const secondaryButton = {
    text: 'Secondary',
    handleClick: () => {
      setIsOpen(false);
    },
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        secondaryButton.handleClick();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  return (
    <>
      <SquareButton onClick={openModal} theme="blank">
        Open Modal
      </SquareButton>
      {isOpen && (
        <Modal
          title="Close This Modal by ESC"
          size="sm"
          primaryButton={primaryButton}
          secondaryButton={secondaryButton}
          handleModalClose={closeModal}
        />
      )}
    </>
  );
};

export const WithTimePicker = () => {
  const [time, setTime] = useState({
    day: 2,
    hour: 7,
    minute: 58,
  });
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleResetButton = () => {
    if (window.confirm('정말 초기화하시겠습니까?')) {
      const updatedTime = {
        day: 0,
        hour: 0,
        minute: 0,
      };
      setTime(updatedTime);
    }
  };

  const primaryButton = {
    text: '저장',
    handleClick: () => {
      setIsOpen(false);
    },
  };

  const secondaryButton = {
    text: '초기화',
    handleClick: handleResetButton,
  };

  return (
    <>
      <SquareButton onClick={openModal} theme="blank">
        사용자 지정
      </SquareButton>
      {isOpen && (
        <Modal
          title="마감 시간 선택"
          size="sm"
          primaryButton={primaryButton}
          secondaryButton={secondaryButton}
          handleModalClose={closeModal}
        >
          <S.Body>
            <S.Description>최대 {MAX_DEADLINE}일을 넘을 수 없습니다.</S.Description>
            <TimePickerOptionList time={time} setTime={setTime} />
          </S.Body>
        </Modal>
      )}
    </>
  );
};

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  border-bottom: 1px solid #f6f6f6;
  padding: 10px;

  font: var(--text-body);
  font-weight: bold;
`;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  gap: 10px;

  font: var(--text-caption);
`;

const Description = styled.div`
  color: gray;

  font: var(--text-small);
`;

const CloseButton = styled.button`
  width: 25px;
  height: 20px;

  background: white;

  font: var(--text-body);

  cursor: pointer;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 50%;
  height: 40px;
`;

const S = {
  Header,
  Body,
  Description,
  CloseButton,
  ButtonWrapper,
};
