import { styled } from 'styled-components';

import { theme } from '@styles/theme';

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;

  width: 100%;
  height: calc(100vh - 320px);

  margin-bottom: 85px;

  overflow-y: scroll;

  -ms-overflow-style: none;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }

  @media (min-width: ${theme.breakpoint.md}) {
    height: calc(100vh - 440px);
  }
`;

export const SelectedStateWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  justify-self: start;

  width: 100%;
  border-bottom: 2px solid var(--bright-gray);
  padding-bottom: 20px;
`;

export const Circle = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 50%;

  background-color: var(--red);
`;

export const SelectedStateText = styled.span`
  font: var(--text-body);
`;

export const CategoryToggleContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;

  padding-top: 20px;
`;
