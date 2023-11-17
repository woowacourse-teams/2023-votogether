import { Dispatch, PropsWithChildren, SetStateAction, createContext, useState } from 'react';

import { PostSorting, PostStatus } from '@pages/HomePage/types';

import { SORTING, STATUS } from '@constants/post';

export const PostOptionContext = createContext<PostOptionContextProps>({
  postOption: { sorting: SORTING.LATEST, status: STATUS.PROGRESS, type: '전체' },
  setPostOption: () => {},
});

interface PostOption {
  status: PostStatus;
  sorting: PostSorting;
  type: string;
}
interface PostOptionContextProps {
  postOption: PostOption;
  setPostOption: Dispatch<SetStateAction<PostOption>>;
}

export default function PostOptionProvider({ children }: PropsWithChildren) {
  const [postOption, setPostOption] = useState<PostOption>({
    type: '전체',
    sorting: SORTING.LATEST,
    status: STATUS.ALL,
  });

  return (
    <PostOptionContext.Provider value={{ postOption, setPostOption }}>
      {children}
    </PostOptionContext.Provider>
  );
}
