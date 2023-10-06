import React, { ChangeEvent } from 'react';

import { useText } from '@hooks';

import { InputLengthRange } from '@hooks/useText';

import SquareButton from '@components/common/SquareButton';

import * as S from './style';

interface InputNSubmitButtonProps {
  handleSubmit: (newText: string) => void;
  limitText: InputLengthRange;
  initText?: string;
  ariaLabel?: string;
}

export default function InputNSubmitButton({
  handleSubmit,
  limitText,
  initText = '',
  ariaLabel = '정보',
}: InputNSubmitButtonProps) {
  const { text, handleTextChange } = useText(initText);

  return (
    <S.InputWrapper>
      <S.Input
        value={text}
        onChange={(e: ChangeEvent<HTMLInputElement>) => handleTextChange(e, limitText)}
        placeholder={`새로운 ${ariaLabel}을 입력해주세요`}
      />
      <S.ButtonWrapper>
        <SquareButton
          aria-label={`${ariaLabel} 변경`}
          theme="fill"
          onClick={() => handleSubmit(text)}
        >
          변경
        </SquareButton>
      </S.ButtonWrapper>
    </S.InputWrapper>
  );
}
