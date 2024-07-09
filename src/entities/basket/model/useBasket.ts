import { getBasketOfCookie } from './getBasketOfCookie';
import {
  useAppSelector,
  useGetUserDataQuery,
  selectors,
  useAddProductInBasketMutation,
  useAppDispatch,
  actions,
} from '@/shared';

export const useBasket = () => {
  const token: string | null = useAppSelector(selectors.authSelectors.selectToken);
  const [addProducts] = useAddProductInBasketMutation();
  const basketOfCookie = getBasketOfCookie();
  const dispatch = useAppDispatch()

  if (token) {
    const {data, isLoading} = useGetUserDataQuery(undefined);
    if (basketOfCookie && !isLoading) {
      const basket = data.basket
      const result = { ...basket, ...basketOfCookie };
      addProducts(result);
      document.cookie = 'basket=;max-age=0';
    }
  } else {
    return getBasketOfCookie();
  }
};
