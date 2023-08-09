import { useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { AuthContext } from '@hooks/context/auth';
import { useCommentList } from '@hooks/query/comment/useCommentList';
import { usePostDetail } from '@hooks/query/post/usePostDetail';

import { removePost, setEarlyClosePost } from '@api/post';

import CommentList from '@components/comment/CommentList';
import Layout from '@components/common/Layout';
import NarrowTemplateHeader from '@components/common/NarrowTemplateHeader';
import Post from '@components/common/Post';

import { checkClosedPost } from '@utils/time';

import BottomButtonPart from './BottomButtonPart';
import InnerHeaderPart from './InnerHeaderPart';
import * as S from './style';

export default function PostDetailPage() {
  const navigate = useNavigate();

  const params = useParams() as { postId: string };
  const postId = Number(params.postId);

  const { loggedInfo } = useContext(AuthContext);
  const memberId = loggedInfo.id;

  const { data: postData, isError, isLoading } = usePostDetail(!loggedInfo.isLoggedIn, postId);
  const { data: commentData, isLoading: isCommentLoading } = useCommentList(postId);

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
          {isError && 'error발생'}
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
        })
        .catch(error => alert(error.message));
    },
    removePost: async () => {
      if (!isClosed) alert('마감된 게시물만 삭제 가능합니다.');

      await removePost(postId)
        .catch(error => alert(error.message))
        .then(res => alert('게시물을 삭제했습니다.'));
    },
    reportPost: () => {
      //아직 api 논의하지 않음
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
          isGuest={!!memberId}
          postWriterName={'익명의손님1'}
        />
      )}
    </Layout>
  );
}
