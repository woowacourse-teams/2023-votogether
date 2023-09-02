import { getFetch } from '@utils/fetch';

const BASE_URL = process.env.VOTOGETHER_MOCKING_URL;

export const getUserRanking = async (isLoggedIn: boolean) => {
  //임의의 url
  if (!isLoggedIn) return null;

  return await getFetch(`${BASE_URL}/myInfo/ranking`);
};

export const getPassionUserRanking = async () => {
  //임의의 url
  return await getFetch(`${BASE_URL}/ranking/passion`);
};

export const getPopularPostRanking = async () => {
  //임의의 url
  return await getFetch(`${BASE_URL}/ranking/popular`);
};
