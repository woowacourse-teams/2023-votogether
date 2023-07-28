export interface Comment {
  id: number;
  member: {
    id: number;
    nickname: string;
  };
  content: string;
  createdAt: string;
  isEdit: boolean;
}

export interface CommentResponse {
  id: number;
  member: {
    id: number;
    nickname: string;
  };
  content: string;
  createdAt: string;
  updatedAt: string;
}

export interface CommentRequest {
  content: string;
}
