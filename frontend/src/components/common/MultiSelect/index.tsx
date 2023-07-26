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

  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const [wrapperClientHeight, setWrapperClientHeight] = useState(40);

  const handleToggleWrapper = () => {
    if (isOpen) {
      closeComponent();
      return;
    }
    openComponent();
  };

  useEffect(() => {
    if (wrapperRef) {
      if (selectedOptionList.length > 0) {
        const newClientHeight = wrapperRef.current ? wrapperRef.current.clientHeight : 25;

        setWrapperClientHeight(newClientHeight);
      } else {
        setWrapperClientHeight(40);
      }
    }
  }, [selectedOptionList]);

  useEffect(() => {
    if (selectedOptionList.length === optionList.length) {
      closeComponent();
    }
  }, [selectedOptionList, optionList, closeComponent]);

  const filteredOptionList = optionList.filter(
    option => selectedOptionList.findIndex(selected => selected.id === option.id) === -1
  );

  return (
    <S.Wrapper onClick={handleToggleWrapper} ref={wrapperRef}>
      <S.Container>
        {selectedOptionList.length === 0 && <span>{placeholder} </span>}
        {selectedOptionList.map(({ id, name }) => (
          <S.Chip key={id} onClick={(e: React.MouseEvent) => e.stopPropagation()}>
            <span>{name}</span>
            <OptionCancelButton
              onClick={(e: React.MouseEvent) => {
                e.stopPropagation();
                handleOptionDelete(id);
              }}
            />
          </S.Chip>
        ))}
      </S.Container>
      <S.SelectIcon>
        <S.Image src={isOpen ? chevronUp : chevronDown} alt="" $isSelected={isOpen} />
      </S.SelectIcon>
      {filteredOptionList.length > 0 && (
        <S.DropDown opened={isOpen} wrapperClientHeight={wrapperClientHeight}>
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
    </S.Wrapper>
  );
}
