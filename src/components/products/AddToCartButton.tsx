'use client';

import { useCart } from '@/hooks/use-cart';
import type { Product } from '@/app/lib/types';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';

export default function AddToCartButton({ product }: { product: Product }) {
  const { addToCart } = useCart();
  return (
    <Button size="lg" className="w-full md:w-auto" onClick={() => addToCart(product)}>
      <ShoppingCart className="mr-2 h-5 w-5" />
      Add to Cart
    </Button>
  );
}
