import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { PostAction, PostMenuItem } from '@type/menu';

import { useToggle } from '@hooks/useToggle';

import DeleteModal from '@components/common/DeleteModal';
import HeaderTextButton from '@components/common/HeaderTextButton';
import IconButton from '@components/common/IconButton';
import PostMenu from '@components/common/PostMenu';
import TagButton from '@components/common/TagButton';
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
  };
}

const menuList: PostMenuItem[] = [
  { color: 'black', content: '닉네임 신고', action: 'NICKNAME_REPORT' },
  { color: 'black', content: '게시글 신고', action: 'POST_REPORT' },
];

export default function InnerHeaderPart({
  isWriter,
  isClosed,
  handleEvent: { movePage, controlPost },
}: PostDetailPageChildProps) {
  const navigate = useNavigate();

  const { moveWritePostPage, moveVoteStatisticsPage } = movePage;
  const { setEarlyClosePost, deletePost, reportPost, reportNickname } = controlPost;
  const { isOpen, toggleComponent, closeComponent } = useToggle();
  const [action, setAction] = useState<PostAction | null>(null);

  const handleMenuClick = (action: PostAction) => {
    closeComponent();
    setAction(action);
  };

  const handleCancelClick = () => {
    setAction(null);
  };

  return (
    <>
      <IconButton
        category="back"
        onClick={() => {
          navigate(-1);
        }}
      />
      <S.HeaderWrapper>
        {!isWriter ? (
          <>
            <HeaderTextButton
              aria-label={isOpen ? '게시글 신고 메뉴 닫기' : '게시글 신고 메뉴 열기'}
              onClick={toggleComponent}
            >
              신고
            </HeaderTextButton>
            {isOpen && (
              <S.MenuWrapper>
                <PostMenu menuList={menuList} handleMenuClick={handleMenuClick} />
              </S.MenuWrapper>
            )}
          </>
        ) : !isClosed ? (
          <>
            <HeaderTextButton aria-label="게시글 수정" onClick={moveWritePostPage}>
              수정
            </HeaderTextButton>
            <HeaderTextButton aria-label="게시글 삭제" onClick={() => handleMenuClick('DELETE')}>
              삭제
            </HeaderTextButton>
            <S.TagButtonWrapper>
              <TagButton aria-label="게시글 조기마감" size="sm" onClick={setEarlyClosePost}>
                조기마감
              </TagButton>
            </S.TagButtonWrapper>
          </>
        ) : (
          <>
            <HeaderTextButton aria-label="게시글 삭제" onClick={() => handleMenuClick('DELETE')}>
              삭제
            </HeaderTextButton>
            <S.TagButtonWrapper>
              <TagButton aria-label="게시글 통계보기" size="sm" onClick={moveVoteStatisticsPage}>
                통계보기
              </TagButton>
            </S.TagButtonWrapper>
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
      </S.HeaderWrapper>
    </>
  );
}
