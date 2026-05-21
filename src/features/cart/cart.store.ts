import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import type { CartItem, CartStore } from "./types";

export const useCartStore = create<CartStore>()(
  devtools(
    persist(
      (set, get) => ({
        items: [],

        totalItems: () => {
          return get().items.reduce((total, item) => total + item.quantity, 0);
        },

        totalPrice: () => {
          return get().items.reduce(
            (total, item) => total + item.price * item.quantity,
            0,
          );
        },

        add: (product: CartItem) => {
          set(
            (state) => {
              const exist = state.items.find(
                (item) => item.productId === product.productId,
              );

              if (exist) {
                return {
                  items: state.items.map((item) =>
                    item.productId === product.productId
                      ? {
                          ...item,
                          quantity: item.quantity + 1,
                        }
                      : item,
                  ),
                };
              }

              return {
                items: [
                  ...state.items,
                  {
                    ...product,
                    quantity: 1,
                  },
                ],
              };
            },
            false,
            "cart/add",
          );
        },

        remove: (productId) => {
          set(
            (state) => ({
              items: state.items.filter((item) => item.productId !== productId),
            }),
            false,
            "cart/remove",
          );
        },

        increase: (productId) => {
          set(
            (state) => ({
              items: state.items.map((item) =>
                item.productId === productId
                  ? {
                      ...item,
                      quantity: item.quantity + 1,
                    }
                  : item,
              ),
            }),
            false,
            "cart/increase",
          );
        },

        decrease: (productId) => {
          set(
            (state) => ({
              items: state.items
                .map((item) =>
                  item.productId === productId
                    ? {
                        ...item,
                        quantity: item.quantity - 1,
                      }
                    : item,
                )
                .filter((item) => item.quantity > 0),
            }),
            false,
            "cart/decrease",
          );
        },
      }),
      {
        name: "cart-storage",
      },
    ),
    {
      name: "cart-store",
    },
  ),
);
