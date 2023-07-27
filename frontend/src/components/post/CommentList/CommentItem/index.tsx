import React from 'react';

import { Comment } from '@type/comment';

import ellipsis from '@assets/ellipsis-horizontal.svg';

import * as S from './style';

interface CommentItemProps {
  comment: Comment;
}

export default function CommentItem({ comment }: CommentItemProps) {
  const { member, content, createdAt, isEdit } = comment;
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
        <S.Menu type="button" aria-label="댓글 메뉴">
          <S.Image src={ellipsis}></S.Image>
        </S.Menu>
      </S.Header>
      <S.Description>{content}</S.Description>
    </S.Container>
  );
}
