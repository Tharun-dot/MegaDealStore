"use client";

import React, { useState } from 'react';
import { priceFilters, sortOptions } from '@/lib/data';
import type { Product } from '@/app/lib/types';
import ProductCard from './ProductCard';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { LayoutGrid, List } from 'lucide-react';
import { useCollection, useFirestore, useMemoFirebase } from '@/firebase';
import { collection, query, orderBy, where, Query } from 'firebase/firestore';
import { Skeleton } from '../ui/skeleton';
import { Card, CardContent } from '../ui/card';

const ProductListings = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortOrder, setSortOrder] = useState('default');
  const [priceFilter, setPriceFilter] = useState('All');

  const firestore = useFirestore();
  
  const productsQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    let q: Query = collection(firestore, 'products');

    const selectedPriceRange = priceFilters.find(p => p.label === priceFilter);
    if (selectedPriceRange && selectedPriceRange.label !== 'All') {
      q = query(q, where('price', '>=', selectedPriceRange.min), where('price', '<=', selectedPriceRange.max));
    }
    
    switch (sortOrder) {
      case 'price-asc':
        q = query(q, orderBy('price', 'asc'));
        break;
      case 'price-desc':
        q = query(q, orderBy('price', 'desc'));
        break;
      case 'name-asc':
        q = query(q, orderBy('title', 'asc'));
        break;
      case 'newest':
        // Assuming a 'createdAt' field. If not present, this will error.
        // For demo, we'll sort by title as a fallback.
        // q = query(q, orderBy('createdAt', 'desc'));
         q = query(q, orderBy('title', 'desc'));
        break;
      case 'rating-desc':
        q = query(q, orderBy('rating', 'desc'));
        break;
      default:
        break;
    }
    return q;
  }, [firestore, priceFilter, sortOrder]);

  const { data: products, isLoading } = useCollection<Product>(productsQuery);

  return (
    <section id="products" className="bg-card py-12 sm:py-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Filters Sidebar */}
          <aside className="w-full md:w-1/4 lg:w-1/5">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold mb-4 font-headline">Price</h3>
                <RadioGroup value={priceFilter} onValueChange={setPriceFilter}>
                  {priceFilters.map(filter => (
                    <div key={filter.label} className="flex items-center space-x-2">
                      <RadioGroupItem value={filter.label} id={filter.label} />
                      <Label htmlFor={filter.label}>{filter.label}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            </div>
          </aside>
          
          {/* Product Grid */}
          <div className="w-full md:w-3/4 lg:w-4/5">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
              <p className="text-muted-foreground">Showing {products?.length ?? 0} results</p>
              <div className="flex items-center gap-4">
                 <Select value={sortOrder} onValueChange={setSortOrder}>
                  <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    {sortOptions.map(option => (
                      <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <div className="flex items-center gap-1">
                   <Button variant={viewMode === 'grid' ? 'secondary' : 'ghost'} size="icon" onClick={() => setViewMode('grid')}>
                    <LayoutGrid className="h-5 w-5" />
                    <span className="sr-only">Grid View</span>
                  </Button>
                   <Button variant={viewMode === 'list' ? 'secondary' : 'ghost'} size="icon" onClick={() => setViewMode('list')}>
                    <List className="h-5 w-5" />
                    <span className="sr-only">List View</span>
                  </Button>
                </div>
              </div>
            </div>
            
            {isLoading && <ProductGridSkeleton />}
            {!isLoading && products && viewMode === 'grid' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product, index) => (
                   <div key={product.id} className="fade-in-up" style={{ animationDelay: `${index * 50}ms`}}>
                     <ProductCard product={product} viewMode="grid" />
                   </div>
                ))}
              </div>
            ) : null}
             {!isLoading && products && viewMode === 'list' ? (
              <div className="space-y-6">
                {products.map((product, index) => (
                   <div key={product.id} className="fade-in-up" style={{ animationDelay: `${index * 50}ms`}}>
                     <ProductCard product={product} viewMode="list" />
                   </div>
                ))}
              </div>
            ) : null}
            {!isLoading && !products?.length && <p>No products found.</p>}

            {/* Pagination could be added here */}
          </div>
        </div>
      </div>
    </section>
  );
};

const ProductGridSkeleton = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    {[...Array(6)].map((_, i) => (
      <Card key={i}>
        <Skeleton className="aspect-square w-full" />
        <CardContent className="p-4 space-y-2">
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
          <div className="flex justify-between items-center">
            <Skeleton className="h-6 w-1/4" />
            <Skeleton className="h-8 w-20" />
          </div>
        </CardContent>
      </Card>
    ))}
  </div>
);


export default ProductListings;
