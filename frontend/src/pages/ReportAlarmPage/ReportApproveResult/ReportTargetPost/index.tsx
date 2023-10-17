import { usePostDetail } from '@hooks';

import Post from '@components/post/Post';

export default function ReportTargetPost({ postId }: { postId: number }) {
  const { data } = usePostDetail(true, postId);

  return data && <Post postInfo={data} isPreview={false} />;
}
