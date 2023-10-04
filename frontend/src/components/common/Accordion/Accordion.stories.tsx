import type { Meta, StoryObj } from '@storybook/react';

import { styled } from 'styled-components';

import { useToggle } from '@hooks';

import Modal from '../Modal';
import SquareButton from '../SquareButton';

import Accordion from '.';

const meta: Meta<typeof Accordion> = {
  component: Accordion,
};

export default meta;
type Story = StoryObj<typeof Accordion>;

export const Default: Story = {
  render: () => (
    <Accordion title="Click Title to Open Content">
      <span>Hello This is Content!</span>
    </Accordion>
  ),
};

export const NicknameChange: Story = {
  render: () => (
    <Accordion title="닉네임 변경" ariaLabel="닉네임 변경 메뉴">
      <Input placeholder="새로운 닉네임을 입력해주세요" />
      <ButtonWrapper>
        <SquareButton aria-label="닉네임 변경" theme="fill">
          변경
        </SquareButton>
      </ButtonWrapper>
    </Accordion>
  ),
};

export const DeleteUserAccount = () => {
  const { isOpen, openComponent, closeComponent } = useToggle();
  return (
    <Accordion title="회원 탈퇴">
      <ButtonWrapper>
        <SquareButton onClick={openComponent} aria-label="회원 탈퇴" theme="blank">
          회원 탈퇴
        </SquareButton>
      </ButtonWrapper>
      {isOpen && (
        <Modal size="sm" onModalClose={closeComponent}>
          <ModalBody>
            <ModalTitle>정말 탈퇴하시겠어요?</ModalTitle>
            <ModalDescription>
              탈퇴 버튼 클릭 시, <br></br>계정은 삭제되며 복구되지 않아요.
            </ModalDescription>
            <ButtonListWrapper>
              <SquareButton aria-label="회원 탈퇴" theme="fill">
                탈퇴
              </SquareButton>
              <SquareButton onClick={closeComponent} aria-label="회원 탈퇴" theme="blank">
                취소
              </SquareButton>
            </ButtonListWrapper>
          </ModalBody>
        </Modal>
      )}
    </Accordion>
  );
};

const ButtonWrapper = styled.div`
  width: 90px;
  height: 50px;
`;

const Input = styled.input`
  width: 80%;
  border: 1px solid #f2f2f2;
  padding: 20px;
`;

const ModalBody = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  gap: 30px;

  width: 90%;
  margin: 40px 20px 0px 16px;

  font: var(--text-caption);
`;

const ModalTitle = styled.div`
  font: var(--text-title);
`;

const ModalDescription = styled.div`
  font: var(--text-body);
`;

const ButtonListWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  gap: 20px;

  width: 90%;
  height: 50px;

  margin-top: 20px;
`;
