import { createBrowserRouter } from 'react-router-dom';

import Login from '@pages/auth/Login';
import Redirection from '@pages/auth/Redirection';
import Error from '@pages/Error';
import Home from '@pages/Home';
import MyInfo from '@pages/MyInfo';
import NotFound from '@pages/NotFound';
import CreatePostPage from '@pages/post/CreatePostPage';
import EditPostPage from '@pages/post/EditPostPage';
import PostDetailPage from '@pages/post/PostDetail';
import RegisterPersonalInfo from '@pages/user/RegisterPersonalInfo';
import VoteStatisticsPage from '@pages/VoteStatisticsPage';

import { PATH } from '@constants/path';

import PrivateRoute from './PrivateRoute';

const router = createBrowserRouter([
  {
    path: PATH.HOME,
    element: (
      <PrivateRoute isGuestAllowed={true}>
        <Home />
      </PrivateRoute>
    ),
    errorElement: <Error />,
    children: [
      {
        path: 'search',
        element: (
          <PrivateRoute isGuestAllowed={true}>
            <Home />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: PATH.LOGIN,
    element: <Login />,
    errorElement: <Error />,
  },
  {
    path: 'auth/kakao/callback',
    element: <Redirection />,
    errorElement: <Error />,
  },
  {
    path: PATH.POST,
    errorElement: <Error />,
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
        element: (
          <PrivateRoute isGuestAllowed={true}>
            <PostDetailPage />
          </PrivateRoute>
        ),
      },
      {
        path: 'result/:postId',
        element: (
          <PrivateRoute>
            <VoteStatisticsPage />
          </PrivateRoute>
        ),
      },
      {
        path: 'category/:categoryId',
        element: (
          <PrivateRoute isGuestAllowed={true}>
            <Home />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: PATH.USER,
    errorElement: <Error />,
    children: [
      {
        path: 'myPage',
        element: (
          <PrivateRoute>
            <MyInfo />
          </PrivateRoute>
        ),
      },
      {
        path: 'posts',
        element: (
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        ),
      },
      {
        path: 'votes',
        element: (
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        ),
      },
      {
        path: 'register',
        element: <RegisterPersonalInfo />,
      },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);
export default router;
