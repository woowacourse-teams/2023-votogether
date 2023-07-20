import { styled } from 'styled-components';

import { Size } from '@type/style';

import { theme } from '@styles/theme';

export const OptionContainer = styled.div<{ $size: Size }>`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  gap: 5px;

  width: ${props => (props.$size === 'sm' ? '30px' : props.$size === 'md' ? '40px' : '50px')};

  & > :last-child {
    height: 30px;

    text-align: center;
    word-break: keep-all;
  }

  @media (min-width: ${theme.breakpoint.sm}) {
    width: ${props => (props.$size === 'sm' ? '40px' : props.$size === 'md' ? '50px' : '60px')};
  }
`;

export const DataWrapper = styled.div`
  display: flex;
  justify-content: center;

  height: 90%;
  width: 50px;

  @media (min-width: ${theme.breakpoint.sm}) {
    width: 60px;
  }
`;

export const OptionLengthWrapper = styled.div<{ $gender: 'female' | 'male' }>`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  gap: 5px;

  height: 100%;
  width: 20%;

  & > :first-child {
    position: relative;
    left: ${props => props.$gender === 'male' && '3px'};
    right: ${props => props.$gender === 'female' && '3px'};
  }
`;

export const OptionLength = styled.div<{ $amount: number; $gender: 'female' | 'male' }>`
  height: ${props => `${props.$amount}% `};
  width: 100%;
  border-radius: 5px 5px 0 0;

  background-color: ${props =>
    props.$gender === 'female' ? 'var(--graph-color-purple)' : 'var(--graph-color-green)'};
`;
