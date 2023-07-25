import { useNavigate } from 'react-router-dom';

import { useFetch } from '@hooks/useFetch';

import { getPost } from '@api/post';
import { getPostStatistics } from '@api/voteResult';

import IconButton from '@components/common/IconButton';
import Layout from '@components/common/Layout';
import LoadingSpinner from '@components/common/LoadingSpinner';
import NarrowTemplateHeader from '@components/common/NarrowTemplateHeader';
import VoteStatistics from '@components/VoteStatistics';

import OptionStatistics from './OptionStatistics';
import * as S from './style';

export default function VoteStatisticsPage() {
  const postId = 1;

  const navigate = useNavigate();

  const {
    data: postDetail,
    errorMessage: postError,
    isLoading: isPostLoading,
  } = useFetch(() => getPost(postId));
  const {
    data: voteResult,
    errorMessage: voteResultError,
    isLoading: isVoteResultLoading,
  } = useFetch(() => getPostStatistics(postId));

  const movePostDetailPage = () => {
    navigate(`/posts/${postId}`);
  };

  return (
    <Layout isSidebarVisible={true}>
      <S.HeaderWrapper>
        <NarrowTemplateHeader>
          <IconButton category="back" onClick={movePostDetailPage} />
        </NarrowTemplateHeader>
      </S.HeaderWrapper>
      <S.Container>
        <S.PageHeader>투표 통계</S.PageHeader>
        {postError && <div>{postError}</div>}
        {isPostLoading && (
          <S.LoadingWrapper>
            <LoadingSpinner size="md" />
          </S.LoadingWrapper>
        )}
        {postDetail && (
          <S.OptionContainer>
            {voteResultError && <div>{voteResultError}</div>}
            {isVoteResultLoading && (
              <S.LoadingWrapper>
                <LoadingSpinner size="sm" />
              </S.LoadingWrapper>
            )}
            {voteResult && <VoteStatistics voteResult={voteResult} size="md" />}

            {postDetail.voteInfo.options.map(option => {
              const { postId, voteInfo } = postDetail;
              return (
                <OptionStatistics
                  key={option.id}
                  postId={postId}
                  isSelectedOption={voteInfo.selectedOptionId === option.id}
                  voteOption={option}
                  size="sm"
                />
              );
            })}
          </S.OptionContainer>
        )}
      </S.Container>
    </Layout>
  );
}
