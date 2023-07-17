import * as GS from '../GraphStyle';
import { AgeCategory, GraphProps } from '../type';

import * as S from './style';

export default function OneLineGraph({ voteResult, size }: GraphProps) {
  const ageCategory = Object.keys(voteResult.age) as AgeCategory[];

  const maxVoteAmount = Math.max(
    ...Object.values(voteResult.age).map(voteResult => voteResult.total)
  );

  return (
    <GS.GraphContainer $size={size}>
      <GS.Line $size={size} />
      {ageCategory.map(age => {
        const amount = Math.floor((voteResult.age[age].total / maxVoteAmount) * 100);

        return (
          <S.OptionContainer $size={size}>
            <span aria-label="투표한 인원">{voteResult.age[age].total}</span>
            <S.OptionLength $amount={amount} />
            <span aria-label="투표한 나이대">{voteResult.age[age].name}</span>
          </S.OptionContainer>
        );
      })}
    </GS.GraphContainer>
  );
}
