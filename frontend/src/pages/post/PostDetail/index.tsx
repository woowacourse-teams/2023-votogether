import { useLocation, useNavigate } from 'react-router-dom';

import { useFetch } from '@hooks/useFetch_2';

import { getPost, removePost, setEarlyClosePost } from '@api/sua/post';

import HeaderTextButton from '@components/common/HeaderTextButton';
import IconButton from '@components/common/IconButton';
import NarrowTemplateHeader from '@components/common/NarrowTemplateHeader';
import Post from '@components/common/Post';
import { mockNotVotedPost } from '@components/common/Post/mockData';
import TagButton from '@components/common/TagButton';

import * as S from './style';

export default function PostDetailPage({ userId }: { userId: number }) {
  const navigate = useNavigate();
  const movePostDetailPage = () => {
    navigate(`posts/${postId}`);
  };

  const location = useLocation();
  // const postId = location.state.id;
  const postId = 1;

  const { data, errorMessage, isLoading } = useFetch(() => getPost(postId));

  if (errorMessage || isLoading) {
    return (
      <>
        <S.HeaderContainer>
          <NarrowTemplateHeader>
            <IconButton category="back" onClick={movePostDetailPage} />
          </NarrowTemplateHeader>
        </S.HeaderContainer>
        <S.Container>
          {isLoading && 'loading'}
          {errorMessage && errorMessage}
        </S.Container>
      </>
    );
  }

  if (!data) return <></>;

  const isWriter = data.writer.id === userId;

  const useReportPost = () => {
    //아직 api 논의하지 않음
  };

  if (!isWriter)
    return (
      <>
        <S.HeaderContainer>
          <NarrowTemplateHeader>
            <IconButton category="back" onClick={movePostDetailPage} />
            <S.HeaderWrapper>
              <HeaderTextButton onClick={useReportPost}>신고</HeaderTextButton>
            </S.HeaderWrapper>
          </NarrowTemplateHeader>
        </S.HeaderContainer>
        <S.Container>
          <Post postInfo={mockNotVotedPost} isPreview={false} />
        </S.Container>
      </>
    );

  const moveWritePostPage = () => {
    navigate(`posts/write/${postId}`);
  };

  const useRemovePost = async () => {
    await removePost(postId)
      .catch(rej => alert(rej.message))
      .then(res => alert('게시물을 삭제했습니다.'));
  };

  const useSetEarlyClosePost = async () => {
    await setEarlyClosePost(postId)
      .catch(rej => alert(rej.message))
      .then(res => alert('게시물을 즉시마감했습니다.'));
  };

  return (
    <>
      <S.HeaderContainer>
        <NarrowTemplateHeader>
          <IconButton category="back" onClick={movePostDetailPage} />
          <S.HeaderWrapper>
            <HeaderTextButton onClick={moveWritePostPage}>수정</HeaderTextButton>
            <HeaderTextButton onClick={useRemovePost}>삭제</HeaderTextButton>
            <S.TagButtonWrapper>
              <TagButton size="sm" onClick={useSetEarlyClosePost}>
                조기마감
              </TagButton>
            </S.TagButtonWrapper>
          </S.HeaderWrapper>
        </NarrowTemplateHeader>
      </S.HeaderContainer>
      <S.Container>
        <Post postInfo={mockNotVotedPost} isPreview={false} />
      </S.Container>
    </>
  );
}
