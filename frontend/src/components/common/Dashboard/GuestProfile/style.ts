import { styled } from 'styled-components';

import { ProfileContainer } from '../profileStyle';

export const Container = styled(ProfileContainer)`
  align-items: center;
`;

export const Image = styled.img`
  width: 100%;
  height: 40px;
`;

export const TextCard = styled.span`
  margin-top: 20px;

  font: var(--text-caption);

  color: var(--dark-gray);
`;
