import { memo, useContext, useEffect } from 'react';

import { PostInfo } from '@type/post';

import { useToast } from '@hooks';

import { AuthContext } from '@hooks/context/auth';
import { useCreateVote } from '@hooks/query/post/useCreateVote';
import { useEditVote } from '@hooks/query/post/useEditVote';

import WrittenVoteOptionList from '@components/optionList/WrittenVoteOptionList';

import { PATH } from '@constants/path';
import { POST } from '@constants/policy';

import { convertTextToElement } from '@utils/post/convertTextToElement';
import { checkClosedPost } from '@utils/time/checkClosedPost';
import { convertTimeToWord } from '@utils/time/convertTimeToWord';

import commentIcon from '@assets/comment.svg';
import photoIcon from '@assets/photo_black.svg';

import Toast from '../../common/Toast';

import * as S from './style';

interface PostProps {
  postInfo: PostInfo;
  isPreview: boolean;
}

export default memo(function Post({ postInfo, isPreview }: PostProps) {
  const {
    postId,
    category,
    imageUrl,
    title,
    writer,
    createTime,
    deadline,
    content,
    voteInfo,
    imageCount,
    commentCount,
  } = postInfo;
  const { loggedInfo } = useContext(AuthContext);
  const { isToastOpen, openToast, toastMessage } = useToast();

  const {
    mutate: createVote,
    isError: isCreateVoteError,
    error: createVoteError,
  } = useCreateVote({ isPreview, postId });
  const {
    mutate: editVote,
    isError: isEditVoteError,
    error: editVoteError,
  } = useEditVote({ isPreview, postId });

  const isActive = !checkClosedPost(deadline);

  const isStatisticsVisible =
    writer.id === loggedInfo.id || !isActive || voteInfo.selectedOptionId !== POST.NOT_VOTE;

  const handleVoteClick = (newOptionId: number) => {
    if (!loggedInfo.isLoggedIn) {
      openToast('투표는 로그인 후에 이용하실 수 있습니다.');
      return;
    }

    if (!isActive) {
      openToast('마감된 게시글에는 투표를 할 수 없습니다.');
      return;
    }

    if (writer.nickname === loggedInfo.userInfo?.nickname) {
      openToast('내가 쓴 글에는 투표를 할 수 없습니다.');
      return;
    }

    if (voteInfo.selectedOptionId === newOptionId) return;

    if (voteInfo.selectedOptionId === POST.NOT_VOTE) {
      createVote(newOptionId);
      return;
    }

    editVote({
      originOptionId: voteInfo.selectedOptionId,
      newOptionId,
    });
  };

  useEffect(() => {
    if (isCreateVoteError && createVoteError instanceof Error) {
      const errorResponse = JSON.parse(createVoteError.message);
      openToast(errorResponse.message);
      return;
    }
  }, [isCreateVoteError, createVoteError]);

  useEffect(() => {
    if (isEditVoteError && editVoteError instanceof Error) {
      const errorResponse = JSON.parse(editVoteError.message);
      openToast(errorResponse.message);
      return;
    }
  }, [isEditVoteError, editVoteError]);

  const isPreviewTabIndex = isPreview ? undefined : 0;

  return (
    <S.Container as={isPreview ? 'li' : 'div'}>
      <S.DetailLink
        as={isPreview ? '' : 'main'}
        to={isPreview ? `${PATH.POST}/${postId}` : '#'}
        $isPreview={isPreview}
        aria-describedby={
          isPreview
            ? '해당 게시물의 상세페이지로 이동하기'
            : '현재 상세페이지이므로 사용할 수 없습니다.'
        }
      >
        <S.Category
          tabIndex={isPreviewTabIndex}
          aria-label={`카테고리 ${category.map(category => category.name).join('|')}`}
        >
          {category.map(category => category.name).join(' | ')}
        </S.Category>
        <S.ActivateState
          tabIndex={isPreviewTabIndex}
          role="status"
          aria-label={`게시글 ${isActive ? '진행중' : '마감완료'}`}
          $isActive={isActive}
        />
        <S.Title
          tabIndex={isPreviewTabIndex}
          aria-label={`게시글 제목: ${title}`}
          $isPreview={isPreview}
        >
          {title}
        </S.Title>
        <S.Wrapper>
          <span aria-label={`작성자 ${writer.nickname}`} tabIndex={isPreviewTabIndex}>
            {writer.nickname}
          </span>
          <S.Wrapper>
            <span
              aria-label={`작성일시 ${convertTimeToWord(createTime)}`}
              tabIndex={isPreviewTabIndex}
            >
              {`${convertTimeToWord(createTime)}  |`}
            </span>
            <span
              aria-label={`투표 마감일시 ${isActive ? convertTimeToWord(deadline) : '마감 완료'}`}
              tabIndex={isPreviewTabIndex}
            >
              {isActive ? convertTimeToWord(deadline) : '마감 완료'}
            </span>
          </S.Wrapper>
        </S.Wrapper>
        <S.Content
          tabIndex={isPreviewTabIndex}
          aria-label={`내용: ${content}`}
          $isPreview={isPreview}
        >
          {convertTextToElement(content)}
        </S.Content>
        {!isPreview && imageUrl && <S.Image src={imageUrl} alt={'본문에 포함된 이미지'} />}
      </S.DetailLink>
      <WrittenVoteOptionList
        isStatisticsVisible={isStatisticsVisible}
        selectedOptionId={voteInfo.selectedOptionId}
        handleVoteClick={handleVoteClick}
        isPreview={isPreview}
        voteOptionList={voteInfo.options}
      />
      {isPreview && (
        <S.PreviewBottom>
          <S.IconUint>
            <S.Icon src={photoIcon} alt="사진 갯수" />
            <span>{imageCount}</span>
          </S.IconUint>
          <S.IconUint>
            <S.Icon src={commentIcon} alt="댓글 갯수" />
            <span>{commentCount}</span>
          </S.IconUint>
        </S.PreviewBottom>
      )}
      {isToastOpen && (
        <Toast size="md" position="bottom">
          {toastMessage}
        </Toast>
      )}
    </S.Container>
  );
});
