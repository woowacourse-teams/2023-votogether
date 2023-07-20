import { useNavigate, useParams } from 'react-router-dom';

import { useFetch } from '@hooks/useFetch_2';

import { getPost, removePost, setEarlyClosePost } from '@api/post';

import NarrowTemplateHeader from '@components/common/NarrowTemplateHeader';
import Post from '@components/common/Post';
import { MOCK_NOT_VOTE_POST } from '@components/common/Post/mockData';

import { checkClosedPost } from '@utils/time';

import BottomButtonPart from './BottomButtonPart';
import InnerHeaderPart from './InnerHeaderPart';
import * as S from './style';

export default function PostDetailPage() {
  const navigate = useNavigate();

  const params = useParams() as { postId: string };
  const postId = Number(params.postId);

  const userId = 1;

  const { data: postData, errorMessage, isLoading, refetch } = useFetch(() => getPost(postId));

  if (!postData) {
    return (
      <>
        <S.HeaderContainer>
          <NarrowTemplateHeader>
            <></>
          </NarrowTemplateHeader>
        </S.HeaderContainer>
        <S.Container>
          {isLoading && 'loading'}
          {errorMessage && errorMessage}
        </S.Container>
      </>
    );
  }

  if (isLoading) {
    return <div>로딩중</div>;
  }

  const isWriter = postData.writer.id === userId;
  const isClosed = checkClosedPost(postData.endTime);

  const movePage = {
    moveWritePostPage: () => {
      if (postData.voteInfo.allPeopleCount) alert('투표한 사용자가 있어 글 수정이 불가합니다.');

      navigate(`/posts/write/${postId}`);
    },
    moveVoteStatisticsPage: () => {
      navigate(`/posts/write/${postId}`);
    },
    movePostListPage: () => {
      navigate('/');
    },
  };

  const controlPost = {
    setEarlyClosePost: async () => {
      await setEarlyClosePost(postId)
        .catch(error => alert(error.message))
        .then(res => {
          alert('게시물을 즉시마감했습니다.');
          refetch();
        });
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
      <S.Container>
        <Post postInfo={MOCK_NOT_VOTE_POST} isPreview={false} />
        <BottomButtonPart
          isClosed={isClosed}
          isWriter={isWriter}
          handleEvent={{ movePage, controlPost }}
        />
      </S.Container>
    </>
  );
}
