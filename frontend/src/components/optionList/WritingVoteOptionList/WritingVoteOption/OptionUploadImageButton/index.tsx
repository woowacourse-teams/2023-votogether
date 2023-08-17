import React, { useRef } from 'react';

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
  const inputRef = useRef<HTMLInputElement>(null);
  const id = optionId.toString();

  const handleButtonClick = () => {
    inputRef.current && inputRef.current.click();
  };

  return (
    <S.Container $isVisible={isImageVisible}>
      <button type="button" aria-label="선택지 이미지 업로드" onClick={handleButtonClick}>
        <S.Label htmlFor={id}>
          <S.Image src={photoIcon} alt="" />
        </S.Label>
      </button>
      <S.FileInput id={id} type="file" accept="image/*" tabIndex={-1} ref={inputRef} {...rest} />
    </S.Container>
  );
}
