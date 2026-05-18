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
