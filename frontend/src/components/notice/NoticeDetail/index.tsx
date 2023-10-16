import { useNavigate } from 'react-router-dom';

import SquareButton from '@components/common/SquareButton';

import * as S from './style';

interface NoticeDetailProps {
  title: string;
  content: string;
  createdAt: string;
}

export default function NoticeDetail({ title, content, createdAt }: NoticeDetailProps) {
  const navigate = useNavigate();
  const createdDate = createdAt.slice(0, 10);

  return (
    <S.Container>
      <S.Category tabIndex={0}>VoTogether 공지사항</S.Category>
      <S.Title tabIndex={0}>{title}</S.Title>
      <S.CreatedAt tabIndex={0}>작성일 : {createdDate}</S.CreatedAt>
      <S.Content tabIndex={0}>{content}</S.Content>
      <S.ButtonContainer>
        <S.ButtonWrapper>
          <SquareButton
            theme="fill"
            onClick={() => {
              navigate('/');
            }}
          >
            홈으로 가기
          </SquareButton>
        </S.ButtonWrapper>
        <S.ButtonWrapper>
          <SquareButton
            theme="blank"
            onClick={() => {
              navigate('/notices');
            }}
          >
            {`공지사항\n목록으로 가기`}
          </SquareButton>
        </S.ButtonWrapper>
      </S.ButtonContainer>
    </S.Container>
  );
}