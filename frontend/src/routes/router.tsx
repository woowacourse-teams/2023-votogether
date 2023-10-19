import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';

import RedirectionPage from '@pages/auth/RedirectionPage';
import ErrorPage from '@pages/ErrorPage';
import HomePage from '@pages/HomePage';
import MyInfoPage from '@pages/MyInfoPage';
import NotFoundPage from '@pages/NotFoundPage';
import NoticeDetailPage from '@pages/notice/NoticeDetailPage';
import NoticeListPage from '@pages/notice/NoticeListPage';
import CreatePostPage from '@pages/post/CreatePostPage';
import EditPostPage from '@pages/post/EditPostPage';
import PostDetailPage from '@pages/post/PostDetailPage';
import RankingPage from '@pages/RankingPage';
import ReportAlarmPage from '@pages/ReportAlarmPage';

import ScrollToTop from '@components/common/ScrollToTop';
import RouteChangeTracker from '@components/RouteChangeTracker';

import { PATH } from '@constants/path';

import PrivateRoute from './PrivateRoute';

const Login = lazy(() => import('@pages/auth/LoginPage'));
const RegisterPersonalInfo = lazy(() => import('@pages/user/RegisterPersonalInfoPage'));
const VoteStatisticsPage = lazy(() => import('@pages/VoteStatisticsPage'));
const NoticeAdminPage = lazy(() => import('@pages/admin/notices/NoticeAdminPage'));
const NoticeEditPage = lazy(() => import('@pages/admin/notices/NoticeEditPage'));
const NoticeWritePage = lazy(() => import('@pages/admin/notices/NoticeWritePage'));
const PendingReportPage = lazy(() => import('@pages/admin/PendingReportPage'));

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
      <PrivateRoute isGuestAllowed={true}>
        <RankingPage />
        <RouteChangeTracker />
      </PrivateRoute>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: PATH.ADMIN,
    errorElement: <ErrorPage />,
    children: [
      {
        path: `reports/pending`,
        element: (
          <PrivateRoute isOnlyAdminAllowed>
            <PendingReportPage />
          </PrivateRoute>
        ),
      },
      {
        path: `notices/write`,
        element: (
          <PrivateRoute isOnlyAdminAllowed>
            <NoticeWritePage />
          </PrivateRoute>
        ),
      },
      {
        path: `notices/:noticeId`,
        element: (
          <PrivateRoute isOnlyAdminAllowed>
            <NoticeEditPage />
          </PrivateRoute>
        ),
      },
      {
        path: 'notices',
        element: (
          <PrivateRoute isOnlyAdminAllowed>
            <NoticeAdminPage />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: `${PATH.REPORT_ALARM}/:reportId`,
    element: (
      <PrivateRoute>
        <ReportAlarmPage />
      </PrivateRoute>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: PATH.NOTICES,
    errorElement: <ErrorPage />,
    children: [
      {
        path: ':noticeId',
        element: (
          <PrivateRoute isGuestAllowed={true}>
            <NoticeDetailPage />
            <RouteChangeTracker />
          </PrivateRoute>
        ),
      },
      {
        path: '',
        element: (
          <PrivateRoute isGuestAllowed={true}>
            <NoticeListPage />
            <RouteChangeTracker />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
]);

export default router;
