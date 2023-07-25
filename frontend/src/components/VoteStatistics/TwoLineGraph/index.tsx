import * as GS from '../GraphStyle';
import { AGE_OPTION, GraphProps } from '../type';

import * as S from './style';

export default function TwoLineGraph({ voteResult, size }: GraphProps) {
  const maxVoteAmount = Math.max(
    ...Object.values(voteResult.age).map(voteResult => Math.max(voteResult.female, voteResult.male))
  );

  return (
    <GS.GraphContainer $size={size}>
      <GS.Line $size={size} />
      {AGE_OPTION.map(option => {
        const voteResultFilteredByAge = voteResult.age[option];

        return (
          <S.OptionContainer key={option} $size={size}>
            <S.DataWrapper>
              <S.OptionLengthWrapper $gender="female">
                <span aria-label="투표한 여자수">{voteResultFilteredByAge.female}</span>
                <S.OptionLength
                  $amount={(voteResultFilteredByAge.female / maxVoteAmount) * 100}
                  $gender="female"
                />
              </S.OptionLengthWrapper>
              <S.OptionLengthWrapper $gender="male">
                <span aria-label="투표한 남자수">{voteResultFilteredByAge.male}</span>
                <S.OptionLength
                  $amount={(voteResultFilteredByAge.male / maxVoteAmount) * 100}
                  $gender="male"
                />
              </S.OptionLengthWrapper>
            </S.DataWrapper>
            <span aria-label="투표한 나이대">{voteResultFilteredByAge.name}</span>
          </S.OptionContainer>
        );
      })}
    </GS.GraphContainer>
  );
}
