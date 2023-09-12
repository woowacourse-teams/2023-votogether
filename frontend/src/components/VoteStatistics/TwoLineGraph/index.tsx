import * as GS from '../GraphStyle';
import { GraphProps } from '../type';

import * as S from './style';

export default function TwoLineGraph({ ageGroup, size }: GraphProps) {
  const maxVoteAmount = Math.max(
    ...ageGroup.map(voteResult => Math.max(voteResult.female, voteResult.male))
  );

  return (
    <GS.GraphContainer $size={size}>
      <GS.Line $size={size} />
      {ageGroup.map(ageResult => {
        return (
          <S.OptionContainer key={ageResult.name} $size={size}>
            <S.DataWrapper>
              <S.OptionLengthWrapper $gender="FEMALE">
                <span aria-label={`${ageResult.name}에서 ${ageResult.female}명의 여성이 투표`}>
                  {ageResult.female}
                </span>
                <S.OptionLength
                  $amount={(ageResult.female / maxVoteAmount) * 100}
                  $gender="FEMALE"
                />
              </S.OptionLengthWrapper>
              <S.OptionLengthWrapper $gender="MALE">
                <span aria-label={`${ageResult.name}에서 ${ageResult.male}명의 남성이 투표`}>
                  {ageResult.male}
                </span>
                <S.OptionLength $amount={(ageResult.male / maxVoteAmount) * 100} $gender="MALE" />
              </S.OptionLengthWrapper>
            </S.DataWrapper>
            <span aria-hidden="true">{ageResult.name}</span>
          </S.OptionContainer>
        );
      })}
    </GS.GraphContainer>
  );
}
