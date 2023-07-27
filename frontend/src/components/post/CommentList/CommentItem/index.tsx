import React, { useState } from 'react';

import { Comment } from '@type/comment';

import { useToggle } from '@hooks/useToggle';

import ellipsis from '@assets/ellipsis-horizontal.svg';

import CommentDeleteModal from './CommentDeleteModal';
import CommentMenu from './CommentMenu';
import { COMMENT_MENU } from './CommentMenu/constants';
import CommentReportModal from './CommentReportModal';
import * as S from './style';
import { CommentAction } from './types';

interface CommentItemProps {
  comment: Comment;
}

export default function CommentItem({ comment }: CommentItemProps) {
  const { isOpen, toggleComponent } = useToggle();
  const { member, content, createdAt, isEdit } = comment;
  const [action, setAction] = useState<CommentAction | null>(null);

  const handleMenuClick = (menu: CommentAction) => {
    setAction(menu);
  };

  const handleCancelClick = () => {
    setAction(null);
  };

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
        <S.MenuContainer type="button" aria-label="댓글 메뉴" onClick={toggleComponent}>
          <S.Image src={ellipsis}></S.Image>
          {isOpen && (
            <S.MenuWrapper>
              <CommentMenu handleMenuClick={handleMenuClick} menuList={COMMENT_MENU.NORMAL} />
            </S.MenuWrapper>
          )}
        </S.MenuContainer>
      </S.Header>
      <S.Description>{content}</S.Description>
      {action === 'delete' && (
        <CommentDeleteModal handleCancelClick={handleCancelClick} handleDeleteClick={() => {}} />
      )}
      {action === 'report' && <CommentReportModal handleCancelClick={handleCancelClick} />}
    </S.Container>
  );
}
