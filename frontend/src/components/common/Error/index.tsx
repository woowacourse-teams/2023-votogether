import IconButton from '../IconButton';

import * as S from './style';

export default function Error() {
  return (
    <S.Wrapper>
      <S.Title>⚠ 잠시 후 다시 시도해주세요.</S.Title>
      <S.Description>요청 사항을 처리하는데 실패했습니다.</S.Description>
      <S.Direction>
        <S.Text>
          <IconButton category="retry" />
          다시시도
        </S.Text>
        <S.RetryText>오류가 지속되는 경우 votogether@gmail.com 로 문의해주세요.</S.RetryText>
      </S.Direction>
    </S.Wrapper>
  );
}
