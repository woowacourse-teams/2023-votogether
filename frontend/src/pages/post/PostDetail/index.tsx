import { useLocation, useNavigate } from 'react-router-dom';

import { useFetch } from '@hooks/useFetch_2';

import { getPost, removePost, setEarlyClosePost } from '@api/sua/post';

import HeaderTextButton from '@components/common/HeaderTextButton';
import IconButton from '@components/common/IconButton';
import NarrowTemplateHeader from '@components/common/NarrowTemplateHeader';
import Post from '@components/common/Post';
import { mockNotVotedPost } from '@components/common/Post/mockData';
import SquareButton from '@components/common/SquareButton';
import TagButton from '@components/common/TagButton';

import { checkClosedPost } from '@utils/time';

import * as S from './style';

export default function PostDetailPage({ userId }: { userId: number }) {
  const navigate = useNavigate();
  const movePostListPage = () => {
    navigate('posts/');
  };

  const location = useLocation();
  // const postId = location.state.id;
  const postId = 1;

  const { data: postData, errorMessage, isLoading } = useFetch(() => getPost(postId));

  if (errorMessage || isLoading) {
    return (
      <>
        <S.HeaderContainer>
          <NarrowTemplateHeader>
            <IconButton category="back" onClick={movePostListPage} />
          </NarrowTemplateHeader>
        </S.HeaderContainer>
        <S.Container>
          {isLoading && 'loading'}
          {errorMessage && errorMessage}
        </S.Container>
      </>
    );
  }

  if (!postData) return <></>;

  const isWriter = postData.writer.id === userId;

  const useReportPost = () => {
    //아직 api 논의하지 않음
  };

  if (!isWriter)
    return (
      <>
        <S.HeaderContainer>
          <NarrowTemplateHeader>
            <IconButton category="back" onClick={movePostListPage} />
            <S.HeaderWrapper>
              <HeaderTextButton onClick={useReportPost}>신고</HeaderTextButton>
            </S.HeaderWrapper>
          </NarrowTemplateHeader>
        </S.HeaderContainer>
        <S.Container>
          <Post postInfo={mockNotVotedPost} isPreview={false} />
          <S.BottomButtonContainer>
            <SquareButton theme="fill">신 고</SquareButton>
          </S.BottomButtonContainer>
        </S.Container>
      </>
    );

  const useRemovePost = async () => {
    await removePost(postId)
      .catch(rej => alert(rej.message))
      .then(res => alert('게시물을 삭제했습니다.'));
  };

  const moveVoteStatisticsPage = () => {
    //수정필요
    navigate(`posts/write/${postId}`);
  };

  const isClosedPost = checkClosedPost(postData.startTime, postData.endTime);
  if (isClosedPost) {
    return (
      <>
        <S.HeaderContainer>
          <NarrowTemplateHeader>
            <IconButton category="back" onClick={movePostListPage} />
            <S.HeaderWrapper>
              <HeaderTextButton onClick={useRemovePost}>삭제</HeaderTextButton>
              <S.TagButtonWrapper>
                <TagButton size="sm" onClick={moveVoteStatisticsPage}>
                  통계보기
                </TagButton>
              </S.TagButtonWrapper>
            </S.HeaderWrapper>
          </NarrowTemplateHeader>
        </S.HeaderContainer>
        <S.Container>
          <Post postInfo={mockNotVotedPost} isPreview={false} />
          <S.BottomButtonContainer>
            <SquareButton theme="fill" onClick={moveVoteStatisticsPage}>
              통계보기
            </SquareButton>
            <SquareButton theme="fill" onClick={useRemovePost}>
              삭 제
            </SquareButton>
          </S.BottomButtonContainer>
        </S.Container>
      </>
    );
  }

  const moveWritePostPage = () => {
    if (postData.voteInfo.allPeopleCount) alert('투표한 사용자가 있어 글 수정이 불가합니다.');

    navigate(`posts/write/${postId}`);
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
          <IconButton category="back" onClick={movePostListPage} />
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
        <S.BottomButtonContainer>
          <SquareButton theme="fill" onClick={useSetEarlyClosePost}>
            조기마감
          </SquareButton>
          <SquareButton theme="blank" onClick={moveWritePostPage}>
            수 정
          </SquareButton>
          <SquareButton theme="fill" onClick={useRemovePost}>
            삭 제
          </SquareButton>
        </S.BottomButtonContainer>
      </S.Container>
    </>
  );
}
