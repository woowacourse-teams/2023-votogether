import { createBrowserRouter } from 'react-router-dom';

import PostDetailPage from '@pages/post/PostDetail';
import PostList from '@pages/post/PostList';
import WritePost from '@pages/post/WritePost';

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
        element: <PostDetailPage />,
      },
    ],
  },
]);
export default router;
