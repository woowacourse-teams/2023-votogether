import { IMAGE_BASE_URL } from '@constants/post';

export const convertImageUrlToServerUrl = (imageUrl: string) => {
  return `${IMAGE_BASE_URL}/${imageUrl}`;
};

export const convertServerUrlToImageUrl = (imageUrl: string) => {
  const changedUrl = imageUrl.split(`${IMAGE_BASE_URL}/`);
  return changedUrl.length === 1 ? changedUrl[0] : changedUrl[1];
};
