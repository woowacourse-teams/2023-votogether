import { useCreatePost } from '@hooks/query/post/useCreatePost';

import PostForm from '@components/PostForm';

export default function CreatePost() {
  const { mutate } = useCreatePost();

  return (
    <>
      <PostForm mutate={mutate}></PostForm>
    </>
  );
}
