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
    category: 'wearables',
    title: 'Aura Smartwatch Series 8',
    images: [
      PlaceHolderImages.find((p) => p.id === 'product-1')!,
      PlaceHolderImages.find((p) => p.id === 'product-1-alt-1')!,
      PlaceHolderImages.find((p) => p.id === 'product-1-alt-2')!,
    ],
    originalPrice: 429.00,
    price: 399.00,
    labels: ['On Sale'],
    reviewsCount: 480,
    rating: 4.8,
    description: "Stay connected and track your health with the Aura Smartwatch. Features a stunning always-on display, advanced health sensors, and seamless smartphone integration."
  },
  {
    id: 'product-2',
    category: 'audio',
    title: 'Nebula Noise-Cancelling Headphones',
    images: [PlaceHolderImages.find((p) => p.id === 'product-2')!],
    originalPrice: null,
    price: 349.99,
    labels: ['New'],
    reviewsCount: 215,
    rating: 4.9,
    description: "Immerse yourself in pure audio with industry-leading noise cancellation. Enjoy up to 30 hours of battery life and crystal-clear call quality."
  },
  {
    id: 'product-3',
    category: 'smart-home',
    title: 'Helios Smart Speaker',
    images: [PlaceHolderImages.find((p) => p.id === 'product-3')!],
    originalPrice: null,
    price: 99.99,
    labels: [],
    reviewsCount: 732,
    rating: 4.7,
    description: "Your personal voice assistant. Play music, set alarms, control smart home devices, and get answers to questions with this compact and powerful smart speaker."
  },
  {
    id: 'product-4',
    category: 'drones',
    title: 'Stratus 4K Camera Drone',
    images: [PlaceHolderImages.find((p) => p.id === 'product-4')!],
    originalPrice: 899.99,
    price: 799.99,
    labels: ["Free Shipping"],
    reviewsCount: 121,
    rating: 4.9,
    description: "Capture breathtaking aerial footage in stunning 4K. Features a 3-axis gimbal for stable video, intelligent flight modes, and a 30-minute flight time."
  },
  {
    id: 'product-5',
    category: 'laptops',
    title: 'Zenith Ultrabook Pro',
    images: [PlaceHolderImages.find((p) => p.id === 'product-5')!],
    originalPrice: null,
    price: 1499.99,
    labels: ["Best Seller"],
    reviewsCount: 305,
    rating: 4.9,
    description: "Power and portability combined. This ultrabook features a 14-inch OLED display, the latest Intel Core i9 processor, and a feather-light chassis for productivity on the go."
  },
  {
    id: 'product-6',
    category: 'cameras',
    title: 'Orion Mirrorless Camera M50',
    images: [PlaceHolderImages.find((p) => p.id === 'product-6')!],
    originalPrice: null,
    price: 749.99,
    labels: [],
    reviewsCount: 189,
    rating: 4.8,
    description: "Unleash your creativity with this compact mirrorless camera. 24.1MP sensor, 4K video recording, and a versatile vari-angle touchscreen."
  },
  {
    id: 'product-7',
    category: 'vr',
    title: 'Metaverse Quest 3 VR Headset',
    images: [PlaceHolderImages.find((p) => p.id === 'product-7')!],
    originalPrice: 549.99,
    price: 499.99,
    labels: ["On Sale"],
    reviewsCount: 543,
    rating: 4.8,
    description: "Dive into immersive virtual and mixed reality experiences. Redesigned controllers, higher resolution displays, and a vast library of games and apps await."
  },
];

export const categories = [
  {
    id: 'wearables',
    title: 'Wearables',
    breadcrumb: ['Home', 'Wearables'],
  },
  {
    id: 'audio',
    title: 'Audio',
    breadcrumb: ['Home', 'Audio'],
  },
  {
    id: 'smart-home',
    title: 'Smart Home',
    breadcrumb: ['Home', 'Smart Home'],
  },
  {
    id: 'drones',
    title: 'Drones',
    breadcrumb: ['Home', 'Drones'],
  },
  {
    id: 'laptops',
    title: 'Laptops',
    breadcrumb: ['Home', 'Laptops'],
  },
  {
    id: 'cameras',
    title: 'Cameras',
    breadcrumb: ['Home', 'Cameras'],
  },
  {
    id: 'vr',
    title: 'VR',
    breadcrumb: ['Home', 'VR'],
  },
];

export const priceFilters = [
  { label: 'All', min: 0, max: Infinity },
  { label: '$0 - $99.99', min: 0, max: 99.99 },
  { label: '$100 - $499.99', min: 100, max: 499.99 },
  { label: 'Over $500', min: 500, max: Infinity },
];

export const sortOptions = [
  { value: 'default', label: 'Default Sorting Order' },
  { value: 'price-asc', label: 'By Price: Low to High' },
  { value: 'price-desc', label: 'By Price: High to Low' },
  { value: 'name-asc', label: 'By Name' },
  { value: 'newest', label: 'By Newest' },
  { value: 'rating-desc', label: 'By Avg Review' },
];
