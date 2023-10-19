import { useNavigate } from 'react-router-dom';

import { Notice } from '@type/notice';

import SquareButton from '@components/common/SquareButton';

import { PATH } from '@constants/path';

import * as S from './style';

interface NoticeDetailProps {
  notice: Notice;
}

export default function NoticeDetail({ notice: { title, content, createdAt } }: NoticeDetailProps) {
  const navigate = useNavigate();

  return (
    <S.Container>
      <S.Title tabIndex={0}>{title}</S.Title>
      <S.CreatedAt tabIndex={0}>작성일 : {createdAt}</S.CreatedAt>
      <S.Content tabIndex={0}>{content}</S.Content>
      <S.ButtonContainer>
        <S.ButtonWrapper>
          <SquareButton
            theme="fill"
            onClick={() => {
              navigate(PATH.HOME);
            }}
          >
            홈으로 가기
          </SquareButton>
        </S.ButtonWrapper>
        <S.ButtonWrapper>
          <SquareButton
            theme="blank"
            onClick={() => {
              navigate(PATH.NOTICES);
            }}
          >
            {`공지사항\n목록으로 가기`}
          </SquareButton>
        </S.ButtonWrapper>
      </S.ButtonContainer>
    </S.Container>
  );
}
