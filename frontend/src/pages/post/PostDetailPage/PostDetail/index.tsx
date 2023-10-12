import { Suspense, useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { PostInfo } from '@type/post';
import { ReportRequest } from '@type/report';

import { AuthContext, useDeletePost, useEarlyClosePost, usePostDetail } from '@hooks';

import { ToastContext } from '@hooks/context/toast';

import { reportContent } from '@api/report';

import ErrorBoundary from '@pages/ErrorBoundary';

import CommentList from '@components/comment/CommentList';
import NarrowTemplateHeader from '@components/common/NarrowTemplateHeader';
import Skeleton from '@components/common/Skeleton';
import TagButton from '@components/common/TagButton';
import Post from '@components/post/Post';

import { checkClosedPost } from '@utils/time/checkClosedPost';

import copyURL from '@assets/chain.svg';

import BottomButtonPart from '../BottomButtonPart';
import InnerHeaderPart from '../InnerHeaderPart';

import * as S from './style';

export default function PostDetail() {
  const navigate = useNavigate();

  const [isReportPostLoading, setIsReportPostLoading] = useState(false);
  const [isReportNicknameLoading, setIsReportNicknameLoading] = useState(false);

  const params = useParams() as { postId: string };
  const postId = Number(params.postId);

  const { loggedInfo } = useContext(AuthContext);
  const { addMessage } = useContext(ToastContext);
  const memberId = loggedInfo.id;

  const { data: postData } = usePostDetail(loggedInfo.isLoggedIn, postId);
  const {
    mutate: deletePost,
    isSuccess: isDeleteSuccess,
    isLoading: isDeletePostLoading,
  } = useDeletePost(postId, loggedInfo.isLoggedIn);
  const { mutate: earlyClosePost } = useEarlyClosePost(postId);

  const postDataFallback = postData ?? ({} as PostInfo);

  const isWriter = postDataFallback.writer.id === memberId;
  const isClosed = checkClosedPost(postDataFallback.deadline);

  const movePage = {
    moveWritePostPage: () => {
      if (postDataFallback.voteInfo.allPeopleCount) {
        addMessage('투표한 사용자가 있어 글 수정이 불가합니다.');
        return;
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
        addMessage('20인 이상 투표한 게시물은 삭제할 수 없습니다.');
        return;
      }

      deletePost();
    },
    reportPost: async (reason: string) => {
      setIsReportPostLoading(true);
      const reportData: ReportRequest = { type: 'POST', id: postId, reason };

      await reportContent(reportData)
        .then(res => {
          addMessage('게시물을 신고했습니다.');
        })
        .catch(error => {
          const message = error instanceof Error ? error.message : '게시글 신고를 실패했습니다.';
          addMessage(message);
        })
        .finally(() => {
          setIsReportPostLoading(false);
        });
    },
    reportNickname: async (reason: string) => {
      setIsReportNicknameLoading(true);
      const reportData: ReportRequest = {
        type: 'NICKNAME',
        id: postDataFallback.writer.id,
        reason,
      };

      await reportContent(reportData)
        .then(res => {
          addMessage('작성자 닉네임을 신고했습니다.');
        })
        .catch(error => {
          const message =
            error instanceof Error ? error.message : '작성자 닉네임 신고를 실패했습니다.';
          addMessage(message);
        })
        .finally(() => {
          setIsReportNicknameLoading(false);
        });
    },
    copyPostURL: () => {
      const currentURL = window.location.href;
      navigator.clipboard
        .writeText(currentURL)
        .then(() => {
          addMessage('게시물 URL이 클립보드에 복사되었습니다.');
        })
        .catch(error => {
          addMessage('URL을 클립보드에 복사하는 동안 오류가 발생했습니다. 다시 시도해주세요.');
        });
    },
  };

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
            isEventLoading={{
              isDeletePostLoading,
              isReportPostLoading,
              isReportNicknameLoading,
            }}
          />
        </NarrowTemplateHeader>
      </S.HeaderContainer>
      <S.MainContainer>
        <S.TagButtonWrapper $isWriter={isWriter}>
          <TagButton aria-label="게시글 링크 복사" size="sm" onClick={controlPost.copyPostURL}>
            <img src={copyURL} alt="링크 복사 아이콘" />
          </TagButton>
        </S.TagButtonWrapper>
        <Post postInfo={postDataFallback} isPreview={false} />
        <BottomButtonPart
          isClosed={isClosed}
          isWriter={isWriter}
          handleEvent={{ movePage, controlPost, openToast: addMessage }}
          isEventLoading={{
            isDeletePostLoading,
            isReportPostLoading,
            isReportNicknameLoading,
          }}
        />
      </S.MainContainer>
      <S.BottomContainer>
        <ErrorBoundary retryInteraction={true}>
          <Suspense fallback={<Skeleton isLarge={false} />}>
            <CommentList postId={postId} postWriterName={postDataFallback.writer.nickname} />
          </Suspense>
        </ErrorBoundary>
      </S.BottomContainer>
    </>
  );
}