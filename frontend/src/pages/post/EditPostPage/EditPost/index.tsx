import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { useEditPost } from '@hooks/query/post/useEditPost';
import { usePostDetail } from '@hooks/query/post/usePostDetail';

import PostForm from '@components/PostForm';

import { PATH } from '@constants/path';

export default function EditPost() {
  const navigate = useNavigate();

  const { postId } = useParams();

  //해당 페이지는 게스트는 접근할 수 없으므로 필수적으로 true
  const { data } = usePostDetail(true, Number(postId));
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

  return <PostForm data={data} mutate={mutate} />;
}
