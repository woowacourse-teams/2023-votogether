import { useContext, useEffect, useState } from 'react';
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
  const { isOpen: isToastOpen, openComponent: openToast } = useToast();
  const [toastMessage, setToastMessage] = useState('');

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
      setToastMessage(deleteError.message);
      openToast();
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
          <NarrowTemplateHeader>
            <></>
          </NarrowTemplateHeader>
        </S.HeaderContainer>
        <S.Container>
          {isLoading && 'loading'}
          {isPostError && postError instanceof Error && postError.message}
        </S.Container>
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
        setToastMessage('투표한 사용자가 있어 글 수정이 불가합니다.');
        openToast();
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
        setToastMessage('20인 이상 투표한 게시물은 삭제할 수 없습니다.');
        openToast();
        return;
      }

      deletePost();
    },
    reportPost: async (reason: string) => {
      const reportData: ReportRequest = { type: 'POST', id: postId, reason };

      await reportContent(reportData)
        .then(res => {
          setToastMessage('게시물을 신고했습니다.');
          openToast();
        })
        .catch(e => {
          setToastMessage(e instanceof Error ? e.message : '게시물 신고가 실패했습니다');
          openToast();
        });
    },
    reportNickname: async (reason: string) => {
      const reportData: ReportRequest = { type: 'NICKNAME', id: postData.writer.id, reason };

      await reportContent(reportData)
        .then(res => {
          setToastMessage('작성자 닉네임을 신고했습니다.');
          openToast();
        })
        .catch(e => {
          setToastMessage(e instanceof Error ? e.message : '작성자 닉네임 신고가 실패했습니다.');
          openToast();
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
      <S.Container>
        <Post postInfo={postData} isPreview={false} />
        <BottomButtonPart
          isClosed={isClosed}
          isWriter={isWriter}
          handleEvent={{ movePage, controlPost }}
        />
      </S.Container>
      {!isCommentLoading && commentData && (
        <CommentList
          commentList={commentData}
          memberId={memberId}
          isGuest={!memberId}
          postWriterName={'익명의손님1'}
        />
      )}
      {isToastOpen && (
        <Toast size="md" position="bottom">
          {toastMessage}
        </Toast>
      )}
    </Layout>
  );
}
