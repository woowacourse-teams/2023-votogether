import { getFetch } from '@utils/fetch';

const BASE_URL = process.env.VOTOGETHER_MOCKING_URL;

export const getUserRanking = async (isLoggedIn: boolean) => {
  if (!isLoggedIn) return null;

  return await getFetch(`${BASE_URL}/members/me/ranking`);
};

export const getPassionUserRanking = async () => {
  return await getFetch(`${BASE_URL}/members/ranking/passion/guest`);
};

export const getPopularPostRanking = async () => {
  return await getFetch(`${BASE_URL}/posts/ranking/popular/guest`);
};
