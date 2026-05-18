import { useCallback, useMemo, useState } from "react";

import type { CartItem } from "./types";

export type CartStore = {
  items: CartItem[];

  totalItems: number;
  totalPrice: number;

  add: (product: CartItem) => void;

  remove: (productId: string) => void;

  increase: (productId: string) => void;

  decrease: (productId: string) => void;
};

export function useCart(): CartStore {
  const [items, setItems] = useState<CartItem[]>([]);

  const add = useCallback((product: CartItem) => {
    setItems((prev) => {
      const exist = prev.find((item) => item.productId === product.productId);

      if (exist) {
        return prev.map((item) =>
          item.productId === product.productId
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item,
        );
      }

      return [
        ...prev,
        {
          ...product,
          quantity: 1,
        },
      ];
    });
  }, []);

  const remove = useCallback((productId: string) => {
    setItems((prev) => prev.filter((item) => item.productId !== productId));
  }, []);

  const increase = useCallback((productId: string) => {
    setItems((prev) =>
      prev.map((item) =>
        item.productId === productId
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item,
      ),
    );
  }, []);

  const decrease = useCallback((productId: string) => {
    setItems((prev) =>
      prev
        .map((item) =>
          item.productId === productId
            ? {
                ...item,
                quantity: item.quantity - 1,
              }
            : item,
        )
        .filter((item) => item.quantity > 0),
    );
  }, []);

  const totalItems = useMemo(() => {
    return items.reduce((total, item) => total + item.quantity, 0);
  }, [items]);

  const totalPrice = useMemo(() => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  }, [items]);

  return useMemo(
    () => ({
      items,

      totalItems,
      totalPrice,

      add,
      remove,
      increase,
      decrease,
    }),
    [items, totalItems, totalPrice, add, remove, increase, decrease],
  );
}
