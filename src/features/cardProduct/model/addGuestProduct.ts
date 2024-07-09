import { getCookie } from '@/shared';

export const addGuestProduct = (id: number, side?: string) => {
  let newBasket;
  const basket = getCookie('basket');
  const num = side === 'minus' ? -1 : 1

  if (basket) {
    const currentBasket = JSON.parse(basket);
    newBasket = {
      ...currentBasket,
      [id]: currentBasket[id] ? currentBasket[id] + num : 1,
    };
  } else {
    newBasket = { [id]: 1 };
  }
  const normalizeData = JSON.stringify(newBasket);
  document.cookie = `basket=${encodeURIComponent(normalizeData)}`;
};