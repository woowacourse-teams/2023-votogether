import { useQuery } from '@tanstack/react-query';

import { Cart, getCartList } from '@api/example';

const convertCartList = (cartList: { id: number; text: string }[]) => {
  return cartList.map(cart => ({ id: cart.id, content: cart.text }));
};

export const useExample = () => {
  const { data, error, isLoading } = useQuery<Cart[]>(['carts'], getCartList, {
    onSuccess: data => {
      const updatedData = convertCartList(data);

      return updatedData;
    },
  });

  return { data, error, isLoading };
};
