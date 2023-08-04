import { useMutation, useQueryClient } from '@tanstack/react-query';

import { votePost } from '@api/post';

import { QUERY_KEY } from '@constants/queryKey';

export const useCreateVote = ({ isPreview, postId }: { isPreview: boolean; postId: number }) => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: (optionId: number) => votePost(postId, optionId),
    onSuccess: () => {
      if (isPreview) {
        queryClient.invalidateQueries({
          predicate: ({ queryKey }) => queryKey[0] === QUERY_KEY.POSTS,
        });
        return;
      }

      queryClient.invalidateQueries([QUERY_KEY.POST_DETAIL, postId]);
    },
    onError: error => {
      window.console.log('투표 선택지 생성에 실패했습니다.', error);
    },
  });

  return { mutate };
};
