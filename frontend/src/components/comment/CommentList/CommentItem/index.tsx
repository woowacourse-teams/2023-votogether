import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { Comment } from '@type/comment';
import { ReportRequest } from '@type/report';

import { useDeleteComment } from '@hooks/query/comment/useDeleteComment';
import { useToast } from '@hooks/useToast';
import { useToggle } from '@hooks/useToggle';

import { reportContent } from '@api/report';

import CommentTextForm from '@components/comment/CommentList/CommentTextForm';
import DeleteModal from '@components/common/DeleteModal';
import Toast from '@components/common/Toast';
import ReportModal from '@components/ReportModal';

import ellipsis from '@assets/ellipsis-horizontal.svg';

import { COMMENT_ACTION, COMMENT_MENU, COMMENT_USER, COMMENT_USER_MENU } from '../constants';
import { type CommentAction, type CommentUser } from '../types';

import CommentMenu from './CommentMenu';
import * as S from './style';

interface CommentItemProps {
  comment: Comment;
  userType: CommentUser;
}

export default function CommentItem({ comment, userType }: CommentItemProps) {
  const { isOpen, toggleComponent, closeComponent } = useToggle();
  const { isToastOpen, openToast, toastMessage } = useToast();
  const { id, member, content, createdAt, isEdit } = comment;
  const [action, setAction] = useState<CommentAction | null>(null);

  const params = useParams() as { postId: string };
  const postId = Number(params.postId);

  const { mutate, isError, error } = useDeleteComment(postId, id);

  const handleMenuClick = (menu: CommentAction) => {
    closeComponent();
    setAction(menu);
  };

  const handleCommentReportClick = async (reason: string) => {
    const reportData: ReportRequest = { type: 'COMMENT', id, reason };

    await reportContent(reportData)
      .then(res => {
        openToast('댓글을 신고했습니다.');
      })
      .catch(e => {
        openToast(e instanceof Error ? e.message : '댓글 신고가 실패했습니다');
      });
  };

  const handleNicknameReportClick = async (reason: string) => {
    const reportData: ReportRequest = { type: 'NICKNAME', id: member.id, reason };

    await reportContent(reportData)
      .then(res => {
        openToast('작성자 닉네임을 신고했습니다.');
      })
      .catch(e => {
        openToast(e instanceof Error ? e.message : '작성자 닉네임 신고가 실패했습니다.');
      });
  };

  const handleCancelClick = () => {
    setAction(null);
  };

  const handleDeleteClick = () => {
    mutate();
  };

  useEffect(() => {
    isError && error instanceof Error && openToast(error.message);
  }, [isError, error]);

  const USER_TYPE = COMMENT_USER_MENU[userType];

  const isAllowedMenu = userType !== COMMENT_USER.GUEST && action !== COMMENT_ACTION.EDIT;

  return (
    <S.Container tabIndex={0}>
      <S.Header>
        <S.UserContainer>
          <S.Title aria-label={`댓글 작성자: ${member.nickname}`}>{member.nickname}</S.Title>
          <S.SubTitleContainer>
            <S.SubTitle>{createdAt}</S.SubTitle>
            {isEdit && <S.SubTitle>(수정됨)</S.SubTitle>}
          </S.SubTitleContainer>
        </S.UserContainer>
        {isAllowedMenu && (
          <S.MenuContainer aria-label="댓글 메뉴" onClick={toggleComponent}>
            <S.Image src={ellipsis}></S.Image>
            {isOpen && (
              <S.MenuWrapper>
                <CommentMenu handleMenuClick={handleMenuClick} menuList={COMMENT_MENU[USER_TYPE]} />
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
        <S.Description>{content}</S.Description>
      )}
      {action === COMMENT_ACTION.DELETE && (
        <DeleteModal
          target="COMMENT"
          handleCancelClick={handleCancelClick}
          handleDeleteClick={handleDeleteClick}
        />
      )}
      {action === COMMENT_ACTION.USER_REPORT && (
        <ReportModal
          reportType="NICKNAME"
          handleReportClick={handleNicknameReportClick}
          handleCancelClick={handleCancelClick}
        />
      )}
      {action === COMMENT_ACTION.COMMENT_REPORT && (
        <ReportModal
          reportType="COMMENT"
          handleReportClick={handleCommentReportClick}
          handleCancelClick={handleCancelClick}
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
