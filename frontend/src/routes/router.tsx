import { createBrowserRouter } from 'react-router-dom';

import PostDetail from '@pages/post/PostDetail';
import PostList from '@pages/post/PostList';
import WritePost from '@pages/post/WritePost';

const router = createBrowserRouter([
  {
    path: '/',
    children: [
      { path: '', element: <PostList /> },
      {
        path: 'posts/write',
        element: <WritePost />,
      },
      {
        path: 'posts/:postId',
        element: <PostDetail />,
      },
    ],
  },
]);
export default router;
