import { MouseEvent, useContext, useEffect } from 'react';

import { PostInfo } from '@type/post';

import { AuthContext } from '@hooks/context/auth';
import { useCreateVote } from '@hooks/query/post/useCreateVote';
import { useEditVote } from '@hooks/query/post/useEditVote';
import { useToast } from '@hooks/useToast';

import WrittenVoteOptionList from '@components/optionList/WrittenVoteOptionList';

import { PATH } from '@constants/path';
import { POST } from '@constants/vote';

import { convertImageUrlToServerUrl } from '@utils/post/convertImageUrlToServerUrl';
import { checkClosedPost, convertTimeToWord } from '@utils/time';

import photoIcon from '@assets/photo_white.svg';

import Toast from '../Toast';

import * as S from './style';

interface PostProps {
  postInfo: PostInfo;
  isPreview: boolean;
}

export default function Post({ postInfo, isPreview }: PostProps) {
  const { postId, category, imageUrl, title, writer, createTime, deadline, content, voteInfo } =
    postInfo;
  const { loggedInfo } = useContext(AuthContext);
  const { isToastOpen, openToast, toastMessage } = useToast();

  const {
    mutate: createVote,
    isError: isCreateError,
    error: createError,
  } = useCreateVote({ isPreview, postId });
  const {
    mutate: editVote,
    isError: isEditError,
    error: editError,
  } = useEditVote({ isPreview, postId });

  const isActive = !checkClosedPost(deadline);

  const isStatisticsVisible =
    writer.id === loggedInfo.id || !isActive || voteInfo.selectedOptionId !== POST.NOT_VOTE;

  const handleVoteClick = (newOptionId: number) => {
    if (!loggedInfo.isLoggedIn) {
      openToast('투표를 하려면 로그인 후에 이용하실 수 있습니다.');
      return;
    }

    if (!isActive) {
      openToast('마감된 게시글에는 투표를 할 수 없습니다.');
      return;
    }

    if (writer.nickname === loggedInfo.userInfo?.nickname) return;

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

  const handleLinkClick = (e: MouseEvent<HTMLAnchorElement>) => {
    if (!isPreview) e.preventDefault();
  };

  useEffect(() => {
    if (isCreateError && createError instanceof Error) {
      openToast(createError.message);
    }
  }, [isCreateError, createError]);

  useEffect(() => {
    if (isEditError && editError instanceof Error) {
      openToast(editError.message);
    }
  }, [isEditError, editError]);

  const checkIncludeImage = () => {
    if (imageUrl !== '') return true;

    return voteInfo.options.map(option => option.imageUrl).some(url => url !== '');
  };

  return (
    <S.Container>
      <S.DetailLink
        to={isPreview ? `${PATH.POST}/${postId}` : '#'}
        $isPreview={isPreview}
        onClick={handleLinkClick}
        aria-describedby={
          isPreview
            ? '해당 게시물의 상세페이지로 이동하기'
            : '현재 상세페이지이므로 사용할 수 없습니다.'
        }
        aria-disabled={isPreview ? false : true}
      >
        <S.Category aria-label="카테고리">
          {category.map(category => category.name).join(' | ')}
        </S.Category>
        {isPreview && checkIncludeImage() && (
          <S.ImageIconWrapper>
            <S.ImageIcon src={photoIcon} alt="해당 게시물은 사진을 포함하고 있습니다." />
          </S.ImageIconWrapper>
        )}
        <S.ActivateState aria-label="마감 상태" $isActive={isActive} />
        <S.Title aria-label="제목" $isPreview={isPreview}>
          {title}
        </S.Title>
        <S.Wrapper>
          <span aria-label="작성자">{writer.nickname}</span>
          <S.Wrapper>
            <span aria-label="작성일시">{convertTimeToWord(createTime)}</span>
            <span aria-label="투표 마감일시">
              {isActive ? convertTimeToWord(deadline) : '마감 완료'}
            </span>
          </S.Wrapper>
        </S.Wrapper>
        <S.Content aria-label="내용" $isPreview={isPreview}>
          {content}
        </S.Content>
        {!isPreview && imageUrl && (
          <S.Image src={convertImageUrlToServerUrl(imageUrl)} alt={'본문에 포함된 이미지'} />
        )}
      </S.DetailLink>
      <WrittenVoteOptionList
        isStatisticsVisible={isStatisticsVisible}
        selectedOptionId={voteInfo.selectedOptionId}
        handleVoteClick={handleVoteClick}
        isPreview={isPreview}
        voteOptionList={voteInfo.options}
      />
      {isToastOpen && (
        <Toast size="md" position="bottom">
          {toastMessage}
        </Toast>
      )}
    </S.Container>
  );
}
