import React, { MutableRefObject } from 'react';

import photoIcon from '@assets/photo_white.svg';

import * as S from './style';

interface OptionUploadImageButtonProps extends React.InputHTMLAttributes<HTMLInputElement> {
  optionId: number;
  isImageVisible: boolean;
  contentInputRefList: MutableRefObject<HTMLInputElement[]>;
  index: number;
}

export default function OptionUploadImageButton({
  optionId,
  isImageVisible,
  contentInputRefList,
  index,
  ...rest
}: OptionUploadImageButtonProps) {
  const id = optionId.toString();

  return (
    <S.Container $isVisible={isImageVisible}>
      <button type="button" aria-label="선택지 이미지 업로드">
        <S.Label htmlFor={id}>
          <S.Image src={photoIcon} alt="" />
        </S.Label>
      </button>
      <S.FileInput
        id={id}
        type="file"
        accept="image/*"
        tabIndex={-1}
        ref={(ele: HTMLInputElement) => {
          contentInputRefList.current[index] = ele;
        }}
        {...rest}
      />
    </S.Container>
  );
}
