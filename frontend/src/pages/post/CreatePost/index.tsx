import { useCreatePost } from '@hooks/query/post/useCreatePost';

import PostForm from '@components/PostForm';

export default function CreatePost() {
  const { mutate, isError, error } = useCreatePost();

  return (
    <>
      <PostForm mutate={mutate} isError={isError} error={error} />
    </>
  );
}
