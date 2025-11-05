import type { Product } from '@/app/lib/types';
import placeholderData from './placeholder-images.json';

export type ImagePlaceholder = {
  id: string;
  description: string;
  imageUrl: string;
  imageHint: string;
};

export const PlaceHolderImages: ImagePlaceholder[] = placeholderData.placeholderImages;

export const products: Product[] = [
  {
    id: 'product-1',
    category: 'accessories',
    title: 'Corner Top Cacti',
    image: PlaceHolderImages.find((p) => p.id === 'product-1')!,
    originalPrice: 25.99,
    price: 24.99,
    labels: ['Free Shipping'],
    reviewsCount: 12,
    rating: 4.5,
    description: "A charming collection of cacti perfect for brightening up any corner of your home. Low maintenance and visually striking."
  },
  {
    id: 'product-2',
    category: 'accessories',
    title: 'Pearl Succulent',
    image: PlaceHolderImages.find((p) => p.id === 'product-2')!,
    originalPrice: null,
    price: 23.99,
    labels: [],
    reviewsCount: 8,
    rating: 4.7,
    description: "Known as 'String of Pearls', this unique succulent features cascading tendrils of pea-shaped leaves. A true conversation starter."
  },
  {
    id: 'product-3',
    category: 'accessories',
    title: 'Ficus Altissima',
    image: PlaceHolderImages.find((p) => p.id === 'product-3')!,
    originalPrice: null,
    price: 20.99,
    labels: [],
    reviewsCount: 1,
    rating: 5.0,
    description: "With its large, variegated leaves, the Ficus Altissima adds a touch of the tropics to your indoor space. A beautiful and resilient choice."
  },
  {
    id: 'product-4',
    category: 'accessories',
    title: 'Terracotta Succulent',
    image: PlaceHolderImages.find((p) => p.id === 'product-4')!,
    originalPrice: 20.99,
    price: 18.99,
    labels: ["On Sale"],
    reviewsCount: 5,
    rating: 4.2,
    description: "A classic combination of a hardy succulent in a timeless terracotta pot. Perfect for beginners and seasoned plant lovers alike."
  },
];

export const categories = [
  {
    id: 'accessories',
    title: 'Accessories',
    breadcrumb: ['Home', 'Accessories'],
  },
];

export const priceFilters = [
  { label: 'All', min: 0, max: Infinity },
  { label: '$0 - $24.99', min: 0, max: 24.99 },
  { label: '$25 - $49.99', min: 25, max: 49.99 },
  { label: 'Over $50', min: 50, max: Infinity },
];

export const sortOptions = [
  { value: 'default', label: 'Default Sorting Order' },
  { value: 'price-asc', label: 'By Price: Low to High' },
  { value: 'price-desc', label: 'By Price: High to Low' },
  { value: 'name-asc', label: 'By Name' },
  { value: 'newest', label: 'By Newest' },
  { value: 'rating-desc', label: 'By Avg Review' },
];
