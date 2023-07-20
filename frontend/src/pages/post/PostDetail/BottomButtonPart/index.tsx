import SquareButton from '@components/common/SquareButton';

import * as S from './style';

type MovePageEvent = 'moveWritePostPage' | 'moveVoteStatisticsPage' | 'movePostListPage';
type ControlPostEvent = 'setEarlyClosePost' | 'removePost' | 'reportPost';

interface PostDetailPageChildProps {
  isWriter: boolean;
  isClosed: boolean;
  handleEvent: {
    movePage: Record<MovePageEvent, () => void>;
    controlPost: Record<ControlPostEvent, () => void>;
  };
}

export default function BottomButtonPart({
  isWriter,
  isClosed,
  handleEvent: { movePage, controlPost },
}: PostDetailPageChildProps) {
  const { moveWritePostPage, moveVoteStatisticsPage } = movePage;
  const { setEarlyClosePost, removePost, reportPost } = controlPost;

  return (
    <S.BottomButtonContainer>
      {!isWriter ? (
        <SquareButton theme="fill" onClick={reportPost}>
          신 고
        </SquareButton>
      ) : !isClosed ? (
        <>
          <SquareButton theme="fill" onClick={setEarlyClosePost}>
            조기마감
          </SquareButton>
          <SquareButton theme="blank" onClick={moveWritePostPage}>
            수 정
          </SquareButton>
          <SquareButton theme="fill" onClick={removePost}>
            삭 제
          </SquareButton>
        </>
      ) : (
        <>
          <SquareButton theme="fill" onClick={moveVoteStatisticsPage}>
            통계보기
          </SquareButton>
          <SquareButton theme="fill" onClick={removePost}>
            삭 제
          </SquareButton>
        </>
      )}
    </S.BottomButtonContainer>
  );
}
