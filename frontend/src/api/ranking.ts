import { PassionUserRanking, PopularPostRanking } from '@type/ranking';

import { getFetch } from '@utils/fetch';

const BASE_URL = process.env.VOTOGETHER_BASE_URL;

export const getUserRanking = async (isLoggedIn: boolean) => {
  if (!isLoggedIn) return null;

  return await getFetch<PassionUserRanking>(`${BASE_URL}/members/me/ranking/passion`);
};

export const getPassionUserRanking = async () => {
  return await getFetch<PassionUserRanking[]>(`${BASE_URL}/members/ranking/passion/guest`);
};

export const getPopularPostRanking = async () => {
  return await getFetch<PopularPostRanking[]>(`${BASE_URL}/posts/ranking/popular/guest`);
};
