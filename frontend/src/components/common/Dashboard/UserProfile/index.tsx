import React from 'react';
import { Link } from 'react-router-dom';

import { styled } from 'styled-components';

export default function UserProfile() {
  return (
    <Container>
      <Badge>[만근자]</Badge>
      <NickName>우스스</NickName>
      <UserInfoContainer>
        <TextCardContainer>
          <TextCardTitle></TextCardTitle>
          <TextCardContent></TextCardContent>
        </TextCardContainer>
      </UserInfoContainer>
    </Container>
  );
}

const Container = styled.div``;

const Badge = styled.span``;

const NickName = styled.span``;

const UserInfoContainer = styled.div``;

const TextCardContainer = styled(Link)``;

const TextCardTitle = styled.span``;

const TextCardContent = styled.span``;
