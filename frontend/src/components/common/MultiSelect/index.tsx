import React, { useEffect, useRef, useState } from 'react';

import { useToggle } from '@hooks/useToggle';

import OptionCancelButton from '@components/optionList/WritingVoteOptionList/WritingVoteOption/OptionCancelButton';

import chevronDown from '@assets/chevron-down.svg';
import chevronUp from '@assets/chevron-up.svg';

import * as S from './style';

interface Option {
  id: number;
  name: string;
}

interface MultiSelectProps {
  selectedOptionList: Option[];
  optionList: Option[];
  handleOptionAdd: (newItem: Option) => void;
  handleOptionDelete: (optionId: number) => void;
  placeholder?: string;
}

export default function MultiSelect({
  selectedOptionList,
  optionList,
  handleOptionAdd,
  handleOptionDelete,
  placeholder = '여러 개의 옵션을 선택해주세요',
}: MultiSelectProps) {
  const { isOpen, openComponent, closeComponent } = useToggle();

  const filteredOptionList = optionList.filter(
    option => !selectedOptionList.some(selected => selected.id === option.id)
  );

  const handleToggleWrapper = () => {
    if (isOpen) {
      closeComponent();
      return;
    }
    openComponent();
  };

  return (
    <S.Container>
      <S.Wrapper onClick={handleToggleWrapper}>
        <S.SelectedOptionListContainer>
          {selectedOptionList.length === 0 && <span>{placeholder} </span>}
          {selectedOptionList.map(({ id, name }) => (
            <S.SelectedOption key={id} onClick={(e: React.MouseEvent) => e.stopPropagation()}>
              <span>{name}</span>
              <OptionCancelButton
                onClick={(e: React.MouseEvent) => {
                  e.stopPropagation();
                  handleOptionDelete(id);
                }}
              />
            </S.SelectedOption>
          ))}
        </S.SelectedOptionListContainer>
        <S.SelectIcon>
          <S.Image src={isOpen ? chevronUp : chevronDown} alt="" $isSelected={isOpen} />
        </S.SelectIcon>
      </S.Wrapper>
      {filteredOptionList.length > 0 && (
        <S.DropDown opened={isOpen}>
          {filteredOptionList.map(({ id, name }) => (
            <li
              key={id}
              onClick={e => {
                e.stopPropagation();
                handleOptionAdd({ id, name });
              }}
            >
              {name}
            </li>
          ))}
        </S.DropDown>
      )}
    </S.Container>
  );
}
