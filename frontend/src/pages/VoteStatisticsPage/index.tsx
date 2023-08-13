import { Navigate, useNavigate, useParams } from 'react-router-dom';

import { useFetch } from '@hooks/useFetch';

import { getPost } from '@api/post';
import { getPostStatistics } from '@api/voteResult';

import IconButton from '@components/common/IconButton';
import Layout from '@components/common/Layout';
import NarrowTemplateHeader from '@components/common/NarrowTemplateHeader';
import Skeleton from '@components/common/Skeleton';
import VoteStatistics from '@components/VoteStatistics';

import { PATH } from '@constants/path';

import { checkWriter } from '@utils/post/checkWriter';

import OptionStatistics from './OptionStatistics';
import * as S from './style';

export default function VoteStatisticsPage() {
  const params = useParams() as { postId: string };
  const postId = Number(params.postId);

  const navigate = useNavigate();

  const {
    data: postDetail,
    errorMessage: postError,
    isLoading: isPostLoading,
  } = useFetch(() => getPost(postId));

  const {
    data: voteResultResponse,
    errorMessage: voteResultError,
    isLoading: isVoteResultLoading,
  } = useFetch(() => getPostStatistics(postId));

  const movePostDetailPage = () => {
    navigate(`${PATH.POST}/${postId}`);
  };

  if (postDetail && !checkWriter(postDetail.writer.id)) return <Navigate to={PATH.HOME} />;

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
            <Skeleton isLarge={true} />
          </S.LoadingWrapper>
        )}
        {postDetail && (
          <S.OptionContainer>
            {voteResultError && <div>{voteResultError}</div>}
            {isVoteResultLoading && (
              <S.LoadingWrapper>
                <Skeleton isLarge={true} />
              </S.LoadingWrapper>
            )}
            {voteResultResponse && (
              <VoteStatistics voteResultResponse={voteResultResponse} size="md" />
            )}
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
