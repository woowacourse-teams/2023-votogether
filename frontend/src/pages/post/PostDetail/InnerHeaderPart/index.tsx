import HeaderTextButton from '@components/common/HeaderTextButton';
import IconButton from '@components/common/IconButton';
import TagButton from '@components/common/TagButton';

import * as S from './style';

type MovePageEvent = 'moveWritePostPage' | 'moveVoteStatisticsPage' | 'movePostListPage';
type ControlPostEvent = 'setEarlyClosePost' | 'deletePost' | 'reportPost';

interface PostDetailPageChildProps {
  isWriter: boolean;
  isClosed: boolean;
  handleEvent: {
    movePage: Record<MovePageEvent, () => void>;
    controlPost: Record<ControlPostEvent, () => void>;
  };
}

export default function InnerHeaderPart({
  isWriter,
  isClosed,
  handleEvent: { movePage, controlPost },
}: PostDetailPageChildProps) {
  const { moveWritePostPage, moveVoteStatisticsPage, movePostListPage } = movePage;
  const { setEarlyClosePost, deletePost, reportPost } = controlPost;

  return (
    <>
      <IconButton category="back" onClick={movePostListPage} />
      <S.HeaderWrapper>
        {!isWriter ? (
          <HeaderTextButton onClick={reportPost}>신고</HeaderTextButton>
        ) : !isClosed ? (
          <>
            <HeaderTextButton onClick={moveWritePostPage}>수정</HeaderTextButton>
            <HeaderTextButton onClick={deletePost}>삭제</HeaderTextButton>
            <S.TagButtonWrapper>
              <TagButton size="sm" onClick={setEarlyClosePost}>
                조기마감
              </TagButton>
            </S.TagButtonWrapper>
          </>
        ) : (
          <>
            <HeaderTextButton onClick={deletePost}>삭제</HeaderTextButton>
            <S.TagButtonWrapper>
              <TagButton size="sm" onClick={moveVoteStatisticsPage}>
                통계보기
              </TagButton>
            </S.TagButtonWrapper>
          </>
        )}
      </S.HeaderWrapper>
    </>
  );
}
