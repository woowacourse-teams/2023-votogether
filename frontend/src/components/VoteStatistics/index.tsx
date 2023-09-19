import { MouseEvent, useState } from 'react';

import { Size } from '@type/style';

import OneLineGraph from './OneLineGraph';
import * as S from './style';
import TwoLineGraph from './TwoLineGraph';
import { VoteResult } from './type';

interface RadioMode {
  all: string;
  gender: string;
}

export interface VoteStatisticsProps {
  voteResult: VoteResult;
  size: Size;
}

const radioMode: RadioMode = {
  all: '전체보기',
  gender: '성별보기',
};

type RadioCategory = keyof RadioMode;

export default function VoteStatistics({ voteResult, size }: VoteStatisticsProps) {
  const [currentRadioMode, setCurrentRadioMode] = useState<RadioCategory>('all');

  const radioModeKey = Object.keys(radioMode) as RadioCategory[];

  const changeMode = (e: MouseEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    const targetCategory = target.value as RadioCategory;
    setCurrentRadioMode(targetCategory);
  };

  const random = Date.now();

  return (
    <S.Container>
      <S.CategoryWrapper>
        {radioModeKey.map(mode => {
          return (
            <S.RadioLabel key={mode}>
              <input
                type="radio"
                name={`radio-category-${random}`}
                value={mode}
                defaultChecked={mode === currentRadioMode}
                onClick={changeMode}
              />
              {radioMode[mode]}
            </S.RadioLabel>
          );
        })}
      </S.CategoryWrapper>
      <S.GenderExplain aria-label="성별 조건">
        {currentRadioMode === 'gender' && (
          <>
            <label>
              <S.ColorIcon aria-label="성별 조건" $gender="FEMALE" /> 여자
            </label>
            <label>
              <S.ColorIcon aria-label="성별 조건" $gender="MALE" /> 남자
            </label>
          </>
        )}
      </S.GenderExplain>
      {currentRadioMode === 'all' && <OneLineGraph size={size} ageGroup={voteResult.ageGroup} />}
      {currentRadioMode === 'gender' && <TwoLineGraph size={size} ageGroup={voteResult.ageGroup} />}
    </S.Container>
  );
}
