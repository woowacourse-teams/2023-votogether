import * as GS from '../GraphStyle';
import { GraphProps } from '../type';

import * as S from './style';

export default function OneLineGraph({ ageGroup, size }: GraphProps) {
  const maxVoteAmount = Math.max(...ageGroup.map(age => age.total));

  return (
    <GS.GraphContainer $size={size}>
      <GS.Line $size={size} />
      {ageGroup.map(ageResult => {
        const amount = Math.floor((ageResult.total / maxVoteAmount) * 100);

        return (
          <S.OptionContainer key={ageResult.name} $size={size}>
            <span aria-label={`${ageResult.name}에서 ${ageResult.total}명이 투표`}>
              {ageResult.total}
            </span>
            <S.OptionLength $amount={amount} />
            <span aria-hidden="true">{ageResult.name}</span>
          </S.OptionContainer>
        );
      })}
    </GS.GraphContainer>
  );
}
