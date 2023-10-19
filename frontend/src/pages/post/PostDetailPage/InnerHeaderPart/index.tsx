import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { PostAction, MenuItem } from '@type/menu';
import { ReportMessage } from '@type/report';

import { AuthContext, useToggle } from '@hooks';

import DeleteModal from '@components/common/DeleteModal';
import HeaderTextButton from '@components/common/HeaderTextButton';
import IconButton from '@components/common/IconButton';
import Menu from '@components/common/Menu';
import TagButton from '@components/common/TagButton';
import ReportModal from '@components/ReportModal';

import { PATH } from '@constants/path';

import { LoadingType } from '../types';

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

const menuList: MenuItem<PostAction>[] = [
  { color: 'black', content: '닉네임 신고', action: 'NICKNAME_REPORT' },
  { color: 'black', content: '게시글 신고', action: 'POST_REPORT' },
];

export default function InnerHeaderPart({
  isWriter,
  isClosed,
  handleEvent: { movePage, controlPost, openToast },
  isEventLoading,
}: PostDetailPageChildProps) {
  const navigate = useNavigate();
  const { loggedInfo } = useContext(AuthContext);
  const { moveWritePostPage, moveVoteStatisticsPage } = movePage;
  const { setEarlyClosePost, deletePost, reportPost, reportNickname } = controlPost;
  const { isDeletePostLoading, isReportNicknameLoading, isReportPostLoading } = isEventLoading;
  const { isOpen: isMenuOpen, toggleComponent, closeComponent } = useToggle();
  const [action, setAction] = useState<PostAction | null>(null);

  const handleMenuClick = (action: PostAction) => {
    closeComponent();

    if (!loggedInfo.isLoggedIn) {
      openToast('로그인 후에 기능을 이용해주세요.');
      return;
    }

    setAction(action);
  };

  const handleCancelClick = () => {
    setAction(null);
  };

  const handleBackButtonClick = () => {
    if (window.history.length > 1) {
      navigate(-1);
      return;
    }
    navigate(PATH.HOME);
  };

  return (
    <>
      <IconButton category="back" onClick={handleBackButtonClick} />
      <S.HeaderWrapper>
        {!isWriter ? (
          <>
            <HeaderTextButton
              aria-label={isMenuOpen ? '게시글 신고 메뉴 닫기' : '게시글 신고 메뉴 열기'}
              onClick={toggleComponent}
            >
              신고
            </HeaderTextButton>
            {isMenuOpen && (
              <S.MenuWrapper>
                <Menu menuList={menuList} handleMenuClick={handleMenuClick} />
              </S.MenuWrapper>
            )}
          </>
        ) : !isClosed ? (
          <>
            <HeaderTextButton aria-label="게시글 수정" onClick={moveWritePostPage}>
              수정
            </HeaderTextButton>
            <HeaderTextButton
              aria-label="게시글 삭제"
              onClick={() => handleMenuClick('DELETE')}
              disabled={isDeletePostLoading}
            >
              {isDeletePostLoading ? '삭제 중...' : '삭제'}
            </HeaderTextButton>
            <S.TagButtonWrapper>
              <TagButton aria-label="게시글 조기마감" size="sm" onClick={setEarlyClosePost}>
                조기마감
              </TagButton>
            </S.TagButtonWrapper>
          </>
        ) : (
          <>
            <HeaderTextButton
              aria-label="게시글 삭제"
              onClick={() => handleMenuClick('DELETE')}
              disabled={isDeletePostLoading}
              isLoading={isDeletePostLoading}
            >
              {isDeletePostLoading ? '삭제 중...' : '삭제'}
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
      </S.HeaderWrapper>
    </>
  );
}
