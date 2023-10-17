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
  maxOptionCount?: number;
}

export default function MultiSelect({
  selectedOptionList,
  optionList,
  handleOptionAdd,
  handleOptionDelete,
  maxOptionCount,
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

  const addOption = ({ id, name }: Option) => {
    handleOptionAdd({ id, name });

    // selectedOptionList.length 는 추가되기 이전의 값
    if (maxOptionCount && selectedOptionList.length + 1 >= maxOptionCount) {
      setIsOpen(false);
    }
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
    <S.Container aria-label="다중선택이 가능한 셀렉터입니다.">
      <S.Wrapper
        ref={wrapperRef}
        onClick={handleToggleWrapper}
        aria-label={`선택되어있는 항목들 ${selectedOptionList
          .map(option => option.name)
          .join(', ')}`}
        aria-live="polite"
      >
        <S.SelectedOptionListContainer>
          {selectedOptionList.length === 0 && (
            <span aria-label="현재 선택된 옵션이 없습니다.">{placeholder} </span>
          )}
          {selectedOptionList.map(({ id, name }) => (
            <S.SelectedOption key={id} onClick={(e: React.MouseEvent) => e.stopPropagation()}>
              <span>{name}</span>
              <OptionCancelButton
                aria-label={`${name} 옵션 삭제`}
                onClick={(e: React.MouseEvent) => {
                  e.stopPropagation();
                  handleOptionDelete(id);
                }}
              />
            </S.SelectedOption>
          ))}
        </S.SelectedOptionListContainer>
        <S.SelectIcon
          aria-label={isOpen ? '선택항목이 열렸습니다.' : '선택항목이 닫혔습니다.'}
          aria-live="polite"
        >
          <S.Image src={isOpen ? chevronUp : chevronDown} alt="" $isSelected={isOpen} />
        </S.SelectIcon>
      </S.Wrapper>
      {filteredOptionList.length > 0 && (
        <S.DropDown $isOpened={isOpen} aria-label={'선택하지 않은 항목들'}>
          {filteredOptionList.map(({ id, name }) => (
            <button
              key={id}
              aria-label={`클릭시 ${name} 추가`}
              onClick={e => {
                e.stopPropagation();
                addOption({ id, name });
              }}
            >
              {name}
            </button>
          ))}
        </S.DropDown>
      )}
    </S.Container>
  );
}
