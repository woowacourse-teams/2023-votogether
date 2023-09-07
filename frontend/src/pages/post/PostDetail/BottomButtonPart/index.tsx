import { useContext, useState } from 'react';

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
      reportPost: (reason: string) => void;
      reportNickname: (reason: string) => void;
    };
    openToast: (text: string) => void;
  };
}

export default function BottomButtonPart({
  isWriter,
  isClosed,
  handleEvent: { movePage, controlPost, openToast },
}: PostDetailPageChildProps) {
  const { loggedInfo } = useContext(AuthContext);
  const { moveWritePostPage, moveVoteStatisticsPage } = movePage;
  const { setEarlyClosePost, deletePost, reportPost, reportNickname } = controlPost;

  const [action, setAction] = useState<string | null>(null);

  const handleActionButtonClick = (action: string) => {
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
          <SquareButton theme="fill" onClick={() => handleActionButtonClick('POST_REPORT')}>
            게시물 신고
          </SquareButton>
          <SquareButton theme="fill" onClick={() => handleActionButtonClick('NICKNAME_REPORT')}>
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
            theme="fill"
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
            theme="fill"
            onClick={() => handleActionButtonClick('DELETE')}
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
        />
      )}
      {action === 'POST_REPORT' && (
        <ReportModal
          reportType="POST"
          handleReportClick={reportPost}
          handleCancelClick={handleCancelClick}
        />
      )}
      {action === 'NICKNAME_REPORT' && (
        <ReportModal
          reportType="NICKNAME"
          handleReportClick={reportNickname}
          handleCancelClick={handleCancelClick}
        />
      )}
    </S.BottomButtonContainer>
  );
}
