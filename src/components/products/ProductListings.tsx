"use client";

import React, { useState, useMemo } from 'react';
import { products, priceFilters, sortOptions } from '@/lib/data';
import type { Product } from '@/app/lib/types';
import ProductCard from './ProductCard';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { LayoutGrid, List } from 'lucide-react';

const ProductListings = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortOrder, setSortOrder] = useState('default');
  const [priceFilter, setPriceFilter] = useState('All');

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = [...products];

    // Filter by price
    const selectedPriceRange = priceFilters.find(p => p.label === priceFilter);
    if (selectedPriceRange) {
      filtered = filtered.filter(p => p.price >= selectedPriceRange.min && p.price <= selectedPriceRange.max);
    }
    
    // Sort
    switch (sortOrder) {
      case 'price-asc':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'name-asc':
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'newest':
        // Assuming higher ID means newer for this static data
        filtered.sort((a, b) => parseInt(b.id.split('-')[1]) - parseInt(a.id.split('-')[1]));
        break;
      case 'rating-desc':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      default:
        break;
    }

    return filtered;
  }, [products, priceFilter, sortOrder]);

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
              <p className="text-muted-foreground">Showing {filteredAndSortedProducts.length} results</p>
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
            
            {viewMode === 'grid' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredAndSortedProducts.map((product, index) => (
                   <div key={product.id} className="fade-in-up" style={{ animationDelay: `${index * 50}ms`}}>
                     <ProductCard product={product} viewMode="grid" />
                   </div>
                ))}
              </div>
            ) : (
              <div className="space-y-6">
                {filteredAndSortedProducts.map((product, index) => (
                   <div key={product.id} className="fade-in-up" style={{ animationDelay: `${index * 50}ms`}}>
                     <ProductCard product={product} viewMode="list" />
                   </div>
                ))}
              </div>
            )}
            {/* Pagination could be added here */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductListings;
