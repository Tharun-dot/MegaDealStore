'use client';
import Image from 'next/image';
import Link from 'next/link';
import type { Product } from '@/app/lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ShoppingCart } from 'lucide-react';
import StarRating from './StarRating';
import { cn } from '@/lib/utils';
import { useCart } from '@/hooks/use-cart';

type ProductCardProps = {
  product: Product;
  viewMode?: 'grid' | 'list';
};

const ProductCard = ({ product, viewMode = 'grid' }: ProductCardProps) => {
  const { addToCart } = useCart();
  const firstImage = product.images[0];

  if (viewMode === 'list') {
    return (
      <Card className="w-full overflow-hidden transition-shadow duration-300 hover:shadow-lg bg-card border-border">
        <div className="flex flex-col md:flex-row">
          <Link href={`/products/${product.id}`} className="block md:w-1/3 relative bg-card">
            <Image
              src={firstImage.imageUrl}
              alt={product.title}
              width={300}
              height={300}
              className="object-contain w-full h-full p-4"
              data-ai-hint={firstImage.imageHint}
            />
          </Link>
          <div className="flex flex-col p-6 md:w-2/3">
            <div className="flex-1">
              <Link href={`/products/${product.id}`}>
                <h3 className="text-xl font-bold font-headline hover:text-primary transition-colors">{product.title}</h3>
              </Link>
              <div className="flex items-center my-2">
                <StarRating rating={product.rating} />
                <span className="ml-2 text-sm text-muted-foreground">({product.reviewsCount} reviews)</span>
              </div>
              <p className="text-muted-foreground mt-2 text-sm">{product.description}</p>
            </div>
            <div className="flex items-center justify-between mt-4">
              <div className="text-xl font-bold text-primary">
                {product.originalPrice && (
                  <span className="text-base font-normal text-muted-foreground line-through mr-2">${product.originalPrice.toFixed(2)}</span>
                )}
                ${product.price.toFixed(2)}
              </div>
              <Button onClick={() => addToCart(product)}>
                <ShoppingCart className="mr-2 h-4 w-4" />
                Add To Cart
              </Button>
            </div>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="group w-full overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 bg-card border-border">
      <Link href={`/products/${product.id}`} className="block">
        <div className="overflow-hidden relative bg-card aspect-square">
          <Image
            src={firstImage.imageUrl}
            alt={product.title}
            width={400}
            height={400}
            className="object-contain w-full h-full p-4 group-hover:scale-105 transition-transform duration-300"
            data-ai-hint={firstImage.imageHint}
          />
          {product.labels.length > 0 && (
            <div className="absolute top-3 left-3 bg-accent text-accent-foreground text-xs font-bold px-2 py-1 rounded-md">
              {product.labels[0]}
            </div>
          )}
        </div>
      </Link>
      <CardContent className="p-4">
        <div className="flex-1">
          <Link href={`/products/${product.id}`}>
            <h3 className="font-bold font-headline truncate group-hover:text-primary transition-colors">{product.title}</h3>
          </Link>
          <div className="flex items-center my-2">
            <StarRating rating={product.rating} />
            <span className="ml-2 text-xs text-muted-foreground">({product.reviewsCount})</span>
          </div>
        </div>
        <div className="flex items-center justify-between mt-2">
          <div className="font-bold text-primary">
            {product.originalPrice && (
              <span className="text-sm font-normal text-muted-foreground line-through mr-1">${product.originalPrice.toFixed(2)}</span>
            )}
            ${product.price.toFixed(2)}
          </div>
          <Button size="sm" onClick={() => addToCart(product)}>
            <ShoppingCart className="mr-2 h-4 w-4" />
            Add
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
