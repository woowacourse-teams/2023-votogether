import { PostInfo } from '@type/post';

import WrittenVoteOptionList from '@components/optionList/WrittenVoteOptionList';

import * as S from './style';

interface PostProps {
  postInfo: PostInfo;
  isPreview: boolean;
}

export default function Post({ postInfo, isPreview }: PostProps) {
  return (
    <S.Container>
      <S.Category>{postInfo.category.map(category => category.name).join(' | ')}</S.Category>
      <S.Title $isPreview={isPreview}>{postInfo.title}</S.Title>
      <S.Wrapper>
        <S.Writer>{postInfo.writer.nick}</S.Writer>
        <S.Wrapper>
          <S.Time>{postInfo.startTime}</S.Time>
          <S.Time>{postInfo.endTime}</S.Time>
        </S.Wrapper>
      </S.Wrapper>
      <S.Content $isPreview={isPreview}>{postInfo.content}</S.Content>
      <WrittenVoteOptionList
        selectedOptionId={postInfo.voteInfo.selectedOptionId}
        handleVoteClick={() => {}}
        isPreview={isPreview}
        voteOptionList={postInfo.voteInfo.options}
      />
    </S.Container>
  );
}
