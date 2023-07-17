import React, { useState } from 'react';

import chevronDown from '@assets/chevron-down.svg';
import chevronUp from '@assets/chevron-up.svg';

import { SELECT_DEFAULT, SELECT_DISABLED, SELECT_SELECTED } from './constants';
import * as S from './style';
import { OptionItemProps } from './type';

export interface SelectProps {
  selectedLabel: string;
  optionList: OptionItemProps[];
  handleOptionChange: (option: OptionItemProps) => void;
  isDisabled?: boolean;
  ariaLabel?: string;
}

export default function Select({
  selectedLabel,
  optionList,
  handleOptionChange,
  isDisabled = false,
  ariaLabel,
}: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    if (isDisabled) return;
    setIsOpen(prev => !prev);
  };

  const onSelectClick = (option: OptionItemProps) => {
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
      <S.SelectedContainer aria-label={ariaLabel} onClick={toggleOpen} $status={getSelectStatus()}>
        <span>{selectedLabel}</span>
        <S.Image src={isOpen ? chevronUp : chevronDown} alt="" $isSelected={isOpen} />
      </S.SelectedContainer>
      {isOpen && (
        <S.OptionListContainer>
          {optionList.map(option => (
            <S.OptionContainer key={option.label} onClick={() => onSelectClick(option)}>
              {option.label}
            </S.OptionContainer>
          ))}
        </S.OptionListContainer>
      )}
    </S.Container>
  );
}
