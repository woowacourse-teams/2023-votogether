import { useMutation, useQueryClient } from '@tanstack/react-query';

import { CommentRequest } from '@type/comment';

import { editComment } from '@api/comment';

import { QUERY_KEY } from '@constants/queryKey';

export const useEditComment = (
  postId: number,
  commentId: number,
  updatedComment: CommentRequest
) => {
  const queryClient = useQueryClient();
  const queryKey = [QUERY_KEY.POSTS, postId, QUERY_KEY.COMMENTS];

  const { mutate, isLoading, isError, error } = useMutation(
    () => editComment(postId, commentId, updatedComment),
    {
      onMutate: async () => {
        // 댓글 데이터에 대한 모든 퀴리요청을 취소하여 이전 서버 데이터가 낙관적 업데이트를 덮어쓰지 않도록 함 -> refetch 취소시킴
        await queryClient.cancelQueries(queryKey);

        const oldComment = queryClient.getQueryData(queryKey); // 기존 댓글 데이터의 snapshot

        window.console.log('기존 댓글 데이터: ', oldComment);

        queryClient.setQueryData(queryKey, updatedComment); // 낙관적 업데이트 실시

        return { oldComment, updatedComment }; // context를 return, context 예시에는 이전 스냅샷, 새로운 값(또는 롤백하는 함수)이 있음
      },
      onError: (error, _, context) => {
        // 캐시를 저장된 값으로 롤백
        queryClient.setQueryData(queryKey, context?.oldComment);
        window.console.log('댓글 수정에 실패했습니다. 다시 시도해주세요.', error);
      },
      onSuccess: () => {
        window.console.log('댓글이 성공적으로 수정되었습니다!');
      },
      onSettled: () => {
        // 쿼리 함수의 성공하든 실패하든 모든 실행 -> 기존 댓글 데이터 무효화
        queryClient.invalidateQueries(queryKey);
      },
    }
  );

  return { mutate, isLoading, isError, error };
};