import { createBrowserRouter } from 'react-router-dom';

import PostDetail from '@pages/Post/PostDetail';
import PostList from '@pages/Post/PostList';
import WritePost from '@pages/Post/WritePost';

const router = createBrowserRouter([
  {
    path: '/',
    element: <PostList />,
    children: [
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
