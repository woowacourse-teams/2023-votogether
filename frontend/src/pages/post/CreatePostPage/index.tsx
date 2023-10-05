import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { PostOptionContext } from '@hooks/context/postOption';
import { useCreatePost } from '@hooks/query/post/useCreatePost';

import Layout from '@components/common/Layout';
import PostForm from '@components/PostForm';

import { SORTING, STATUS } from '@constants/post';

export default function CreatePostPage() {
  const navigate = useNavigate();

  const { mutate, isSuccess, isLoading } = useCreatePost();
  const { setPostOption } = useContext(PostOptionContext);

  useEffect(() => {
    if (isSuccess) {
      navigate('/');
      setPostOption({ sorting: SORTING.LATEST, status: STATUS.PROGRESS });
    }
  }, [isSuccess, navigate]);

  return (
    <Layout isSidebarVisible={false} isMobileDefaultHeaderVisible={false}>
      <PostForm mutate={mutate} isSubmitting={isLoading} />
    </Layout>
  );
}
