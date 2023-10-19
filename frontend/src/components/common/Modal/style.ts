import { styled } from 'styled-components';

import { Size } from '@type/style';

import { theme } from '@styles/theme';

const MODAL_SIZE: Record<Size, string> = {
  sm: '290px',
  md: '590px',
  lg: '700px',
};

export const All = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Backdrop = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;

  background: rgba(0, 0, 0, 0.35);
`;

export const Container = styled.dialog<{ size: Size }>`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  width: ${props => (props.size ? MODAL_SIZE[props.size] : '96%')};
  max-width: 290px;
  border-radius: 12px;
  border: 2px solid #f6f6f6;

  background-color: white;

  box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.5);

  @media (min-width: ${theme.breakpoint.sm}) {
    width: ${props => (props.size ? MODAL_SIZE[props.size] : '50%')};
    max-width: 500px;
  }
`;

export const HiddenCloseButton = styled.button`
  position: absolute;
  left: -10000px;
  top: -10000px;
`;

export const Title = styled.span`
  padding: 15px 2px 0 20px;
  margin: 5px 0 16px;

  color: #334253;

  font: var(--text-title);
  font-weight: 500;
`;

export const Body = styled.div`
  font: var(--text-body);

  box-sizing: border-box;
`;

export const ButtonContainer = styled.div`
  display: flex;
  gap: 12px;

  padding: 0 17px;
  margin: 16px 0 15px 0;

  @media (min-width: ${theme.breakpoint.sm}) {
    gap: 14px;
  }
`;

export const ButtonWrapper = styled.div`
  width: 100%;
  height: 40px;
`;
