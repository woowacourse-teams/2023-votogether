import { styled } from 'styled-components';

import { Size } from '@components/common/AddButton/type';

export const OptionContainer = styled.div<{ $size: Size }>`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  gap: 5px;

  width: ${props => (props.$size === 'sm' ? '30px' : props.$size === 'md' ? '40px' : '50px')};

  @media (min-width: 576px) {
    width: ${props => (props.$size === 'sm' ? '40px' : props.$size === 'md' ? '50px' : '60px')};
  }

  & :last-child {
    height: 30px;
    word-break: keep-all;
    text-align: center;
  }
`;

export const OptionLength = styled.div<{ $amount: number }>`
  height: ${props => `${props.$amount * 0.8}%`};
  width: 40%;
  border-radius: 5px 5px 0 0;

  background-color: #f27676;
`;
