import { MouseEvent, useState } from 'react';

import { Size } from '@type/style';

import OneLineGraph from './OneLineGraph';
import * as S from './style';
import TwoLineGraph from './TwoLineGraph';
import { VoteResultResponse } from './type';
import { transVoteStatisticsFormat } from './util';

interface RadioMode {
  all: string;
  gender: string;
}

export interface VoteStatisticsProps {
  voteResultResponse: VoteResultResponse;
  size: Size;
}

const radioMode: RadioMode = {
  all: '전체보기',
  gender: '성별보기',
};

type RadioCategory = keyof RadioMode;

export default function VoteStatistics({ voteResultResponse, size }: VoteStatisticsProps) {
  const [currentRadioMode, setCurrentRadioMode] = useState<RadioCategory>('all');

  const radioModeKey = Object.keys(radioMode) as RadioCategory[];

  const voteResult = transVoteStatisticsFormat(voteResultResponse);

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
      {currentRadioMode === 'all' && <OneLineGraph size={size} ageGroup={voteResult.ageGroup} />}
      {currentRadioMode === 'gender' && <TwoLineGraph size={size} ageGroup={voteResult.ageGroup} />}
    </S.Container>
  );
}
