import type { Meta, StoryObj } from '@storybook/react';

import { styled } from 'styled-components';

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
    <Accordion title="닉네임 변경">
      <Input placeholder="새로운 닉네임을 입력해주세요" />
      <ButtonWrapper>
        <SquareButton aria-label="닉네임 변경" theme="fill">
          변경
        </SquareButton>
      </ButtonWrapper>
    </Accordion>
  ),
};

export const DeleteUserAccount: Story = {
  render: () => (
    <Accordion title="회원 탈퇴">
      <Input placeholder="비밀번호를 입력해주세요" />
      <ButtonWrapper>
        <SquareButton aria-label="회원 탈퇴" theme="fill">
          회원 탈퇴
        </SquareButton>
      </ButtonWrapper>
    </Accordion>
  ),
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
