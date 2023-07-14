import type { Meta } from '@storybook/react';

import { useState } from 'react';

import { styled } from 'styled-components';

import SquareButton from '../SquareButton';
import TimePickerOptionList from '../TimePickerOptionList';

import Modal from '.';

const meta: Meta<typeof Modal> = {
  component: Modal,
  decorators: [storyFn => <div style={{ width: '100px', height: '50px' }}>{storyFn()}</div>],
};

export default meta;

export const Default = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    if (isOpen === true) setIsOpen(false);
  };

  return (
    <>
      <SquareButton onClick={openModal} theme="blank">
        Open Modal
      </SquareButton>
      {isOpen && (
        <Modal size="sm" onModalClose={closeModal}>
          <p>This is Default Modal</p>
        </Modal>
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
    if (isOpen === true) setIsOpen(false);
  };

  return (
    <>
      <SquareButton onClick={openModal} theme="blank">
        Open Modal
      </SquareButton>
      {isOpen && (
        <Modal size="lg" onModalClose={closeModal}>
          <p>This is Wide Modal</p>
        </Modal>
      )}
    </>
  );
};

export const WithCloseButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    if (isOpen === true) setIsOpen(false);
  };

  return (
    <>
      <SquareButton onClick={openModal} theme="blank">
        Open Modal
      </SquareButton>
      {isOpen && (
        <Modal size="sm" onModalClose={closeModal}>
          <>
            <S.Header>
              <p>Modal Title</p>
              <S.CloseButton onClick={closeModal}>X</S.CloseButton>
            </S.Header>
            <S.Body>
              <S.Description>This is Description</S.Description>
              This is Content
            </S.Body>
          </>
        </Modal>
      )}
    </>
  );
};

export const WithTimePicker = () => {
  const [time, setTime] = useState({
    day: 0,
    hour: 1,
    minute: 3,
  });
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    if (isOpen === true) setIsOpen(false);
  };

  const handleResetBUtton = () => {
    const updatedTime = {
      day: 0,
      hour: 0,
      minute: 0,
    };
    setTime(updatedTime);
  };

  return (
    <>
      <SquareButton onClick={openModal} theme="blank">
        사용자 지정
      </SquareButton>
      {isOpen && (
        <Modal size="sm" onModalClose={closeModal}>
          <>
            <S.Header>
              <h3>마감 시간 선택</h3>
              <S.CloseButton onClick={closeModal}>X</S.CloseButton>
            </S.Header>
            <S.Body>
              <S.Description>최대 3일을 넘을 수 없습니다.</S.Description>
              <TimePickerOptionList time={time} setTime={setTime} />
              <S.ButtonWrapper>
                <SquareButton onClick={handleResetBUtton} theme="blank">
                  초기화
                </SquareButton>
              </S.ButtonWrapper>
            </S.Body>
          </>
        </Modal>
      )}
    </>
  );
};

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  alignt-items: center;

  width: 100%;
  border-bottom: 1px solid #f6f6f6;
  padding: 10px;

  font-size: 1.5rem;
  font-weight: bold;
`;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  gap: 10px;

  padding: 10px 0;
  font-size: 1.4rem;
`;

const Description = styled.div`
  color: gray;

  font-size: 1.2rem;
`;

const CloseButton = styled.button`
  width: 20px;
  height: 20px;
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
