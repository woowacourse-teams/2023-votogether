import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';

import Announcement from '@pages/Announcement';
import Login from '@pages/auth/Login';
import Redirection from '@pages/auth/Redirection';
import Error from '@pages/Error';
import Home from '@pages/Home';
import MyInfo from '@pages/MyInfo';
import NotFound from '@pages/NotFound';
import CreatePostPage from '@pages/post/CreatePostPage';
import EditPostPage from '@pages/post/EditPostPage';
import PostDetailPage from '@pages/post/PostDetail';
import Ranking from '@pages/Ranking';

import ScrollToTop from '@components/common/ScrollToTop';

import { PATH } from '@constants/path';

import PrivateRoute from './PrivateRoute';

const Login = lazy(() => import('@pages/auth/Login'));
const RegisterPersonalInfo = lazy(() => import('@pages/user/RegisterPersonalInfo'));
const VoteStatisticsPage = lazy(() => import('@pages/VoteStatisticsPage'));

const router = createBrowserRouter([
  {
    path: PATH.HOME,
    element: (
      <PrivateRoute isGuestAllowed={true}>
        <ScrollToTop />
        <Home />
      </PrivateRoute>
    ),
    errorElement: <Error />,
    children: [
      {
        path: 'search',
        element: (
          <PrivateRoute isGuestAllowed={true}>
            <ScrollToTop />
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
            <ScrollToTop />
            <CreatePostPage />
          </PrivateRoute>
        ),
      },
      {
        path: 'write/:postId',
        element: (
          <PrivateRoute>
            <ScrollToTop />
            <EditPostPage />
          </PrivateRoute>
        ),
      },
      {
        path: ':postId',
        element: (
          <PrivateRoute isGuestAllowed={true}>
            <ScrollToTop />
            <PostDetailPage />
          </PrivateRoute>
        ),
      },
      {
        path: 'result/:postId',
        element: (
          <PrivateRoute>
            <ScrollToTop />
            <VoteStatisticsPage />
          </PrivateRoute>
        ),
      },
      {
        path: 'category/:categoryId',
        element: (
          <PrivateRoute isGuestAllowed={true}>
            <ScrollToTop />
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
            <ScrollToTop />
            <MyInfo />
          </PrivateRoute>
        ),
      },
      {
        path: 'posts',
        element: (
          <PrivateRoute>
            <ScrollToTop />
            <Home />
          </PrivateRoute>
        ),
      },
      {
        path: 'votes',
        element: (
          <PrivateRoute>
            <ScrollToTop />
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
    path: PATH.RANKING,
    element: <Ranking />,
    errorElement: <Error />,
  },
  {
    path: PATH.ANNOUNCEMENT,
    element: <Announcement />,
    errorElement: <Error />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);
export default router;
