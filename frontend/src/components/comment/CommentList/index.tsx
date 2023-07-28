import { type Comment } from '@type/comment';

import { useMoreComment } from '@hooks/useMoreComment';

import SquareButton from '@components/common/SquareButton';

import { COMMENT_USER } from '@constants/comment';

import { scrollToTop } from '@utils/scrollToTop';

import CommentItem from './CommentItem';
import CommentLogin from './CommentLogin';
import CommentTextForm from './CommentTextForm';
import * as S from './style';

interface CommentListProps {
  commentList: Comment[];
  memberId: number;
  isGuest: boolean;
  postWriterName: string;
}

export default function CommentList({
  commentList,
  memberId,
  isGuest,
  postWriterName,
}: CommentListProps) {
  const { slicedCommentList, handleMoreComment, hasMoreComment } = useMoreComment(commentList);

  const getUserType = (writerId: number) => {
    if (isGuest) {
      return COMMENT_USER.GUEST;
    }

    if (writerId === memberId) {
      return COMMENT_USER.WRITER;
    }

    return COMMENT_USER.NORMAL;
  };

  return (
    <S.Container>
      <S.TextOrLoginWrapper>
        {isGuest ? <CommentLogin name={postWriterName} /> : <CommentTextForm initialComment="" />}
      </S.TextOrLoginWrapper>
      <S.ListContainer>
        {slicedCommentList.map(comment => (
          <CommentItem
            key={comment.id}
            comment={comment}
            userType={getUserType(comment.member.id)}
          />
        ))}
      </S.ListContainer>
      {hasMoreComment && (
        <S.MoreButtonWrapper>
          <SquareButton onClick={handleMoreComment} theme="fill">
            더보기
          </SquareButton>
        </S.MoreButtonWrapper>
      )}
      <S.ButtonContainer>
        <S.TopButtonWrapper>
          <SquareButton onClick={scrollToTop} theme="blank">
            TOP
          </SquareButton>
        </S.TopButtonWrapper>
      </S.ButtonContainer>
    </S.Container>
  );
}
