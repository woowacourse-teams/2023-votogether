import { createBrowserRouter } from 'react-router-dom';

import Login from '@pages/auth/Login';
import Redirection from '@pages/auth/Redirection';
import CreatePost from '@pages/post/CreatePost';
import EditPost from '@pages/post/EditPost';
import PostDetail from '@pages/post/PostDetail';
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
        element: <PostDetail />,
      },
      {
        path: 'posts/write/:postId',
        element: <EditPost />,
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'auth/kakao/callback',
        element: <Redirection />,
      },
    ],
  },
]);
export default router;
