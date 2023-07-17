import React from 'react';
import { useNavigate } from 'react-router-dom';

import AddButton from '@components/common/AddButton';
import Example from '@components/Example';

export default function PostList() {
  const navigate = useNavigate();
  const postId = 1;

  return (
    <div>
      PostList 글 목록 페이지
      <Example />
      <AddButton
        size="sm"
        onClick={() => {
          navigate('/posts/write');
        }}
      />
      <AddButton
        size="lg"
        onClick={() => {
          navigate(`/posts/write/${postId}`);
        }}
      />
    </div>
  );
}
