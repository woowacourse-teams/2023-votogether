import type { LoadingType } from '../types';

import { useContext, useState } from 'react';

import { PostAction } from '@type/menu';
import { ReportMessage } from '@type/report';

import { AuthContext } from '@hooks/context/auth';

import DeleteModal from '@components/common/DeleteModal';
import SquareButton from '@components/common/SquareButton';
import ReportModal from '@components/ReportModal';

import * as S from './style';

type MovePageEvent = 'moveWritePostPage' | 'moveVoteStatisticsPage' | 'movePostListPage';
interface PostDetailPageChildProps {
  isWriter: boolean;
  isClosed: boolean;
  handleEvent: {
    movePage: Record<MovePageEvent, () => void>;
    controlPost: {
      setEarlyClosePost: () => void;
      deletePost: () => void;
      reportPost: (reason: ReportMessage) => void;
      reportNickname: (reason: ReportMessage) => void;
    };
    openToast: (text: string) => void;
  };
  isEventLoading: Record<LoadingType, boolean>;
}

export default function BottomButtonPart({
  isWriter,
  isClosed,
  handleEvent: { movePage, controlPost, openToast },
  isEventLoading,
}: PostDetailPageChildProps) {
  const { loggedInfo } = useContext(AuthContext);
  const { moveWritePostPage, moveVoteStatisticsPage } = movePage;
  const { setEarlyClosePost, deletePost, reportPost, reportNickname } = controlPost;
  const { isDeletePostLoading, isReportPostLoading, isReportNicknameLoading } = isEventLoading;
  const [action, setAction] = useState<PostAction | null>(null);

  const handleActionButtonClick = (action: PostAction) => {
    if (!loggedInfo.isLoggedIn) {
      openToast('로그인 후에 기능을 이용해주세요.');
      return;
    }

    setAction(action);
  };

  const handleCancelClick = () => {
    setAction(null);
  };

  return (
    <S.BottomButtonContainer>
      {!isWriter ? (
        <>
          <SquareButton
            aria-label="게시글 신고"
            theme={isReportPostLoading ? 'gray' : 'fill'}
            onClick={() => handleActionButtonClick('POST_REPORT')}
          >
            게시물 신고
          </SquareButton>
          <SquareButton
            aria-label="작성자 닉네임 신고"
            theme={isReportNicknameLoading ? 'gray' : 'fill'}
            onClick={() => handleActionButtonClick('NICKNAME_REPORT')}
          >
            작성자 닉네임 신고
          </SquareButton>
        </>
      ) : !isClosed ? (
        <>
          <SquareButton aria-label="게시글 조기마감" theme="fill" onClick={setEarlyClosePost}>
            조기마감
          </SquareButton>
          <SquareButton aria-label="게시글 수정" theme="blank" onClick={moveWritePostPage}>
            수 정
          </SquareButton>

          <SquareButton
            aria-label="게시글 삭제"
            theme={isDeletePostLoading ? 'gray' : 'fill'}
            onClick={() => handleActionButtonClick('DELETE')}
          >
            삭 제
          </SquareButton>
        </>
      ) : (
        <>
          <SquareButton aria-label="게시글 통계보기" theme="fill" onClick={moveVoteStatisticsPage}>
            통계보기
          </SquareButton>
          <SquareButton
            aria-label="게시글 삭제"
            theme={isDeletePostLoading ? 'gray' : 'fill'}
            onClick={() => handleActionButtonClick('DELETE')}
            disabled={isDeletePostLoading}
          >
            삭 제
          </SquareButton>
        </>
      )}
      {action === 'DELETE' && (
        <DeleteModal
          target="POST"
          handleCancelClick={handleCancelClick}
          handleDeleteClick={deletePost}
          isDeleting={isDeletePostLoading}
        />
      )}
      {action === 'POST_REPORT' && (
        <ReportModal
          handleModalClose={handleCancelClick}
          reportType="POST"
          handleReportClick={reportPost}
          handleCancelClick={handleCancelClick}
          isReportLoading={isReportPostLoading}
        />
      )}
      {action === 'NICKNAME_REPORT' && (
        <ReportModal
          handleModalClose={handleCancelClick}
          reportType="NICKNAME"
          handleReportClick={reportNickname}
          handleCancelClick={handleCancelClick}
          isReportLoading={isReportNicknameLoading}
        />
      )}
    </S.BottomButtonContainer>
  );
}
