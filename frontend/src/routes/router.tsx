import { createBrowserRouter } from 'react-router-dom';

import { PATH } from '@constants/path';

import PostDetail from '@pages/Post/PostDetail';
import PostList from '@pages/Post/PostList';
import WritePost from '@pages/Post/WritePost';

const router = createBrowserRouter([
  {
    path: PATH.HOME,
    element: <PostList />,
  },
  {
    path: PATH.POST_WRITE,
    element: <WritePost />,
  },
  {
    path: PATH.POST_DETAIL,
    element: <PostDetail />,
  },
]);

export default router;
