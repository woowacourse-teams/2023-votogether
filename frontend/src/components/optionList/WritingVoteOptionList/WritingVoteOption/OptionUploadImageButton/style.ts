import { styled } from 'styled-components';

export const Container = styled.div`
  height: 24px;
  width: 24px;
  border-radius: 50%;
`;

export const Label = styled.label`
  display: flex;
  justify-content: center;
  align-items: center;

  height: 24px;
  width: 24px;
  border-radius: 50%;

  background-color: #bebebe;

  cursor: pointer;
`;

export const Icon = styled.svg`
  width: 14px;
  height: 14px;

  color: white;
`;

export const FileInput = styled.input`
  visibility: hidden;
`;
