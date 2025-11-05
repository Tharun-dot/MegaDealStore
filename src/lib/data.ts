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
    originalPrice: 999.00,
    price: 799.00,
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
    price: 899.99,
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
    price: 499.99,
    labels: [],
    reviewsCount: 732,
    rating: 4.7,
    description: "Your personal voice assistant. Play music, set alarms, control smart home devices, and get answers to questions with this compact and powerful smart speaker."
  },
  {
    id: 'product-4',
    category: 'drones',
    title: 'Mini Camera Drone',
    images: [PlaceHolderImages.find((p) => p.id === 'product-4')!],
    originalPrice: 999.00,
    price: 899.00,
    labels: ["Free Shipping"],
    reviewsCount: 121,
    rating: 4.9,
    description: "Capture breathtaking aerial footage in stunning 4K. Features a 3-axis gimbal for stable video, intelligent flight modes, and a 30-minute flight time."
  },
  {
    id: 'product-5',
    category: 'accessories',
    title: 'Zenith Laptop Stand',
    images: [PlaceHolderImages.find((p) => p.id === 'product-5')!],
    originalPrice: null,
    price: 599.99,
    labels: ["Best Seller"],
    reviewsCount: 305,
    rating: 4.9,
    description: "Ergonomic and portable laptop stand. Improve your posture and keep your laptop cool with this stylish and functional accessory."
  },
  {
    id: 'product-6',
    category: 'cameras',
    title: 'Orion Vlogging Camera',
    images: [PlaceHolderImages.find((p) => p.id === 'product-6')!],
    originalPrice: null,
    price: 949.99,
    labels: [],
    reviewsCount: 189,
    rating: 4.8,
    description: "Unleash your creativity with this compact vlogging camera. 24.1MP sensor, 4K video recording, and a versatile vari-angle touchscreen."
  },
  {
    id: 'product-7',
    category: 'vr',
    title: 'VR Mobile Headset',
    images: [PlaceHolderImages.find((p) => p.id === 'product-7')!],
    originalPrice: 649.99,
    price: 499.99,
    labels: ["On Sale"],
    reviewsCount: 543,
    rating: 4.8,
    description: "Dive into immersive virtual reality experiences with your smartphone. Redesigned for comfort and a huge library of games and apps await."
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
  { label: '₹0 - ₹499', min: 0, max: 499.99 },
  { label: '₹500 - ₹999', min: 500, max: 999.99 },
];

export const sortOptions = [
  { value: 'default', label: 'Default Sorting Order' },
  { value: 'price-asc', label: 'By Price: Low to High' },
  { value: 'price-desc', label: 'By Price: High to Low' },
  { value: 'name-asc', label: 'By Name' },
  { value: 'newest', label: 'By Newest' },
  { value: 'rating-desc', label: 'By Avg Review' },
];
