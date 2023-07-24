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
        path: 'posts/write',
        element: <CreatePost />,
      },
      {
        path: 'posts/:postId',
        element: <PostDetailPage />,
      },
      {
        path: 'posts/write/:postId',
        element: <EditPost />,
      },
      {
        path: 'posts/result/:postId',
        element: <VoteStatisticsPage />,
      },
    ],
  },
]);
export default router;
