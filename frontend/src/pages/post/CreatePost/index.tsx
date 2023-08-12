import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useCreatePost } from '@hooks/query/post/useCreatePost';

import Layout from '@components/common/Layout';
import PostForm from '@components/PostForm';

export default function CreatePost() {
  const navigate = useNavigate();

  const { mutate, isSuccess, isError, error } = useCreatePost();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, []);

  useEffect(() => {
    if (isSuccess) {
      navigate('/');
    }
  }, [isSuccess, navigate]);

  useEffect(() => {
    if (isError && error instanceof Error) {
      alert(error.message);
    }
  }, [isError, error]);

  return (
    <Layout isSidebarVisible={false}>
      <PostForm mutate={mutate} />
    </Layout>
  );
}
