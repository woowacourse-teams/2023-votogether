import { styled } from 'styled-components';

import { theme } from '@styles/theme';

export const Container = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;

  padding-top: 30px;
`;

export const Title = styled.span`
  font: var(--text-body);
  font-weight: 600;

  @media (min-width: ${theme.breakpoint.md}) {
    font: var(--text-subtitle);
  }
`;

export const Keyword = styled(Title)`
  color: #ff3c3c;
`;

export const TextCardContainer = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 5px;

  padding: 30px 15px;

  font: var(--text-caption);

  @media (min-width: ${theme.breakpoint.md}) {
    font: var(--text-body);
  }
`;

export const TextCard = styled.li`
  list-style: disc;

  p {
    font-weight: bold;
  }
`;
