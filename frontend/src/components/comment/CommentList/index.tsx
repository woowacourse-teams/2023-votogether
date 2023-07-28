import { type Comment } from '@type/comment';

interface CommentListProps {
  commentList: Comment[];
  memberId: number;
  isGuest: boolean;
}

export default function CommentList({ commentList, memberId, isGuest }: CommentListProps) {
  return <div>CommentList</div>;
}
