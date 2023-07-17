import * as GS from '../GraphStyle';
import { AGE_OPTION, GraphProps } from '../type';

import * as S from './style';

export default function OneLineGraph({ voteResult, size }: GraphProps) {
  const maxVoteAmount = Math.max(
    ...Object.values(voteResult.age).map(voteResult => voteResult.total)
  );

  return (
    <GS.GraphContainer $size={size}>
      <GS.Line $size={size} />
      {AGE_OPTION.map(option => {
        const voteResultFilteredByAge = voteResult.age[option];
        const amount = Math.floor((voteResultFilteredByAge.total / maxVoteAmount) * 100);

        return (
          <S.OptionContainer $size={size}>
            <span aria-label="투표한 인원">{voteResultFilteredByAge.total}</span>
            <S.OptionLength $amount={amount} />
            <span aria-label="투표한 나이대">{voteResultFilteredByAge.name}</span>
          </S.OptionContainer>
        );
      })}
    </GS.GraphContainer>
  );
}
