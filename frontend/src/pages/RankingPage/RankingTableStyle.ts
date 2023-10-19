import { styled } from 'styled-components';

import { theme } from '@styles/theme';

export const Background = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  height: fit-content;
  min-height: 450px;
  border-radius: 4px;

  background-color: var(--bright-gray);

  padding: 15px 10px;

  @media (min-width: ${theme.breakpoint.sm}) {
    padding: 15px 15px;
  }
`;

export const IconImage = styled.img`
  width: 30px;

  @media (min-width: ${theme.breakpoint.sm}) {
    width: 40px;
  }
`;

export const Th = styled.th`
  padding: 10px 0;

  font: var(--text-default);
  font-weight: 600;

  @media (min-width: ${theme.breakpoint.sm}) {
    font: var(--text-body);
  }
`;

export const RankingTd = styled.td`
  padding: 5px 0;
  height: auto;

  line-height: 0;
`;
