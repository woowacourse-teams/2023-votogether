import { useNavigate } from 'react-router-dom';

import { ReportRequest } from '@type/report';

import { usePostDetail } from '@hooks/query/post/usePostDetail';

import { removePost, setEarlyClosePost } from '@api/post';
import { reportContent } from '@api/report';

import NarrowTemplateHeader from '@components/common/NarrowTemplateHeader';
import Post from '@components/common/Post';

import { checkClosedPost } from '@utils/time';

import BottomButtonPart from '../BottomButtonPart';
import InnerHeaderPart from '../InnerHeaderPart';

import * as S from './style';

interface PostDetailFetcherProps {
  postId: number;
  memberId: number;
}

export default function PostDetailFetcher({ postId, memberId }: PostDetailFetcherProps) {
  const navigate = useNavigate();
  const { data: postData } = usePostDetail(postId);

  if (!postData) return <></>;

  const isWriter = postData.writer.id === memberId;
  const isClosed = checkClosedPost(postData.deadline);

  const movePage = {
    moveWritePostPage: () => {
      if (postData.voteInfo.allPeopleCount) alert('투표한 사용자가 있어 글 수정이 불가합니다.');

      navigate(`/posts/write/${postId}`);
    },
    moveVoteStatisticsPage: () => {
      navigate(`/posts/result/${postId}`);
    },
    movePostListPage: () => {
      navigate('/');
    },
  };

  const controlPost = {
    setEarlyClosePost: async () => {
      await setEarlyClosePost(postId)
        .then(res => {
          alert('게시물을 즉시마감했습니다.');
        })
        .catch(error => alert(error.message));
    },
    removePost: async () => {
      if (postData.voteInfo.allPeopleCount >= 20)
        return alert('20인 이상 투표한 게시물은 삭제할 수 없습니다.');

      await removePost(postId)
        .then(res => alert('게시물을 삭제했습니다.'))
        .catch(error => alert(error.message));
    },
    reportPost: async (reason: string) => {
      const reportData: ReportRequest = { type: 'POST', id: postId, reason };

      await reportContent(reportData)
        .then(res => alert('게시물을 신고했습니다.'))
        .catch(error => alert('게시물 신고가 실패했습니다.'));
    },
    reportNickname: async (reason: string) => {
      const reportData: ReportRequest = { type: 'NICKNAME', id: postData.writer.id, reason };

      await reportContent(reportData)
        .then(res => alert('작성자 닉네임을 신고했습니다.'))
        .catch(error => alert('작성자 닉네임 신고가 실패했습니다.'));
    },
  };

  return (
    <>
      <S.HeaderContainer>
        <NarrowTemplateHeader>
          <InnerHeaderPart
            isClosed={isClosed}
            isWriter={isWriter}
            handleEvent={{ movePage, controlPost }}
          />
        </NarrowTemplateHeader>
      </S.HeaderContainer>
      <S.Container>
        <Post postInfo={postData} isPreview={false} />
        <BottomButtonPart
          isClosed={isClosed}
          isWriter={isWriter}
          handleEvent={{ movePage, controlPost }}
        />
      </S.Container>
    </>
  );
}
