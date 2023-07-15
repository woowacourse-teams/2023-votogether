import { Link } from 'react-router-dom';

import { styled } from 'styled-components';

import { ProfileCSSText } from '../style';

export const Container = styled.div`
  ${ProfileCSSText}
`;

export const Badge = styled.span`
  margin-bottom: 7px;
`;

export const NickName = styled.span`
  margin-bottom: 12px;

  font: var(--text-title);

  color: var(--red);
`;

export const UserInfoContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const TextCardContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const TextCardLink = styled(Link)`
  display: flex;
  flex-direction: column;

  text-decoration: none;

  color: initial;
`;

export const TextCardTitle = styled.span`
  font: var(--text-caption);
`;

export const TextCardContent = styled.span`
  font: var(--text-caption);
  text-align: center;
`;
