import { useContext, useEffect } from 'react';

import { AuthContext } from '@hooks/context/auth';
import { useCreatePost } from '@hooks/query/post/useCreatePost';

import Layout from '@components/common/Layout';
import PostForm from '@components/PostForm';

export default function CreatePost() {
  const { loggedInfo } = useContext(AuthContext);
  const { mutate, isError, error } = useCreatePost(loggedInfo.accessToken);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, []);

  return (
    <Layout isSidebarVisible={false}>
      <PostForm mutate={mutate} isError={isError} error={error} />
    </Layout>
  );
}
