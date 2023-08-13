import { useContext, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { ReportRequest } from '@type/report';

import { AuthContext } from '@hooks/context/auth';
import { useCommentList } from '@hooks/query/comment/useCommentList';
import { useDeletePost } from '@hooks/query/post/useDeletePost';
import { useEarlyClosePost } from '@hooks/query/post/useEarlyClosePost';
import { usePostDetail } from '@hooks/query/post/usePostDetail';

import { useToast } from '@hooks/useToast';

import { reportContent } from '@api/report';

import CommentList from '@components/comment/CommentList';
import Layout from '@components/common/Layout';
import NarrowTemplateHeader from '@components/common/NarrowTemplateHeader';
import Post from '@components/common/Post';
import Toast from '@components/common/Toast';

import { checkClosedPost } from '@utils/time';

import BottomButtonPart from './BottomButtonPart';
import InnerHeaderPart from './InnerHeaderPart';
import * as S from './style';

export default function PostDetailPage() {
  const navigate = useNavigate();

  const params = useParams() as { postId: string };
  const postId = Number(params.postId);
  const { isToastOpen, openToast, toastMessage } = useToast();

  const { loggedInfo } = useContext(AuthContext);
  const memberId = loggedInfo.id;

  const {
    data: postData,
    isLoading,
    isError: isPostError,
    error: postError,
  } = usePostDetail(!loggedInfo.isLoggedIn, postId);
  const {
    mutate: deletePost,
    isSuccess: isDeleteSuccess,
    isError: isDeleteError,
    error: deleteError,
  } = useDeletePost(postId, loggedInfo.isLoggedIn);
  const { mutate: earlyClosePost } = useEarlyClosePost(postId);
  const { data: commentData, isLoading: isCommentLoading } = useCommentList(postId);

  useEffect(() => {
    if (isDeleteError && deleteError instanceof Error) {
      openToast(deleteError.message);
    }
  }, [isDeleteError, deleteError]);

  useEffect(() => {
    if (isDeleteSuccess) {
      navigate('/');
    }
  }, [isDeleteSuccess, navigate]);

  if (!postData) {
    return (
      <Layout isSidebarVisible={true}>
        <S.HeaderContainer>
          <NarrowTemplateHeader />
        </S.HeaderContainer>
        <S.MainContainer>
          {isLoading && 'loading'}
          {isPostError && postError instanceof Error && postError.message}
        </S.MainContainer>
      </Layout>
    );
  }

  if (isLoading) {
    return <div>로딩중</div>;
  }

  const isWriter = postData.writer.id === memberId;
  const isClosed = checkClosedPost(postData.deadline);

  const movePage = {
    moveWritePostPage: () => {
      if (postData.voteInfo.allPeopleCount) {
        openToast('투표한 사용자가 있어 글 수정이 불가합니다.');
      }

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
      if (postData.voteInfo.allPeopleCount >= 20) {
        openToast('20인 이상 투표한 게시물은 삭제할 수 없습니다.');
        return;
      }

      deletePost();
    },
    reportPost: async (reason: string) => {
      const reportData: ReportRequest = { type: 'POST', id: postId, reason };

      await reportContent(reportData)
        .then(res => {
          openToast('게시물을 신고했습니다.');
        })
        .catch(e => {
          openToast(e instanceof Error ? e.message : '게시물 신고가 실패했습니다');
        });
    },
    reportNickname: async (reason: string) => {
      const reportData: ReportRequest = { type: 'NICKNAME', id: postData.writer.id, reason };

      await reportContent(reportData)
        .then(res => {
          openToast('작성자 닉네임을 신고했습니다.');
        })
        .catch(e => {
          openToast(e instanceof Error ? e.message : '작성자 닉네임 신고가 실패했습니다.');
        });
    },
  };

  return (
    <Layout isSidebarVisible={true}>
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
        <Post postInfo={postData} isPreview={false} />
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
            postWriterName={postData.writer.nickname}
          />
        </S.BottomContainer>
      )}
      {isToastOpen && (
        <Toast size="md" position="bottom">
          {toastMessage}
        </Toast>
      )}
    </Layout>
  );
}
