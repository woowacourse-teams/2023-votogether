import { Dispatch, PropsWithChildren, SetStateAction, createContext, useState } from 'react';

import { PostSorting, PostStatus } from '@pages/HomePage/types';

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
    status: STATUS.ALL,
  });

  return (
    <PostOptionContext.Provider value={{ postOption, setPostOption }}>
      {children}
    </PostOptionContext.Provider>
  );
}
