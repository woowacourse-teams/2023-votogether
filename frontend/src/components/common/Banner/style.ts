import { Link } from 'react-router-dom';

import { styled } from 'styled-components';

import { theme } from '@styles/theme';

export const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 8fr 3fr;
  align-items: center;
  justify-items: center;
  gap: 4px;

  width: 100%;
  height: 60px;
  border-radius: 7px;

  background-color: #f1eae7;

  @media (min-width: ${theme.breakpoint.sm}) {
    grid-template-columns: 1fr 6fr 3fr;
    margin: 0 8px;
  }

  @media (max-width: ${theme.breakpoint.sm}) {
    border-radius: 0px;
  }
`;

export const IconImage = styled.img`
  justify-self: center;

  width: 18px;
  height: 18px;

  cursor: pointer;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;
  justify-self: start;

  @media (min-width: ${theme.breakpoint.sm}) {
    margin-left: 20px;
  }
`;

export const Title = styled.span`
  font-size: 16px;
  font-weight: 600;

  @media (max-width: ${theme.breakpoint.sm}) {
    font-size: 13px;
  }
`;

export const Description = styled.span`
  font-size: 14px;

  @media (max-width: ${theme.breakpoint.sm}) {
    font-size: 12px;
  }
`;

export const MovePageLink = styled(Link)`
  justify-self: center;

  width: 60%;
  height: 50%;
  border-radius: 8px;
  padding-top: 7px;

  color: white;
  background-color: var(--header);

  font-size: 12px;
  text-decoration: none;
  text-align: center;

  @media (max-width: ${theme.breakpoint.sm}) {
    width: 70%;
  }
`;
