import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useCreatePost } from '@hooks/query/post/useCreatePost';
import { useToast } from '@hooks/useToast';

import Layout from '@components/common/Layout';
import Toast from '@components/common/Toast';
import PostForm from '@components/PostForm';

export default function CreatePost() {
  const navigate = useNavigate();

  const { mutate, isSuccess, isError, error } = useCreatePost();
  const { isToastOpen, openToast, toastMessage } = useToast();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, []);

  useEffect(() => {
    if (isSuccess) {
      navigate('/');
    }
  }, [isSuccess, navigate]);

  useEffect(() => {
    isError && error instanceof Error && openToast(error.message);
  }, [isError, error]);

  return (
    <Layout isSidebarVisible={false}>
      <PostForm mutate={mutate} isError={isError} error={error} />
      {isToastOpen && (
        <Toast size="md" position="bottom">
          {toastMessage}
        </Toast>
      )}
    </Layout>
  );
}
