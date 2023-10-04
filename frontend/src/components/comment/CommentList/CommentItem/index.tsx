import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { Comment } from '@type/comment';
import { CommentUser, PostAction } from '@type/menu';
import { ReportRequest } from '@type/report';

import { useToggle } from '@hooks';
import { useToast } from '@hooks';

import { useDeleteComment } from '@hooks/query/comment/useDeleteComment';

import { reportContent } from '@api/report';

import CommentTextForm from '@components/comment/CommentList/CommentTextForm';
import DeleteModal from '@components/common/DeleteModal';
import Menu from '@components/common/Menu';
import Toast from '@components/common/Toast';
import ReportModal from '@components/ReportModal';

import { COMMENT_ACTION, COMMENT_MENU, COMMENT_USER, COMMENT_USER_MENU } from '@constants/post';

import { convertTextToElement } from '@utils/post/convertTextToElement';

import ellipsis from '@assets/ellipsis-horizontal.svg';

import * as S from './style';
interface CommentItemProps {
  comment: Comment;
  userType: CommentUser;
}

export default function CommentItem({ comment, userType }: CommentItemProps) {
  const [isReportCommentLoading, setIsReportCommentLoading] = useState(false);
  const [isReportNicknameLoading, setIsReportNicknameLoading] = useState(false);

  const { isOpen, toggleComponent, closeComponent } = useToggle();
  const { isToastOpen, openToast, toastMessage } = useToast();
  const { id, member, content, createdAt, isEdit } = comment;
  const [action, setAction] = useState<PostAction | null>(null);

  const params = useParams() as { postId: string };
  const postId = Number(params.postId);

  const { mutate, isError, error, isLoading: isCommentDeleting } = useDeleteComment(postId, id);

  const handleMenuClick = (menu: PostAction) => {
    closeComponent();
    setAction(menu);
  };

  const handleCommentReportClick = async (reason: string) => {
    const reportData: ReportRequest = { type: 'COMMENT', id, reason };
    setIsReportCommentLoading(true);

    await reportContent(reportData)
      .then(res => {
        openToast('댓글을 신고했습니다.');
      })
      .catch(e => {
        if (e instanceof Error) {
          const errorResposne = JSON.parse(e.message);
          openToast(errorResposne.message);
          return;
        }
        openToast('댓글 신고가 실패했습니다.');
      })
      .finally(() => {
        setIsReportCommentLoading(false);
      });
  };

  const handleNicknameReportClick = async (reason: string) => {
    const reportData: ReportRequest = { type: 'NICKNAME', id: member.id, reason };
    setIsReportNicknameLoading(true);

    await reportContent(reportData)
      .then(res => {
        openToast('작성자 닉네임을 신고했습니다.');
      })
      .catch(e => {
        if (e instanceof Error) {
          const errorResposne = JSON.parse(e.message);
          openToast(errorResposne.message);
          return;
        }
        openToast('작성자 닉네임 신고가 실패했습니다.');
      })
      .finally(() => {
        setIsReportNicknameLoading(false);
      });
  };

  const handleCancelClick = () => {
    setAction(null);
  };

  const handleDeleteClick = () => {
    mutate();
  };

  useEffect(() => {
    if (isError && error instanceof Error) {
      const errorResponse = JSON.parse(error.message);
      openToast(errorResponse.message);
      return;
    }
  }, [isError, error]);

  const USER_TYPE = COMMENT_USER_MENU[userType];

  const isAllowedMenu = userType !== COMMENT_USER.GUEST && action !== COMMENT_ACTION.EDIT;

  return (
    <S.Container tabIndex={0}>
      <S.Header>
        <S.UserContainer>
          <S.Nickname aria-label={`댓글 작성자: ${member.nickname}`}>{member.nickname}</S.Nickname>
          <S.SubTitleContainer>
            <S.SubTitle>{createdAt}</S.SubTitle>
            {isEdit && <S.SubTitle>(수정됨)</S.SubTitle>}
          </S.SubTitleContainer>
        </S.UserContainer>
        {isAllowedMenu && (
          <S.MenuContainer
            as={isOpen ? 'div' : 'button'}
            role="button"
            tabIndex={0}
            aria-label={isOpen ? '댓글 메뉴 닫기' : '댓글 메뉴 열기'}
            onClick={toggleComponent}
          >
            <S.Image
              tabIndex={0}
              role="button"
              alt={isOpen ? '댓글 메뉴 닫기' : '댓글 메뉴 열기'}
              src={ellipsis}
            ></S.Image>
            {isOpen && (
              <S.MenuWrapper>
                <Menu handleMenuClick={handleMenuClick} menuList={COMMENT_MENU[USER_TYPE]} />
              </S.MenuWrapper>
            )}
          </S.MenuContainer>
        )}
      </S.Header>
      {action === COMMENT_ACTION.EDIT ? (
        <S.TextFormWrapper>
          <CommentTextForm
            commentId={id}
            initialComment={comment}
            handleCancelClick={handleCancelClick}
          />
        </S.TextFormWrapper>
      ) : (
        <S.Description>{convertTextToElement(content)}</S.Description>
      )}
      {action === COMMENT_ACTION.DELETE && (
        <DeleteModal
          target="COMMENT"
          handleCancelClick={handleCancelClick}
          handleDeleteClick={handleDeleteClick}
          isDeleting={isCommentDeleting}
        />
      )}
      {action === COMMENT_ACTION.USER_REPORT && (
        <ReportModal
          reportType="NICKNAME"
          handleReportClick={handleNicknameReportClick}
          handleCancelClick={handleCancelClick}
          isReportLoading={isReportNicknameLoading}
        />
      )}
      {action === COMMENT_ACTION.COMMENT_REPORT && (
        <ReportModal
          reportType="COMMENT"
          handleReportClick={handleCommentReportClick}
          handleCancelClick={handleCancelClick}
          isReportLoading={isReportCommentLoading}
        />
      )}
      {isToastOpen && (
        <Toast size="md" position="bottom">
          {toastMessage}
        </Toast>
      )}
    </S.Container>
  );
}
