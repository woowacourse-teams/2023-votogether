import { styled } from 'styled-components';

import { theme } from '@styles/theme';

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  padding-bottom: 25px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);

  font: var(--text-caption);

  @media (min-width: ${theme.breakpoint.sm}) {
    font: var(--text-body);
  }
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  height: 24px;
  margin-bottom: 7px;
`;

export const Title = styled.span`
  font-weight: 500;
`;

export const UserContainer = styled.div`
  display: flex;
  align-items: end;
`;

export const SubTitleContainer = styled.div`
  display: flex;
  align-items: center;

  margin-left: 15px;
`;

export const SubTitle = styled.span`
  font: var(--text-small);
  font-weight: 400;

  color: var(--dark-gray);

  &:nth-child(2) {
    margin-left: 6px;
  }

  @media (min-width: ${theme.breakpoint.sm}) {
    font: var(--text-caption);
  }
`;

export const MenuWrapper = styled.div`
  position: absolute;
  right: 0%;
`;

export const Description = styled.p`
  font-weight: 400;
  line-height: 24px;

  white-space: pre-wrap;
`;

export const MenuContainer = styled.button`
  width: 24px;
  position: relative;

  color: #888;

  cursor: pointer;
`;

export const Image = styled.img`
  width: 100%;
  height: 100%;
`;
