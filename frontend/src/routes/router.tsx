import { createBrowserRouter } from 'react-router-dom';

import Home from '@pages/Home';
import CreatePost from '@pages/post/CreatePost';
import EditPost from '@pages/post/EditPost';
import PostDetailPage from '@pages/post/PostDetail';
import VoteStatisticsPage from '@pages/VoteStatistics';

const router = createBrowserRouter([
  {
    path: '/',
    children: [
      { path: '', element: <Home /> },
      {
        path: 'posts/',
        children: [
          {
            path: 'write',
            element: <CreatePost />,
          }, //글작성 페이지
          {
            path: 'write/:postId',
            element: <EditPost />,
          }, //글수정 페이지
          {
            path: ':postId',
            element: <PostDetailPage />,
          }, //글 상세 페이지
          {
            path: 'result/:postId',
            element: <VoteStatisticsPage />,
          }, //글 통계 페이지
        ],
      },
      // { path: 'login/', element: <Home /> },
      // { path: 'landing/', element: <Home /> },
      // { path: 'admin/', element: <Home /> },
      { path: 'search?keyword=:category', element: <Home /> },
      // {
      //   path: 'users/',
      //   children: [
      //     {
      //       path: 'posts',
      //       element: <CreatePost />,
      //     }, //작성한 글 목록 페이지
      //     {
      //       path: 'votes',
      //       element: <EditPost />,
      //     }, //투표한 글 목록 페이지
      //     {
      //       path: 'myPage',
      //       element: <PostDetailPage />,
      //     }, //유저 정보 페이지
      //   ],
      // },
    ],
  },
]);
export default router;
