'use client';
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ShoppingCart, CheckCircle, Truck, Shield } from "lucide-react";
import StarRating from "@/components/products/StarRating";
import AddToCartButton from "@/components/products/AddToCartButton";
import type { Metadata } from "next";
import ProductImageGallery from "@/components/products/ProductImageGallery";
import { useDoc, useFirestore, useMemoFirebase } from "@/firebase";
import { doc } from "firebase/firestore";
import type { Product } from "@/app/lib/types";
import { Skeleton } from "@/components/ui/skeleton";


export default function ProductPage({ params }: { params: { id: string } }) {
  const firestore = useFirestore();
  const productRef = useMemoFirebase(() => {
    if(!firestore) return null;
    return doc(firestore, "products", params.id)
  }, [firestore, params.id]);
  const { data: product, isLoading } = useDoc<Product>(productRef);

  if (isLoading) {
    return <ProductPageSkeleton />;
  }

  if (!product) {
    notFound();
  }

  return (
    <div className="bg-background">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 gap-8 lg:gap-16">
          <div className="fade-in-up">
            <ProductImageGallery images={product.images} />
          </div>
          <div className="fade-in-up [animation-delay:0.2s]">
            <h1 className="text-3xl lg:text-4xl font-bold font-headline text-foreground">{product.title}</h1>
            <div className="flex items-center my-4">
              <StarRating rating={product.rating} />
              <span className="ml-3 text-sm text-muted-foreground">{product.reviewsCount} reviews</span>
            </div>
            <p className="text-2xl lg:text-3xl font-bold text-primary my-4">
              {product.originalPrice && (
                <span className="text-xl font-normal text-muted-foreground line-through mr-3">₹{product.originalPrice.toFixed(2)}</span>
              )}
              ₹{product.price.toFixed(2)}
            </p>
            <p className="text-muted-foreground leading-relaxed">{product.description}</p>
            
            <div className="my-6">
              <AddToCartButton product={product} />
            </div>

            <div className="space-y-3 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-primary" />
                <span>In stock and ready to ship</span>
              </div>
              <div className="flex items-center gap-2">
                <Truck className="h-5 w-5 text-primary" />
                <span>Free shipping on all orders</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                <span>2-year manufacturer warranty</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const ProductPageSkeleton = () => {
  return (
    <div className="bg-background">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 gap-8 lg:gap-16">
          <div>
            <Skeleton className="aspect-square w-full rounded-lg" />
            <div className="grid grid-cols-5 gap-2 mt-4">
              <Skeleton className="aspect-square w-full rounded-md" />
              <Skeleton className="aspect-square w-full rounded-md" />
              <Skeleton className="aspect-square w-full rounded-md" />
              <Skeleton className="aspect-square w-full rounded-md" />
              <Skeleton className="aspect-square w-full rounded-md" />
            </div>
          </div>
          <div className="space-y-4">
            <Skeleton className="h-10 w-3/4" />
            <div className="flex items-center gap-4">
              <Skeleton className="h-6 w-24" />
              <Skeleton className="h-6 w-16" />
            </div>
            <Skeleton className="h-8 w-40" />
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-12 w-48" />
          </div>
        </div>
      </div>
    </div>
  );
};
