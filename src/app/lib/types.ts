import type { ImagePlaceholder } from './data';

export type Product = {
  id: string;
  category: string;
  title: string;
  image: ImagePlaceholder;
  originalPrice: number | null;
  price: number;
  labels: string[];
  reviewsCount: number;
  rating: number;
  description: string;
};

export type CartItem = {
  product: Product;
  quantity: number;
};
