import { PostInfo } from '@type/post';

import { changeVotedOption, votePost } from '@api/sua/post';

import WrittenVoteOptionList from '@components/optionList/WrittenVoteOptionList';

import * as S from './style';

interface PostProps {
  postInfo: PostInfo;
  isPreview: boolean;
}

export default function Post({ postInfo, isPreview }: PostProps) {
  const { postId, category, title, writer, startTime, endTime, content, voteInfo } = postInfo;

  const handleVoteClick = (newOptionId: number) => {
    if (voteInfo.selectedOptionId === newOptionId) return;

    if (voteInfo.selectedOptionId === 0) {
      votePost(postId, newOptionId);
      return;
    }

    changeVotedOption(postId, voteInfo.selectedOptionId, newOptionId);
  };

  return (
    <S.Container>
      <S.Category>{category.map(category => category.name).join(' | ')}</S.Category>
      <S.Title $isPreview={isPreview}>{title}</S.Title>
      <S.Wrapper>
        <S.Writer>{writer.nick}</S.Writer>
        <S.Wrapper>
          <S.Time>{startTime}</S.Time>
          <S.Time>{endTime}</S.Time>
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
