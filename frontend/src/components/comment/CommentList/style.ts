import { styled } from 'styled-components';

import { theme } from '@styles/theme';

export const Container = styled.div``;

export const TextOrLoginWrapper = styled.div`
  margin-top: 30px;
  padding: 40px 0;
  border-top: 1px solid rgba(0, 0, 0, 0.2);
`;

export const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 25px;

  padding-top: 25px;
  border-top: 1px solid rgba(0, 0, 0, 0.2);

  position: relative;
`;

export const CommentCount = styled.p`
  margin-left: 1px;

  font: var(--text-body);
  font-weight: bold;
`;

export const MoreButtonWrapper = styled.div`
  width: 80px;
  height: 46px;
  margin: 25px auto 0 auto;

  @media (min-width: ${theme.breakpoint.sm}) {
    width: 190px;
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: end;

  padding: 20px 0;

  @media (min-width: ${theme.breakpoint.sm}) {
    padding: 50px 0;
  }
`;

export const TopButtonWrapper = styled.div`
  width: 55px;
  height: 40px;

  @media (min-width: ${theme.breakpoint.sm}) {
    width: 64px;
    height: 46px;
  }
`;

export const HiddenInput = styled.input`
  position: absolute;
  bottom: 0;

  outline: none;

  color: white;
  z-index: -1;
`;
