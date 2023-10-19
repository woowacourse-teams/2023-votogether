import React, { useState } from 'react';

export type InputLengthRange = Record<'MAX_LENGTH' | 'MIN_LENGTH', number>;

export const useText = (originalText: string) => {
  const [text, setText] = useState(originalText);

  const handleTextChange = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
    limit: InputLengthRange
  ) => {
    const { value } = event.target;
    const standard = value.length;

    if (standard > limit.MAX_LENGTH) {
      event.target.setCustomValidity(`해당 입력값은 ${limit.MAX_LENGTH}자까지 입력 가능합니다.`);
      event.target.reportValidity();
      return;
    }

    setText(value);
    event.target.setCustomValidity('');
  };

  const resetText = () => {
    setText('');
  };

  return { text, setText, handleTextChange, resetText };
};
