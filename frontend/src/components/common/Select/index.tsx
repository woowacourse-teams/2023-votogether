import React, { useState } from 'react';

import chevronDown from '@assets/chevron-down.svg';
import chevronUp from '@assets/chevron-up.svg';

import { SELECT_DEFAULT, SELECT_DISABLED, SELECT_SELECTED } from './constants';
import * as S from './style';

export interface SelectProps<T extends string>
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  selectedOption: string;
  optionList: Record<T, string>;
  handleOptionChange: (option: T) => void;
  isDisabled?: boolean;
}

export default function Select<T extends string>({
  selectedOption,
  optionList,
  handleOptionChange,
  isDisabled = false,
  ...rest
}: SelectProps<T>) {
  const optionKeyList = Object.keys(optionList) as T[];
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    if (isDisabled) return;
    setIsOpen(prev => !prev);
  };

  const handleSelectClick = (option: T) => {
    handleOptionChange(option);
    setIsOpen(false);
  };

  const getSelectStatus = () => {
    if (isDisabled) {
      return SELECT_DISABLED;
    }

    if (isOpen) {
      return SELECT_SELECTED;
    }

    return SELECT_DEFAULT;
  };

  return (
    <S.Container>
      <S.SelectedContainer onClick={toggleOpen} $status={getSelectStatus()} {...rest}>
        <span>{selectedOption}</span>
        <S.Image src={isOpen ? chevronUp : chevronDown} alt="" $isSelected={isOpen} />
      </S.SelectedContainer>
      {isOpen && (
        <S.ScreenReaderDirection aria-live="polite">
          이 요소를 닫으려면 한번 더 클릭해주세요.
        </S.ScreenReaderDirection>
      )}
      {isOpen && (
        <S.OptionListParent>
          <S.OptionListContainer>
            {optionKeyList.map((optionKey: T) => (
              <S.OptionContainer
                tabIndex={0}
                key={optionKey}
                onClick={() => handleSelectClick(optionKey)}
              >
                {optionList[optionKey]}
              </S.OptionContainer>
            ))}
          </S.OptionListContainer>
        </S.OptionListParent>
      )}
    </S.Container>
  );
}
