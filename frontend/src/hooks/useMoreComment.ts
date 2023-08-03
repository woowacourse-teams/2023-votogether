import { useState } from 'react';

import { Comment } from '@type/comment';

export const useMoreComment = (commentList: Comment[]) => {
  const [page, setPage] = useState(1);
  const pageSize = page * 10;

  const handleMoreComment = () => {
    setPage(prevPage => prevPage + 1);
  };

  const hasMoreComment = commentList.length > pageSize;

  return { slicedCommentList: commentList.slice(0, pageSize), handleMoreComment, hasMoreComment };
};
