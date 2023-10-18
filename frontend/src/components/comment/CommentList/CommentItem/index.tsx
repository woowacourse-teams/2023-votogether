import { useContext, useState } from 'react';
import { useParams } from 'react-router-dom';

import { Comment } from '@type/comment';
import { CommentAction, CommentUser } from '@type/menu';
import { ReportMessage, ReportRequest } from '@type/report';

import { useToggle } from '@hooks';

import { ToastContext } from '@hooks/context/toast';
import { useDeleteComment } from '@hooks/query/comment/useDeleteComment';

import { reportContent } from '@api/report';

import CommentTextForm from '@components/comment/CommentList/CommentTextForm';
import DeleteModal from '@components/common/DeleteModal';
import Menu from '@components/common/Menu';
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

  const { addMessage } = useContext(ToastContext);
  const { isOpen, toggleComponent, closeComponent } = useToggle();
  const { id, member, content, createdAt, isEdit } = comment;
  const [action, setAction] = useState<CommentAction | null>(null);

  const params = useParams() as { postId: string };
  const postId = Number(params.postId);

  const { mutate, isLoading: isCommentDeleting } = useDeleteComment(postId, id);

  const handleMenuClick = (menu: CommentAction) => {
    closeComponent();
    setAction(menu);
  };

  const handleCommentReportClick = async (reason: ReportMessage) => {
    const reportData: ReportRequest = { type: 'COMMENT', id, reason };
    setIsReportCommentLoading(true);

    await reportContent(reportData)
      .then(res => {
        addMessage('댓글을 신고했습니다.');
      })
      .catch(e => {
        if (e instanceof Error) {
          const errorResponse = JSON.parse(e.message);
          addMessage(errorResponse.message);
          return;
        }
        addMessage('댓글 신고를 실패했습니다.');
      })
      .finally(() => {
        setIsReportCommentLoading(false);
      });
  };

  const handleNicknameReportClick = async (reason: ReportMessage) => {
    const reportData: ReportRequest = { type: 'NICKNAME', id: member.id, reason };
    setIsReportNicknameLoading(true);

    await reportContent(reportData)
      .then(res => {
        addMessage('작성자 닉네임을 신고했습니다.');
      })
      .catch(e => {
        if (e instanceof Error) {
          const errorResponse = JSON.parse(e.message);
          addMessage(errorResponse.message);
          return;
        }
        addMessage('작성자 닉네임 신고를 실패했습니다.');
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
    </S.Container>
  );
}
