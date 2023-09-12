// 장바구니을 가져오는 예시 코드

/**
 * 게시물 get: api/cart
 * 게시물 Cart: api/cart
 */
import { deleteFetch, getFetch, patchFetch, postFetch, putFetch } from '@utils/fetch';

export interface Cart {
  id: number;
  text: string;
}

export const getCartList = async () => {
  return await getFetch<Cart[]>('api/cart');
};

export const createCart = async () => {
  return await postFetch<Cart>('api/cart', { id: 12, text: '생성' });
};

export const editCart = async () => {
  return await putFetch<{ id: number }>('api/cart', { id: 12 });
};

// remove or delete
export const deleteCart = async () => {
  return await deleteFetch('api/cart/1');
};

/**
 *
 * patch와 put은 edit을 접두어로 붙힌다. 어색하다면 바꾼다.
 */
export const editOption = async () => {
  return await patchFetch('api/cart/1/213123');
};
