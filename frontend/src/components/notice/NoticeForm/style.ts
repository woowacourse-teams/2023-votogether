import styled from 'styled-components';

export const Container = styled.form`
  display: flex;
  flex-direction: column;

  gap: 30px;

  padding: 50px;
`;

export const Title = styled.h1`
  font: var(--text-page-title);
`;

export const TextareaContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const Textarea = styled.textarea`
  border: 1px solid black;
  padding: 6px;

  font: var(--text-body);
`;

export const Label = styled.label`
  font: var(--text-title);
`;

export const ButtonWrapper = styled.div`
  width: 300px;
  height: 100px;

  align-self: center;
`;

export const DateInput = styled.input`
  padding: 30px 10px;
  border: 1px solid black;
`;
