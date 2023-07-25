import { useEffect } from 'react';

import { useCreatePost } from '@hooks/query/post/useCreatePost';

import PostForm from '@components/PostForm';

export default function CreatePost() {
  const { mutate, isError, error } = useCreatePost();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, []);

  return (
    <>
      <PostForm mutate={mutate} isError={isError} error={error} />
    </>
  );
}
