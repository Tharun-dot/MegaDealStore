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
  {
    id: 'accessories',
    title: 'Accessories'
  }
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
