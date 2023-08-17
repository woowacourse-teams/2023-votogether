import { Suspense, useContext, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { PostInfo } from '@type/post';
import { ReportRequest } from '@type/report';

import { AuthContext } from '@hooks/context/auth';
import { useDeletePost } from '@hooks/query/post/useDeletePost';
import { useEarlyClosePost } from '@hooks/query/post/useEarlyClosePost';
import { usePostDetail } from '@hooks/query/post/usePostDetail';
import { useToast } from '@hooks/useToast';

import { reportContent } from '@api/report';

import ErrorBoundary from '@pages/ErrorBoundary';

import CommentList from '@components/comment/CommentList';
import NarrowTemplateHeader from '@components/common/NarrowTemplateHeader';
import Post from '@components/common/Post';
import Skeleton from '@components/common/Skeleton';
import Toast from '@components/common/Toast';

import { checkClosedPost } from '@utils/time';

import BottomButtonPart from '../BottomButtonPart';
import InnerHeaderPart from '../InnerHeaderPart';

import * as S from './style';

export default function PostDetail() {
  const navigate = useNavigate();

  const params = useParams() as { postId: string };
  const postId = Number(params.postId);
  const { isToastOpen, openToast, toastMessage } = useToast();

  const { loggedInfo } = useContext(AuthContext);
  const memberId = loggedInfo.id;

  const { data: postData } = usePostDetail(loggedInfo.isLoggedIn, postId);
  const {
    mutate: deletePost,
    isSuccess: isDeleteSuccess,
    isError: isDeleteError,
    error: deleteError,
  } = useDeletePost(postId, loggedInfo.isLoggedIn);
  const { mutate: earlyClosePost } = useEarlyClosePost(postId);

  const postDataFallback = postData ?? ({} as PostInfo);

  const isWriter = postDataFallback.writer.id === memberId;
  const isClosed = checkClosedPost(postDataFallback.deadline);

  const movePage = {
    moveWritePostPage: () => {
      if (postDataFallback.voteInfo.allPeopleCount) {
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
      if (postDataFallback.voteInfo.allPeopleCount >= 20) {
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
          if (e instanceof Error) {
            const errorResposne = JSON.parse(e.message);
            openToast(errorResposne.message);
            return;
          }
          openToast('게시글 신고가 실패했습니다.');
        });
    },
    reportNickname: async (reason: string) => {
      const reportData: ReportRequest = {
        type: 'NICKNAME',
        id: postDataFallback.writer.id,
        reason,
      };

      await reportContent(reportData)
        .then(res => {
          openToast('작성자 닉네임을 신고했습니다.');
        })
        .catch(e => {
          if (e instanceof Error) {
            const errorResposne = JSON.parse(e.message);
            openToast(errorResposne.message);
            return;
          }
          openToast('작성자 닉네임 신고가 실패했습니다.');
        });
    },
  };

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
          handleEvent={{ movePage, controlPost, openToast }}
        />
      </S.MainContainer>
      <S.BottomContainer>
        <ErrorBoundary>
          <Suspense fallback={<Skeleton isLarge={false} />}>
            <CommentList postId={postId} postWriterName={postDataFallback.writer.nickname} />
          </Suspense>
        </ErrorBoundary>
      </S.BottomContainer>
      {isToastOpen && (
        <Toast size="md" position="bottom">
          {toastMessage}
        </Toast>
      )}
    </>
  );
}
