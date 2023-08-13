// import IconButton from '../IconButton';
// import SquareButton from '../SquareButton';

import * as S from './style';

export default function ErrorMessage({ errorHandler }: { errorHandler?: () => void }) {
  return (
    <S.Wrapper>
      <S.Title>⚠ 잠시 후 다시 시도해주세요.</S.Title>
      <S.Description>요청하신 데이터를 불러오는데 실패했습니다.</S.Description>
      {/* <S.Direction>
        <SquareButton onClick={errorHandler} aria-label="다시 시도" theme="blank">
          <S.RetryText>
            <IconButton category="retry" />
            다시 시도
          </S.RetryText>
        </SquareButton>
      </S.Direction> */}
    </S.Wrapper>
  );
}
