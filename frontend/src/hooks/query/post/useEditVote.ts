import { useContext } from 'react';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { ToastContext } from '@hooks/context/toast';

import { OptionData, changeVotedOption } from '@api/post';

import { QUERY_KEY } from '@constants/queryKey';

export const useEditVote = ({ isPreview, postId }: { isPreview: boolean; postId: number }) => {
  const queryClient = useQueryClient();
  const { addMessage } = useContext(ToastContext);

  const LOGGED_IN = true;

  const { mutate, isLoading } = useMutation({
    mutationFn: (optionData: OptionData) => changeVotedOption(postId, optionData),
    onSuccess: () => {
      if (isPreview) {
        queryClient.invalidateQueries({
          predicate: ({ queryKey }) => queryKey[0] === QUERY_KEY.POSTS,
        });
        return;
      }

      queryClient.invalidateQueries([QUERY_KEY.POST_DETAIL, postId, LOGGED_IN]);
    },
    onError: error => {
      const message = error instanceof Error ? error.message : '투표 변경을 실패했습니다.';
      addMessage(message);
    },
  });

  return { mutate, isLoading };
};
