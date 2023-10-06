import { REQUEST_POST_KIND_URL } from '@constants/api';
import { REQUEST_SORTING_OPTION, REQUEST_STATUS_OPTION } from '@constants/post';

export type PostStatus = keyof typeof REQUEST_STATUS_OPTION;
export type PostSorting = keyof typeof REQUEST_SORTING_OPTION;
export type PostRequestKind = keyof typeof REQUEST_POST_KIND_URL;
