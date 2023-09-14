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
import RegisterPersonalInfo from '@pages/user/RegisterPersonalInfo';
import VoteStatisticsPage from '@pages/VoteStatisticsPage';

import ScrollToTop from '@components/common/ScrollToTop';
import RouteChangeTracker from '@components/RouteChangeTracker';

import { PATH } from '@constants/path';

import PrivateRoute from './PrivateRoute';

const router = createBrowserRouter([
  {
    path: PATH.HOME,
    element: (
      <PrivateRoute isGuestAllowed={true}>
        <ScrollToTop />
        <Home />
        <RouteChangeTracker />
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
            <RouteChangeTracker />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: PATH.LOGIN,
    element: (
      <>
        <Login />
        <RouteChangeTracker />
      </>
    ),
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
            <RouteChangeTracker />
          </PrivateRoute>
        ),
      },
      {
        path: 'write/:postId',
        element: (
          <PrivateRoute>
            <ScrollToTop />
            <EditPostPage />
            <RouteChangeTracker />
          </PrivateRoute>
        ),
      },
      {
        path: ':postId',
        element: (
          <PrivateRoute isGuestAllowed={true}>
            <ScrollToTop />
            <PostDetailPage />
            <RouteChangeTracker />
          </PrivateRoute>
        ),
      },
      {
        path: 'result/:postId',
        element: (
          <PrivateRoute>
            <ScrollToTop />
            <VoteStatisticsPage />
            <RouteChangeTracker />
          </PrivateRoute>
        ),
      },
      {
        path: 'category/:categoryId',
        element: (
          <PrivateRoute isGuestAllowed={true}>
            <ScrollToTop />
            <Home />
            <RouteChangeTracker />
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
            <RouteChangeTracker />
          </PrivateRoute>
        ),
      },
      {
        path: 'posts',
        element: (
          <PrivateRoute>
            <ScrollToTop />
            <Home />
            <RouteChangeTracker />
          </PrivateRoute>
        ),
      },
      {
        path: 'votes',
        element: (
          <PrivateRoute>
            <ScrollToTop />
            <Home />
            <RouteChangeTracker />
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
    element: (
      <>
        <Ranking />
        <RouteChangeTracker />
      </>
    ),
    errorElement: <Error />,
  },
  {
    path: PATH.ANNOUNCEMENT,
    element: (
      <>
        <Announcement />
        <RouteChangeTracker />
      </>
    ),
    errorElement: <Error />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);
export default router;
