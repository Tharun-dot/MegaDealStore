
'use client';
import ProductForm from '@/components/admin/ProductForm';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { products } from '@/lib/data';
import { notFound } from 'next/navigation';

export default function EditProductPage({ params }: { params: { id: string } }) {
  const product = products.find((p) => p.id === params.id);

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
