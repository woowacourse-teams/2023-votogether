import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { PostOptionContext } from '@hooks/context/postOption';
import { useCreatePost } from '@hooks/query/post/useCreatePost';
import { useToast } from '@hooks/useToast';

import Layout from '@components/common/Layout';
import Toast from '@components/common/Toast';
import PostForm from '@components/PostForm';

import { SORTING, STATUS } from '@constants/post';

export default function CreatePostPage() {
  const navigate = useNavigate();

  const { mutate, isSuccess, isError, error } = useCreatePost();
  const { isToastOpen, openToast, toastMessage } = useToast();
  const { setPostOption } = useContext(PostOptionContext);

  useEffect(() => {
    if (isSuccess) {
      navigate('/');
      setPostOption({ sorting: SORTING.LATEST, status: STATUS.PROGRESS });
    }
  }, [isSuccess, navigate]);

  useEffect(() => {
    if (isError && error instanceof Error) {
      const errorResponse = JSON.parse(error.message);
      openToast(errorResponse.message);
      return;
    }
  }, [isError, error]);

  return (
    <Layout isSidebarVisible={false}>
      <PostForm mutate={mutate} />
      {isToastOpen && (
        <Toast size="md" position="bottom">
          {toastMessage}
        </Toast>
      )}
    </Layout>
  );
}
