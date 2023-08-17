import { useContext, useRef } from 'react';

import { AuthContext } from '@hooks/context/auth';
import { useCommentList } from '@hooks/query/comment/useCommentList';
import { useMoreComment } from '@hooks/useMoreComment';

import SquareButton from '@components/common/SquareButton';

import { scrollToTop } from '@utils/scrollToTop';

import CommentItem from './CommentItem';
import CommentLoginSection from './CommentLoginSection';
import CommentTextForm from './CommentTextForm';
import { COMMENT_USER } from './constants';
import * as S from './style';

interface CommentListProps {
  postId: number;
  postWriterName: string;
}

const initialComment = {
  id: -1,
  member: {
    id: -1,
    nickname: '',
  },
  content: '',
  createdAt: '',
  isEdit: false,
};

export default function CommentList({ postId, postWriterName }: CommentListProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const { data: commentList } = useCommentList(postId);
  const { loggedInfo } = useContext(AuthContext);
  const { isLoggedIn, id: memberId } = loggedInfo;

  const isGuest = !isLoggedIn;

  const { slicedCommentList, handleMoreComment, hasMoreComment } = useMoreComment(
    commentList ?? []
  );

  const getUserType = (writerId: number) => {
    if (isGuest) {
      return COMMENT_USER.GUEST;
    }

    if (writerId === memberId) {
      return COMMENT_USER.WRITER;
    }

    return COMMENT_USER.NOT_WRITER;
  };

  return (
    <S.Container>
      <S.TextOrLoginWrapper>
        {isGuest ? (
          <CommentLoginSection name={postWriterName} />
        ) : (
          <CommentTextForm commentId={-1} initialComment={initialComment} />
        )}
      </S.TextOrLoginWrapper>
      <S.ListContainer>
        {slicedCommentList.map((comment, index) => {
          if (index % 10 === 9) {
            return (
              <>
                <CommentItem
                  key={comment.id}
                  comment={comment}
                  userType={getUserType(comment.member.id)}
                />
                <S.HiddenInput
                  ref={inputRef}
                  aria-label={`${index + 1}번째 댓글입니다`}
                  role="contentinfo"
                  inputMode="none"
                />
              </>
            );
          }
          return (
            <CommentItem
              key={comment.id}
              comment={comment}
              userType={getUserType(comment.member.id)}
            />
          );
        })}
      </S.ListContainer>
      {hasMoreComment && (
        <S.MoreButtonWrapper>
          <SquareButton
            onClick={() => {
              handleMoreComment();
              inputRef.current?.focus();
            }}
            theme="fill"
          >
            더보기
          </SquareButton>
        </S.MoreButtonWrapper>
      )}
      <S.ButtonContainer>
        <S.TopButtonWrapper>
          <SquareButton onClick={scrollToTop} theme="blank" aria-label="최상단으로 이동">
            TOP
          </SquareButton>
        </S.TopButtonWrapper>
      </S.ButtonContainer>
    </S.Container>
  );
}
