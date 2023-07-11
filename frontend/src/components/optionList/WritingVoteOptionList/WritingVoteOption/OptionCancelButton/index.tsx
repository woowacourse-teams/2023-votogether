import React from 'react';

import * as S from './style';

interface OptionCancelButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export default function OptionCancelButton({ ...rest }: OptionCancelButtonProps) {
  return (
    <S.Container aria-label="삭제" type="button" {...rest}>
      <S.Icon
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={3}
        stroke="currentColor"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
      </S.Icon>
    </S.Container>
  );
}
