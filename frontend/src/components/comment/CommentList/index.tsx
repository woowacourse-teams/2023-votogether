import { useContext, useRef, Fragment } from 'react';

import { useCommentList, useMoreComment, AuthContext } from '@hooks';

import SquareButton from '@components/common/SquareButton';

import { COMMENT_USER } from '@constants/post';

import { smoothScrollToTop } from '@utils/scrollToTop';

import CommentItem from './CommentItem';
import CommentLoginSection from './CommentLoginSection';
import CommentTextForm from './CommentTextForm';
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
        {commentList && commentList.length !== 0 && (
          <S.CommentCount>댓글 {commentList.length}개</S.CommentCount>
        )}
        {slicedCommentList.map((comment, index) => {
          if (index % 10 === 9) {
            return (
              <Fragment key={comment.id}>
                <CommentItem comment={comment} userType={getUserType(comment.member.id)} />
                <S.HiddenInput
                  ref={inputRef}
                  maxLength={0}
                  aria-label={`${index + 1}번째 댓글입니다`}
                  role="contentinfo"
                  inputMode="none"
                />
              </Fragment>
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
              if (!inputRef.current) return;

              handleMoreComment();
              inputRef.current.focus();
              inputRef.current.ariaLabel = '더보기 버튼을 눌러 댓글이 추가되었습니다';
            }}
            theme="fill"
            aria-label="댓글 더보기"
          >
            더보기
          </SquareButton>
        </S.MoreButtonWrapper>
      )}
      <S.ButtonContainer>
        <S.TopButtonWrapper>
          <SquareButton onClick={smoothScrollToTop} theme="blank">
            TOP
          </SquareButton>
        </S.TopButtonWrapper>
      </S.ButtonContainer>
    </S.Container>
  );
}
