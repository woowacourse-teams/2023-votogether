import React from 'react';

import { Comment } from '@type/comment';

interface CommentListProps {
  commentList: Comment[];
}

export default function CommentList({ commentList }: CommentListProps) {
  return <div>CommentList</div>;
}
