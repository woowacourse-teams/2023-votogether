import { styled } from 'styled-components';

import { Size } from '@type/style';

const SIZE = {
  sm: { height: '300px', width: '250px' },
  md: { height: '460px', width: '315px' },
  lg: { height: '740px', width: '420px' },
  free: { height: 'fit-content', width: '100%' },
};

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;

  width: fit-content;
  height: fit-content;

  position: relative;
`;

export const Pointer = styled.div`
  width: 0;
  height: 0;
  border-left: 17px solid transparent;
  border-right: 17px solid transparent;
  border-bottom: 20px solid var(--gray);
  margin-right: 20px;
`;

export const InnerPointer = styled.div`
  width: 0;
  height: 0;
  border-left: 17px solid transparent;
  border-right: 17px solid transparent;
  border-bottom: 20px solid var(--white);
  margin-right: 20px;

  position: absolute;
  top: 3px;
`;

export const Content = styled.div<{ $size: Size | 'free' }>`
  height: ${props => SIZE[props.$size].height};
  width: ${props => SIZE[props.$size].width};
  border: 2px solid var(--gray);
  border-radius: 4px;

  background-color: var(--white);
`;
