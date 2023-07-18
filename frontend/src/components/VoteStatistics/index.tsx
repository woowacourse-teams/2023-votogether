import { MouseEvent, useState } from 'react';

import OneLineGraph from './OneLineGraph';
import * as S from './style';
import TwoLineGraph from './TwoLineGraph';
import { GraphProps } from './type';

interface RadioMode {
  all: string;
  gender: string;
}

const radioMode: RadioMode = {
  all: '전체보기',
  gender: '성별보기',
};

type RadioCategory = keyof RadioMode;

export default function VoteStatistics({ voteResult, size }: GraphProps) {
  const [nowRadioMode, setNowRadioMode] = useState<RadioCategory>('all');

  const radioModeKey = Object.keys(radioMode) as RadioCategory[];

  const changeMode = (e: MouseEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    const targetCategory = target.value as RadioCategory;
    setNowRadioMode(targetCategory);
  };

  return (
    <S.Container>
      <S.CategoryWrapper>
        {radioModeKey.map(mode => {
          return (
            <S.RadioLabel>
              <input
                type="radio"
                name="radio-category"
                value={mode}
                checked={mode === nowRadioMode}
                onClick={changeMode}
              />
              {radioMode[mode]}
            </S.RadioLabel>
          );
        })}
      </S.CategoryWrapper>
      {nowRadioMode === 'all' && <OneLineGraph size={size} voteResult={voteResult} />}
      {nowRadioMode === 'gender' && <TwoLineGraph size={size} voteResult={voteResult} />}
    </S.Container>
  );
}
