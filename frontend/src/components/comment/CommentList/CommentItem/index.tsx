import { useState } from 'react';

import { type Comment, type CommentAction, type CommentUser } from '@type/comment';

import { useToggle } from '@hooks/useToggle';

import CommentReportModal from '@components/report/CommentReportModal';
import UserReportModal from '@components/report/UserReportModal';

import { COMMENT_ACTION, COMMENT_MENU, COMMENT_USER, COMMENT_USER_MENU } from '@constants/comment';

import ellipsis from '@assets/ellipsis-horizontal.svg';

import CommentDeleteModal from '../../CommentDeleteModal';
import CommentTextForm from '../CommentTextForm';

import CommentMenu from './CommentMenu';
import * as S from './style';

interface CommentItemProps {
  comment: Comment;
  userType: CommentUser;
}

export default function CommentItem({ comment, userType }: CommentItemProps) {
  const { isOpen, toggleComponent } = useToggle();
  const { member, content, createdAt, isEdit } = comment;
  const [action, setAction] = useState<CommentAction | null>(null);

  const handleMenuClick = (menu: CommentAction) => {
    setAction(menu);
  };

  const handleCancelClick = () => {
    setAction(null);
  };

  const USER_TYPE = COMMENT_USER_MENU[userType];

  const isAllowedMenu = userType !== COMMENT_USER.GUEST && action !== COMMENT_ACTION.EDIT;

  return (
    <S.Container>
      <S.Header>
        <S.UserContainer>
          <S.Title>{member.nickname}</S.Title>
          <S.SubTitleContainer>
            <S.SubTitle>{createdAt}</S.SubTitle>
            {isEdit && <S.SubTitle>(수정됨)</S.SubTitle>}
          </S.SubTitleContainer>
        </S.UserContainer>
        {isAllowedMenu && (
          <S.MenuContainer type="button" aria-label="댓글 메뉴" onClick={toggleComponent}>
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
        <CommentTextForm initialComment={content} handleCancelClick={handleCancelClick} />
      ) : (
        <S.Description>{content}</S.Description>
      )}
      {action === COMMENT_ACTION.DELETE && (
        <CommentDeleteModal handleCancelClick={handleCancelClick} handleDeleteClick={() => {}} />
      )}
      {action === COMMENT_ACTION.USER_REPORT && (
        <UserReportModal handleCancelClick={handleCancelClick} />
      )}
      {action === COMMENT_ACTION.COMMENT_REPORT && (
        <CommentReportModal handleCancelClick={handleCancelClick} />
      )}
    </S.Container>
  );
}
