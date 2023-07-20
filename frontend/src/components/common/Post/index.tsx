import { PostInfo } from '@type/post';

import { changeVotedOption, votePost } from '@api/post';

import WrittenVoteOptionList from '@components/optionList/WrittenVoteOptionList';

import { POST } from '@constants/vote';

import * as S from './style';

interface PostProps {
  postInfo: PostInfo;
  isPreview: boolean;
}

export default function Post({ postInfo, isPreview }: PostProps) {
  const { postId, category, title, writer, startTime, endTime, content, voteInfo } = postInfo;

  const handleVoteClick = (newOptionId: number) => {
    if (voteInfo.selectedOptionId === newOptionId) return;

    if (voteInfo.selectedOptionId === POST.NOT_VOTE) {
      votePost(postId, newOptionId);
      return;
    }

    changeVotedOption(postId, {
      originOptionId: voteInfo.selectedOptionId,
      newOptionId,
    });
  };

  return (
    <S.Container>
      <S.Category>{category.map(category => category.name).join(' | ')}</S.Category>
      <S.Title $isPreview={isPreview}>{title}</S.Title>
      <S.Wrapper>
        <S.Writer>{writer.nickname}</S.Writer>
        <S.Wrapper>
          <span>{startTime}</span>
          <span>{endTime}</span>
        </S.Wrapper>
      </S.Wrapper>
      <S.Content $isPreview={isPreview}>{content}</S.Content>
      <WrittenVoteOptionList
        selectedOptionId={voteInfo.selectedOptionId}
        handleVoteClick={handleVoteClick}
        isPreview={isPreview}
        voteOptionList={voteInfo.options}
      />
    </S.Container>
  );
}
