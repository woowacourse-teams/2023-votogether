import { useMutation, useQueryClient } from '@tanstack/react-query';

import { OptionData, changeVotedOption } from '@api/post';

import { QUERY_KEY } from '@constants/queryKey';

export const useEditVote = ({ isPreview, postId }: { isPreview: boolean; postId: number }) => {
  const queryClient = useQueryClient();

  const { mutate, isError, error } = useMutation({
    mutationFn: (optionData: OptionData) => changeVotedOption(postId, optionData),
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

  return { mutate, isError, error };
};
