'use client';
import ProductForm from '@/components/admin/ProductForm';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { useDoc, useFirestore, useMemoFirebase } from '@/firebase';
import { doc } from 'firebase/firestore';
import { notFound } from 'next/navigation';
import type { Product } from '@/app/lib/types';
import { Skeleton } from '@/components/ui/skeleton';

export default function EditProductPage({ params }: { params: { id: string } }) {
  const firestore = useFirestore();
  const productRef = useMemoFirebase(() => {
    if (!firestore) return null;
    return doc(firestore, "products", params.id)
  }, [firestore, params.id]);

  const { data: product, isLoading } = useDoc<Product>(productRef);

  if (isLoading) {
    return (
        <Card>
            <CardHeader>
                <Skeleton className="h-8 w-48" />
                <Skeleton className="h-4 w-64" />
            </CardHeader>
            <CardContent>
                <div className="space-y-8">
                    <Skeleton className="h-10 w-full" />
                    <Skeleton className="h-20 w-full" />
                    <div className="grid grid-cols-3 gap-8">
                        <Skeleton className="h-10 w-full" />
                        <Skeleton className="h-10 w-full" />
                        <Skeleton className="h-10 w-full" />
                    </div>
                     <Skeleton className="h-10 w-full" />
                </div>
            </CardContent>
        </Card>
    )
  }

  if (!product) {
    notFound();
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Edit Product</CardTitle>
        <CardDescription>Make changes to your product below.</CardDescription>
      </CardHeader>
      <CardContent>
        <ProductForm initialData={product} productId={params.id} />
      </CardContent>
    </Card>
  );
}
