import type { Option } from './types';

import React, { useState, useEffect, useRef } from 'react';

import OptionCancelButton from '@components/optionList/WritingVoteOptionList/WritingVoteOption/OptionCancelButton';

import chevronDown from '@assets/chevron-down.svg';
import chevronUp from '@assets/chevron-up.svg';

import * as S from './style';

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
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const filteredOptionList = optionList.filter(
    option => !selectedOptionList.some(selected => selected.id === option.id)
  );

  const handleToggleWrapper = () => {
    setIsOpen(!isOpen);
  };

  const handleOutsideClick = (event: MouseEvent) => {
    if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleOutsideClick);
    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  return (
    <S.Container>
      <S.Wrapper ref={wrapperRef} onClick={handleToggleWrapper}>
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
        <S.DropDown $isOpened={isOpen}>
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
