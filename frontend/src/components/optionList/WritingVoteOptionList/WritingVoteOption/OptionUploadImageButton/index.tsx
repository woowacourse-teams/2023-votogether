import React from 'react';

import photoIcon from '@assets/photo_white.svg';

import * as S from './style';

interface OptionUploadImageButtonProps extends React.InputHTMLAttributes<HTMLInputElement> {
  optionId: number;
}

export default function OptionUploadImageButton({
  optionId,
  ...rest
}: OptionUploadImageButtonProps) {
  const id = optionId.toString();

  return (
    <S.Container>
      <S.Label htmlFor={id} aria-label="선택지 이미지 업로드 버튼" title="이미지 업로드">
        <img src={photoIcon} width={14} height={14} alt="" />
      </S.Label>
      <S.FileInput id={id} type="file" accept="image/*" {...rest} />
    </S.Container>
  );
}
