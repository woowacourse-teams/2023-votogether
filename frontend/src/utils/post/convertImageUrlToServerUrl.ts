import { IMAGE_BASE_URL } from '@constants/post';

export const convertImageUrlToServerUrl = (imageUrl: string) => {
  return `${IMAGE_BASE_URL}/${imageUrl}`;
};
