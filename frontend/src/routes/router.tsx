import { createBrowserRouter } from 'react-router-dom';

import CreatePost from '@pages/post/CreatePost';
import EditPost from '@pages/post/EditPost';
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
      {
        path: 'posts/write/:postId',
        element: <EditPost />,
      },
    ],
  },
]);
export default router;
