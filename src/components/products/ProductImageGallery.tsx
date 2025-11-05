'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from '@/components/ui/carousel';
import { cn } from '@/lib/utils';
import type { ImagePlaceholder } from '@/lib/data';

type ProductImageGalleryProps = {
  images: ImagePlaceholder[];
};

export default function ProductImageGallery({ images }: ProductImageGalleryProps) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCurrent(api.selectedScrollSnap() + 1);

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  const handleThumbClick = (index: number) => {
    api?.scrollTo(index);
  };

  if (!images || images.length === 0) {
    return (
      <div className="aspect-square relative rounded-lg overflow-hidden shadow-lg bg-card flex items-center justify-center">
        <p>No image available</p>
      </div>
    );
  }

  return (
    <div className="grid gap-4">
      <Carousel setApi={setApi} className="w-full">
        <CarouselContent>
          {images.map((image, index) => (
            <CarouselItem key={index}>
              <div className="aspect-square relative rounded-lg overflow-hidden shadow-lg bg-card">
                <Image
                  src={image.imageUrl}
                  alt={image.description}
                  fill
                  className="object-contain p-4"
                  data-ai-hint={image.imageHint}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority={index === 0}
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        {images.length > 1 && (
            <>
                <CarouselPrevious className="left-2" />
                <CarouselNext className="right-2" />
            </>
        )}
      </Carousel>
      {images.length > 1 && (
        <div className="grid grid-cols-5 gap-2">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => handleThumbClick(index)}
              className={cn(
                'aspect-square relative rounded-md overflow-hidden bg-card transition-opacity',
                'ring-2 ring-transparent',
                'focus:outline-none focus:ring-primary',
                current === index + 1 ? 'opacity-100 ring-primary' : 'opacity-50 hover:opacity-100'
              )}
            >
              <Image
                src={image.imageUrl}
                alt={`Thumbnail ${index + 1}`}
                fill
                className="object-contain p-1"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
