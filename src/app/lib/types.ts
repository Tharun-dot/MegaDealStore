import type { ImagePlaceholder } from '@/lib/data';

export type Product = {
  id: string;
  category: string;
  title: string;
  images: ImagePlaceholder[];
  videoUrl?: string | null;
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

export type UserProfile = {
  id: string;
  email: string;
  name?: string;
  photoURL?: string;
};
