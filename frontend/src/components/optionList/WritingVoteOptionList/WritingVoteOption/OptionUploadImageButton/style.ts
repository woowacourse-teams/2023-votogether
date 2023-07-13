import { styled } from 'styled-components';

import { ButtonCssText } from '../style';

export const Container = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 50%;
`;

export const Label = styled.label`
  ${ButtonCssText}
`;

export const FileInput = styled.input`
  visibility: hidden;
`;
