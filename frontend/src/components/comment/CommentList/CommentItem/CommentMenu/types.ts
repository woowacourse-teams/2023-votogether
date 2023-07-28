import { CommentAction } from '../types';

export interface CommentMenuItem {
  content: string;
  color: 'black' | 'red';
  action: CommentAction;
}
