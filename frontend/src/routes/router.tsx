import { createBrowserRouter } from 'react-router-dom';

import PostDetailPage from '@pages/post/PostDetail';
import PostList from '@pages/post/PostList';

const router = createBrowserRouter([
  {
    path: '/',
    children: [
      { path: '', element: <PostList /> },
      {
        path: 'posts/write',
        element: <CreatePost />,
      },
      {
        path: 'posts/:postId',
        element: <PostDetailPage />,
      },
    ],
  },
]);
export default router;
