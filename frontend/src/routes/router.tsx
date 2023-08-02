import { createBrowserRouter } from 'react-router-dom';

import Home from '@pages/Home';
import MyInfo from '@pages/MyInfo';
import CreatePost from '@pages/post/CreatePost';
import EditPost from '@pages/post/EditPost';
import PostDetailPage from '@pages/post/PostDetail';
import VoteStatisticsPage from '@pages/VoteStatistics';

import { PATH } from '@constants/path';

const router = createBrowserRouter([
  {
    path: PATH.HOME,
    element: <Home />,
    children: [
      { path: 'search', element: <Home /> },
      { path: 'login', element: <Home /> },
    ],
  },
  {
    path: PATH.POST,
    children: [
      { path: 'write', element: <CreatePost /> },
      {
        path: 'write/:postId',
        element: <EditPost />,
      },
      {
        path: ':postId',
        element: <PostDetailPage />,
      },
      {
        path: 'result/:postId',
        element: <VoteStatisticsPage />,
      },
      { path: 'category/:categoryId', element: <Home /> },
    ],
  },
  {
    path: PATH.USER,
    children: [
      { path: 'myPage', element: <MyInfo /> },
      { path: 'posts', element: <Home /> },
      { path: 'votes', element: <Home /> },
    ],
  },
]);
export default router;
