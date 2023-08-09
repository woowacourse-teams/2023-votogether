import { MouseEvent, useContext } from 'react';

import { PostInfo } from '@type/post';

import { AuthContext } from '@hooks/context/auth';
import { useCreateVote } from '@hooks/query/post/useCreateVote';
import { useEditVote } from '@hooks/query/post/useEditVote';

import WrittenVoteOptionList from '@components/optionList/WrittenVoteOptionList';

import { PATH } from '@constants/path';
import { POST } from '@constants/vote';

import { checkClosedPost } from '@utils/time';

import * as S from './style';

interface PostProps {
  postInfo: PostInfo;
  isPreview: boolean;
}

export default function Post({ postInfo, isPreview }: PostProps) {
  const { postId, category, title, writer, createTime, deadline, content, voteInfo } = postInfo;
  const { loggedInfo } = useContext(AuthContext);
  const { mutate: createVote } = useCreateVote({ isPreview, postId });
  const { mutate: editVote } = useEditVote({ isPreview, postId });

  const isActive = !checkClosedPost(deadline);

  const handleVoteClick = (newOptionId: number) => {
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

  return (
    <S.Container>
      <S.DetailLink
        to={isPreview ? `${PATH.POST}/${postId}` : '#'}
        $isPreview={isPreview}
        onClick={handleLinkClick}
        aria-describedby={
          isPreview ? '해당 게시물의 상세페이지로 이동하기' : '현재 상세페이지이므로 사용할 수 없음'
        }
        aria-disabled={isPreview ? false : true}
      >
        <S.Category aria-label="카테고리">
          {category.map(category => category.name).join(' | ')}
        </S.Category>
        <S.ActivateState aria-label="마감 상태" $isActive={isActive} />
        <S.Title aria-label="제목" $isPreview={isPreview}>
          {title}
        </S.Title>
        <S.Wrapper>
          <span aria-label="작성자">{writer.nickname}</span>
          <S.Wrapper>
            <span aria-label="작성일시">{createTime}</span>
            <span aria-label="투표 마감일시">{deadline}</span>
          </S.Wrapper>
        </S.Wrapper>
        <S.Content aria-label="내용" $isPreview={isPreview}>
          {content}
        </S.Content>
      </S.DetailLink>
      <WrittenVoteOptionList
        //현재 contextAPI 안에 유저 ID가 없어서 nickname으로 대체
        isWriter={writer.nickname === loggedInfo.userInfo?.nickname}
        selectedOptionId={voteInfo.selectedOptionId}
        handleVoteClick={handleVoteClick}
        isPreview={isPreview}
        voteOptionList={voteInfo.options}
      />
    </S.Container>
  );
}
