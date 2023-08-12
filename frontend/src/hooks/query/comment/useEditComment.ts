import { useMutation, useQueryClient } from '@tanstack/react-query';

import { Comment } from '@type/comment';

import { editComment } from '@api/comment';

import { QUERY_KEY } from '@constants/queryKey';

export const useEditComment = (postId: number, commentId: number) => {
  const queryClient = useQueryClient();
  const { mutate, isSuccess, isLoading, isError, error } = useMutation(
    (updatedComment: Comment) => editComment(postId, commentId, updatedComment),
    {
      onSuccess: () => {
        queryClient.invalidateQueries([QUERY_KEY.POSTS, postId, QUERY_KEY.COMMENTS]);
      },
      onError: error => {
        window.console.log('댓글 수정에 실패했습니다. 다시 시도해주세요.', error);
      },
    }
  );

  return { mutate, isSuccess, isLoading, isError, error };
};
