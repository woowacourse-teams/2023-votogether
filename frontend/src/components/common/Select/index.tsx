import React from 'react';

import chevronDown from '@assets/chevron-down.svg';
import chevronUp from '@assets/chevron-up.svg';

import { SELECT_DEFAULT, SELECT_DISABLED, SELECT_SELECTED } from './constants';
import * as S from './style';

export interface SelectProps<T extends string>
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  selectedOption: string;
  optionList: Record<T, string>;
  isOpen: boolean;
  toggleSelect: () => void;
  handleOptionChange: (option: T) => void;
  isDisabled?: boolean;
}

export default function Select<T extends string>({
  selectedOption,
  optionList,
  handleOptionChange,
  isOpen,
  toggleSelect,
  isDisabled = false,
  ...rest
}: SelectProps<T>) {
  const optionKeyList = Object.keys(optionList) as T[];

  const handleToggleOpen = () => {
    if (isDisabled) return;
    toggleSelect();
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
      <S.SelectedContainer onClick={handleToggleOpen} $status={getSelectStatus()} {...rest}>
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
                onClick={() => handleOptionChange(optionKey)}
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
