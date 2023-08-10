import { createBrowserRouter } from 'react-router-dom';

import Login from '@pages/auth/Login';
import Redirection from '@pages/auth/Redirection';
import Home from '@pages/Home';
import MyInfo from '@pages/MyInfo';
import NotFound from '@pages/NotFound';
import CreatePost from '@pages/post/CreatePost';
import EditPost from '@pages/post/EditPost';
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
            <CreatePost />
          </PrivateRoute>
        ),
      },
      {
        path: 'write/:postId',
        element: (
          <PrivateRoute>
            <EditPost />
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
      { path: 'posts/category/:categoryId', element: <Home /> },
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
