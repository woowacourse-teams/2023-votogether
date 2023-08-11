import { useContext, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { AuthContext } from '@hooks/context/auth';
import { useEditPost } from '@hooks/query/post/useEditPost';
import { usePostDetail } from '@hooks/query/post/usePostDetail';

import Layout from '@components/common/Layout';
import PostForm from '@components/PostForm';

import { PATH } from '@constants/path';

export default function EditPost() {
  const navigate = useNavigate();

  const { postId } = useParams();
  const { loggedInfo } = useContext(AuthContext);

  const { data } = usePostDetail(loggedInfo.isLoggedIn, Number(postId));
  const { mutate, isSuccess, isError, error } = useEditPost(Number(postId));

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, []);

  useEffect(() => {
    if (isSuccess) {
      navigate(`${PATH.POST}/${postId}`);
    }
  }, [isSuccess, navigate, postId]);

  useEffect(() => {
    if (isError && error instanceof Error) {
      alert(error.message);
    }
  }, [isError, error]);

  return (
    <Layout isSidebarVisible={false}>
      <PostForm data={data} mutate={mutate} />
    </Layout>
  );
}
