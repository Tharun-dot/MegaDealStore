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
    category: 'keyboards',
    title: 'HyperStrike Pro Mechanical Keyboard',
    image: PlaceHolderImages.find((p) => p.id === 'product-1')!,
    originalPrice: 129.99,
    price: 99.99,
    labels: ['On Sale'],
    reviewsCount: 258,
    rating: 4.8,
    description: "Experience lightning-fast response times with custom red switches. Full RGB backlighting and a durable aluminum frame make this the ultimate gaming keyboard."
  },
  {
    id: 'product-2',
    category: 'mice',
    title: 'Vortex Precision Gaming Mouse',
    image: PlaceHolderImages.find((p) => p.id === 'product-2')!,
    originalPrice: null,
    price: 79.99,
    labels: ['New'],
    reviewsCount: 150,
    rating: 4.9,
    description: "Ultra-lightweight honeycomb design at only 60g. Features a 26,000 DPI sensor for pixel-perfect tracking and flawless accuracy."
  },
  {
    id: 'product-3',
    category: 'headsets',
    title: 'Aegis-7 Surround Sound Headset',
    image: PlaceHolderImages.find((p) => p.id === 'product-3')!,
    originalPrice: null,
    price: 149.99,
    labels: [],
    reviewsCount: 192,
    rating: 4.7,
    description: "Immerse yourself in 7.1 surround sound. Crystal-clear noise-cancelling microphone and plush memory foam earcups for marathon gaming sessions."
  },
  {
    id: 'product-4',
    category: 'monitors',
    title: 'Odyssey G9 49" Curved Monitor',
    image: PlaceHolderImages.find((p) => p.id === 'product-4')!,
    originalPrice: 1599.99,
    price: 1399.99,
    labels: ["Free Shipping"],
    reviewsCount: 88,
    rating: 4.9,
    description: "Unleash a new level of immersion with the 1000R curved screen. 240Hz refresh rate, 1ms response time, and QLED technology for stunning visuals."
  },
];

export const categories = [
  {
    id: 'keyboards',
    title: 'Keyboards',
    breadcrumb: ['Home', 'Keyboards'],
  },
  {
    id: 'mice',
    title: 'Mice',
    breadcrumb: ['Home', 'Mice'],
  },
  {
    id: 'headsets',
    title: 'Headsets',
    breadcrumb: ['Home', 'Headsets'],
  },
  {
    id: 'monitors',
    title: 'Monitors',
    breadcrumb: ['Home', 'Monitors'],
  },
];

export const priceFilters = [
  { label: 'All', min: 0, max: Infinity },
  { label: '$0 - $99.99', min: 0, max: 99.99 },
  { label: '$100 - $249.99', min: 100, max: 249.99 },
  { label: 'Over $250', min: 250, max: Infinity },
];

export const sortOptions = [
  { value: 'default', label: 'Default Sorting Order' },
  { value: 'price-asc', label: 'By Price: Low to High' },
  { value: 'price-desc', label: 'By Price: High to Low' },
  { value: 'name-asc', label: 'By Name' },
  { value: 'newest', label: 'By Newest' },
  { value: 'rating-desc', label: 'By Avg Review' },
];
