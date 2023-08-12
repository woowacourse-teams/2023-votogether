import { createBrowserRouter } from 'react-router-dom';

import Login from '@pages/auth/Login';
import Redirection from '@pages/auth/Redirection';
import Home from '@pages/Home';
import MyInfo from '@pages/MyInfo';
import NotFound from '@pages/NotFound';
import CreatePostPage from '@pages/post/CreatePostPage';
import EditPostPage from '@pages/post/EditPostPage';
import PostDetailPage from '@pages/post/PostDetail';
import VoteStatisticsPage from '@pages/VoteStatistics';

import { PATH } from '@constants/path';

import PrivateRoute from './PrivateRoute';

const router = createBrowserRouter([
  {
    path: PATH.HOME,
    element: <Home />,
    children: [{ path: 'search', element: <Home /> }],
  },
  {
    path: PATH.LOGIN,
    element: <Login />,
  },
  {
    path: 'auth/kakao/callback',
    element: <Redirection />,
  },
  {
    path: PATH.POST,
    children: [
      {
        path: 'write',
        element: (
          <PrivateRoute>
            <CreatePostPage />
          </PrivateRoute>
        ),
      },
      {
        path: 'write/:postId',
        element: (
          <PrivateRoute>
            <EditPostPage />
          </PrivateRoute>
        ),
      },
      {
        path: ':postId',
        element: <PostDetailPage />,
      },
      {
        path: 'result/:postId',
        element: (
          <PrivateRoute>
            <VoteStatisticsPage />
          </PrivateRoute>
        ),
      },
      { path: 'category/:categoryId', element: <Home /> },
    ],
  },
  {
    path: PATH.USER,
    children: [
      {
        path: 'myPage',
        element: (
          <PrivateRoute>
            <MyInfo />
          </PrivateRoute>
        ),
      },
      { path: 'posts', element: <Home /> },
      { path: 'votes', element: <Home /> },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);
export default router;
