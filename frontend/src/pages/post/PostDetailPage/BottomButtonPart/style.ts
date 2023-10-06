import { styled } from 'styled-components';

import { theme } from '@styles/theme';

export const BottomButtonContainer = styled.div`
  display: none;

  @media (min-width: ${theme.breakpoint.sm}) {
    display: flex;
    width: 90%;
    height: 40px;
    margin-top: 40px;
    gap: 10px;
  }
`;
