import React from 'react';

import photoIcon from '@assets/photo_white.svg';

import * as S from './style';

interface OptionUploadImageButtonProps extends React.InputHTMLAttributes<HTMLInputElement> {
  optionId: number;
  isImageVisible: boolean;
}

export default function OptionUploadImageButton({
  optionId,
  isImageVisible,
  ...rest
}: OptionUploadImageButtonProps) {
  const id = optionId.toString();

  return (
    <S.Container $isVisible={isImageVisible}>
      <S.Label htmlFor={id} aria-label="선택지 이미지 업로드 버튼" title="이미지 업로드">
        <S.Image src={photoIcon} alt="" />
      </S.Label>
      <S.FileInput id={id} type="file" accept="image/*" {...rest} />
    </S.Container>
  );
}
