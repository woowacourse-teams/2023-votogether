import { useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { PostInfo } from '@type/post';
import { ReportRequest } from '@type/report';

import { AuthContext } from '@hooks/context/auth';
import { useCommentList } from '@hooks/query/comment/useCommentList';
import { useDeletePost } from '@hooks/query/post/useDeletePost';
import { useEarlyClosePost } from '@hooks/query/post/useEarlyClosePost';
import { usePostDetail } from '@hooks/query/post/usePostDetail';

import { reportContent } from '@api/report';

import CommentList from '@components/comment/CommentList';
import NarrowTemplateHeader from '@components/common/NarrowTemplateHeader';
import Post from '@components/common/Post';

import { checkClosedPost } from '@utils/time';

import BottomButtonPart from '../BottomButtonPart';
import InnerHeaderPart from '../InnerHeaderPart';

import * as S from './style';

export default function PostDetail() {
  const navigate = useNavigate();

  const params = useParams() as { postId: string };
  const postId = Number(params.postId);

  const { loggedInfo } = useContext(AuthContext);
  const memberId = loggedInfo.id;

  const { data: postData } = usePostDetail(!loggedInfo.isLoggedIn, postId);
  const { mutate: deletePost } = useDeletePost(postId, loggedInfo.isLoggedIn);
  const { mutate: earlyClosePost } = useEarlyClosePost(postId);
  const { data: commentData, isLoading: isCommentLoading } = useCommentList(postId);

  const postDataFallback = postData ?? ({} as PostInfo);

  const isWriter = postDataFallback.writer.id === memberId;
  const isClosed = checkClosedPost(postDataFallback.deadline);

  const movePage = {
    moveWritePostPage: () => {
      if (postDataFallback.voteInfo.allPeopleCount)
        alert('투표한 사용자가 있어 글 수정이 불가합니다.');

      navigate(`/posts/write/${postId}`);
    },
    moveVoteStatisticsPage: () => {
      navigate(`/posts/result/${postId}`);
    },
    movePostListPage: () => {
      navigate('/');
    },
  };

  const controlPost = {
    setEarlyClosePost: earlyClosePost,
    deletePost: () => {
      if (postDataFallback.voteInfo.allPeopleCount >= 20)
        return alert('20인 이상 투표한 게시물은 삭제할 수 없습니다.');

      deletePost();
      //추후 삭제가 되었을 때 nav로 홈으로 이동하도록 하기
    },
    reportPost: async (reason: string) => {
      const reportData: ReportRequest = { type: 'POST', id: postId, reason };

      await reportContent(reportData)
        .then(res => alert('게시물을 신고했습니다.'))
        .catch(error => alert('게시물 신고가 실패했습니다.'));
    },
    reportNickname: async (reason: string) => {
      const reportData: ReportRequest = {
        type: 'NICKNAME',
        id: postDataFallback.writer.id,
        reason,
      };

      await reportContent(reportData)
        .then(res => alert('작성자 닉네임을 신고했습니다.'))
        .catch(error => alert('작성자 닉네임 신고가 실패했습니다.'));
    },
  };

  return (
    <>
      <S.HeaderContainer>
        <NarrowTemplateHeader>
          <InnerHeaderPart
            isClosed={isClosed}
            isWriter={isWriter}
            handleEvent={{ movePage, controlPost }}
          />
        </NarrowTemplateHeader>
      </S.HeaderContainer>
      <S.MainContainer>
        <Post postInfo={postDataFallback} isPreview={false} />
        <BottomButtonPart
          isClosed={isClosed}
          isWriter={isWriter}
          handleEvent={{ movePage, controlPost }}
        />
      </S.MainContainer>
      {!isCommentLoading && (
        <S.BottomContainer>
          <CommentList
            commentList={commentData ?? []}
            memberId={memberId}
            isGuest={!loggedInfo.isLoggedIn}
            postWriterName={postDataFallback.writer.nickname}
          />
        </S.BottomContainer>
      )}
    </>
  );
}
