import { useNavigate, useParams } from 'react-router-dom';

import { ReportRequest } from '@type/report';

import { useCommentList } from '@hooks/query/comment/useCommentList';
import { useFetch } from '@hooks/useFetch';

import { getPost, removePost, setEarlyClosePost } from '@api/post';
import { reportContent } from '@api/report';

import CommentList from '@components/comment/CommentList';
import Layout from '@components/common/Layout';
import NarrowTemplateHeader from '@components/common/NarrowTemplateHeader';
import Post from '@components/common/Post';

import { getCookieToken, getMemberId } from '@utils/cookie';
import { checkClosedPost } from '@utils/time';

import BottomButtonPart from './BottomButtonPart';
import InnerHeaderPart from './InnerHeaderPart';
import * as S from './style';

export default function PostDetailPage() {
  const navigate = useNavigate();

  const params = useParams() as { postId: string };
  const postId = Number(params.postId);

  const token = getCookieToken().accessToken;
  const decodedPayload = getMemberId(token);
  const memberId = decodedPayload.memberId;

  const { data: postData, errorMessage, isLoading, refetch } = useFetch(() => getPost(postId));
  const { data: commentData, isLoading: isCommentLoading } = useCommentList(postId);
  // const { data: userInfo, isLoading: isUserInfoLoading, error } = useUserInfo(isLoggedIn);

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
          {errorMessage && errorMessage}
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
      if (postData.voteInfo.allPeopleCount) alert('투표한 사용자가 있어 글 수정이 불가합니다.');

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
    setEarlyClosePost: async () => {
      await setEarlyClosePost(postId)
        .then(res => {
          alert('게시물을 즉시마감했습니다.');
          refetch();
        })
        .catch(error => alert(error.message));
    },
    removePost: async () => {
      if (!isClosed) alert('마감된 게시물만 삭제 가능합니다.');

      await removePost(postId)
        .then(res => alert('게시물을 삭제했습니다.'))
        .catch(error => alert(error.message));
    },
    reportPost: async (reason: string) => {
      const reportData = { type: 'POST', id: postId, reason } as ReportRequest;

      await reportContent(reportData)
        .then(res => alert('게시물을 신고했습니다.'))
        .catch(error => alert('게시물 신고가 샐패했습니다.'));
    },
    reportNickname: async (reason: string) => {
      const reportData = { type: 'NICKNAME', id: postData.writer.id, reason } as ReportRequest;

      await reportContent(reportData)
        .then(res => alert('작성자 닉네임을 신고했습니다.'))
        .catch(error => alert('작성자 닉네임 신고가 샐패했습니다.'));
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
          isGuest={false}
          postWriterName={'익명의손님1'}
        />
      )}
    </Layout>
  );
}
