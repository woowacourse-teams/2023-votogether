import { PostInfo } from '@type/post';

import { useCreateVote } from '@hooks/query/post/useCreateVote';
import { useEditVote } from '@hooks/query/post/useEditVote';

import WrittenVoteOptionList from '@components/optionList/WrittenVoteOptionList';

import { PATH } from '@constants/path';
import { POST } from '@constants/vote';

import * as S from './style';

interface PostProps {
  postInfo: PostInfo;
  isPreview: boolean;
}

export default function Post({ postInfo, isPreview }: PostProps) {
  const { postId, category, title, writer, createTime, deadline, content, voteInfo } = postInfo;
  const { mutate: createVote } = useCreateVote({ isPreview, postId });
  const { mutate: editVote } = useEditVote({ isPreview, postId });
  const handleVoteClick = (newOptionId: number) => {
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

  return (
    <S.Container>
      <S.DetailLink to={`${PATH.POST}/${postId}`} $isPreview={isPreview}>
        <S.Category>{category?.map(category => category.name).join(' | ')}</S.Category>
        <S.Title $isPreview={isPreview}>{title}</S.Title>
        <S.Wrapper>
          <span>{writer.nickname}</span>
          <S.Wrapper>
            <span>{createTime}</span>
            <span>{deadline}</span>
          </S.Wrapper>
        </S.Wrapper>
        <S.Content $isPreview={isPreview}>{content}</S.Content>
      </S.DetailLink>
      <WrittenVoteOptionList
        selectedOptionId={voteInfo.selectedOptionId}
        handleVoteClick={handleVoteClick}
        isPreview={isPreview}
        voteOptionList={voteInfo.options}
      />
    </S.Container>
  );
}
