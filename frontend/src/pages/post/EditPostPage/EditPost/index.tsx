import { useContext, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { PostOptionContext } from '@hooks/context/postOption';
import { useEditPost } from '@hooks/query/post/useEditPost';
import { usePostDetail } from '@hooks/query/post/usePostDetail';

import PostForm from '@components/PostForm';

import { PATH } from '@constants/path';
import { SORTING, STATUS } from '@constants/post';

export default function EditPost() {
  const navigate = useNavigate();

  const { postId } = useParams();

  const { data } = usePostDetail(true, Number(postId));
  const { mutate, isSuccess, isLoading } = useEditPost(Number(postId));
  const { setPostOption } = useContext(PostOptionContext);

  useEffect(() => {
    if (isSuccess) {
      navigate(`${PATH.POST}/${postId}`);
      setPostOption({ sorting: SORTING.LATEST, status: STATUS.PROGRESS });
    }
  }, [isSuccess, navigate, postId]);

  return <PostForm data={data} mutate={mutate} isSubmitting={isLoading} />;
}
