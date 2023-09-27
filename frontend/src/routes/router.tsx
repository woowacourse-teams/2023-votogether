import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';

import AnnouncementPage from '@pages/AnnouncementPage';
import RedirectionPage from '@pages/auth/RedirectionPage';
import ErrorPage from '@pages/ErrorPage';
import HomePage from '@pages/HomePage';
import MyInfoPage from '@pages/MyInfoPage';
import NotFoundPage from '@pages/NotFoundPage';
import CreatePostPage from '@pages/post/CreatePostPage';
import EditPostPage from '@pages/post/EditPostPage';
import PostDetailPage from '@pages/post/PostDetailPage';
import RankingPage from '@pages/RankingPage';

import ScrollToTop from '@components/common/ScrollToTop';
import RouteChangeTracker from '@components/RouteChangeTracker';

import { PATH } from '@constants/path';

import PrivateRoute from './PrivateRoute';

const Login = lazy(() => import('@pages/auth/LoginPage'));
const RegisterPersonalInfo = lazy(() => import('@pages/user/RegisterPersonalInfoPage'));
const VoteStatisticsPage = lazy(() => import('@pages/VoteStatisticsPage'));

const router = createBrowserRouter([
  {
    path: PATH.HOME,
    element: (
      <PrivateRoute isGuestAllowed={true}>
        <ScrollToTop />
        <HomePage />
        <RouteChangeTracker />
      </PrivateRoute>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        path: 'search',
        element: (
          <PrivateRoute isGuestAllowed={true}>
            <ScrollToTop />
            <HomePage />
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
    errorElement: <ErrorPage />,
  },
  {
    path: 'auth/kakao/callback',
    element: <RedirectionPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: PATH.POST,
    errorElement: <ErrorPage />,
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
            <HomePage />
            <RouteChangeTracker />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: PATH.USER,
    errorElement: <ErrorPage />,
    children: [
      {
        path: 'myPage',
        element: (
          <PrivateRoute>
            <ScrollToTop />
            <MyInfoPage />
            <RouteChangeTracker />
          </PrivateRoute>
        ),
      },
      {
        path: 'posts',
        element: (
          <PrivateRoute>
            <ScrollToTop />
            <HomePage />
            <RouteChangeTracker />
          </PrivateRoute>
        ),
      },
      {
        path: 'votes',
        element: (
          <PrivateRoute>
            <ScrollToTop />
            <HomePage />
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
        <RankingPage />
        <RouteChangeTracker />
      </>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: PATH.ANNOUNCEMENT,
    element: (
      <>
        <AnnouncementPage />
        <RouteChangeTracker />
      </>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
]);
export default router;
