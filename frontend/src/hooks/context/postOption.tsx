import { Dispatch, PropsWithChildren, SetStateAction, createContext, useState } from 'react';

import type { PostSorting, PostStatus } from '@components/post/PostListPage/types';

import { SORTING, STATUS } from '@constants/post';

export const PostOptionContext = createContext<PostOptionContextProps>({
  postOption: { sorting: SORTING.LATEST, status: STATUS.PROGRESS },
  setPostOption: () => {},
});

interface PostOption {
  status: PostStatus;
  sorting: PostSorting;
}
interface PostOptionContextProps {
  postOption: PostOption;
  setPostOption: Dispatch<SetStateAction<PostOption>>;
}

export default function PostOptionProvider({ children }: PropsWithChildren) {
  const [postOption, setPostOption] = useState<PostOption>({
    sorting: SORTING.LATEST,
    status: STATUS.PROGRESS,
  });

  return (
    <PostOptionContext.Provider value={{ postOption, setPostOption }}>
      {children}
    </PostOptionContext.Provider>
  );
}
