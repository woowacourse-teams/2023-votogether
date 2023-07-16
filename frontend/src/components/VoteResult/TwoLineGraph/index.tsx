import { Size } from '@components/common/AddButton/type';

import * as GS from '../GraphStyle';
import { AgeCategory, VoteResult } from '../type';

import * as S from './style';

export default function TwoLineGraph({ voteResult, size }: { voteResult: VoteResult; size: Size }) {
  const ageCategory = Object.keys(voteResult.age) as AgeCategory[];

  const maxVoteAmount = Math.max(
    ...Object.values(voteResult.age).map(voteResult => Math.max(voteResult.female, voteResult.male))
  );

  return (
    <GS.GraphContainer $size={size}>
      <GS.Line $size={size} />
      {ageCategory.map(age => {
        return (
          <S.OptionContainer $size={size}>
            <S.DataWrapper>
              <S.OptionLengthWrapper $gender="female">
                <span aria-label="투표한 여자수">{voteResult.age[age].female}</span>
                <S.OptionLength
                  $amount={(voteResult.age[age].female / maxVoteAmount) * 100}
                  $gender="female"
                />
              </S.OptionLengthWrapper>
              <S.OptionLengthWrapper $gender="male">
                <span aria-label="투표한 남자수">{voteResult.age[age].male}</span>
                <S.OptionLength
                  $amount={(voteResult.age[age].male / maxVoteAmount) * 100}
                  $gender="male"
                />
              </S.OptionLengthWrapper>
            </S.DataWrapper>
            <span aria-label="투표한 나이대">{voteResult.age[age].name}</span>
          </S.OptionContainer>
        );
      })}
    </GS.GraphContainer>
  );
}
