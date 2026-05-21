export type CartItem = {
  productId: string;
  thumbnail: string;
  rating: number;
  quantity: number;
  productName: string;
  brandName: string;
  productSlug: string;
  originalPrice: number;
  price: number;
  discountPercent?: number;
  currency?: string;
};

export type CartStore = {
  items: CartItem[];

  totalItems: () => number;
  totalPrice: () => number;

  add: (product: CartItem) => void;
  remove: (productId: string) => void;
  increase: (productId: string) => void;
  decrease: (productId: string) => void;
};