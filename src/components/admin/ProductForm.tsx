'use client';

import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { categories } from '@/lib/data';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { PlusCircle, Trash2, Sparkles } from 'lucide-react';
import type { Product } from '@/app/lib/types';
import { useFirestore } from '@/firebase';
import { doc } from 'firebase/firestore';
import { addDocumentNonBlocking, setDocumentNonBlocking } from '@/firebase/non-blocking-updates';
import { collection } from 'firebase/firestore';
import { importProductFromUrl } from '@/ai/flows/product-importer-flow';
import React from 'react';
import { Separator } from '../ui/separator';

const imageSchema = z.object({ 
  id: z.string().optional(),
  description: z.string().optional(),
  imageUrl: z.string().url('Must be a valid URL.'),
  imageHint: z.string().optional(),
});

const productSchema = z.object({
  title: z.string().min(1, 'Title is required.'),
  description: z.string().min(1, 'Description is required.'),
  category: z.string().min(1, 'Category is required.'),
  price: z.coerce.number().min(0, 'Price must be a positive number.'),
  originalPrice: z.coerce.number().optional().nullable(),
  images: z.array(imageSchema).min(1, 'At least one image is required.').max(4, 'You can add up to 4 images.'),
  videoUrl: z.string().url('Must be a valid URL.').optional().or(z.literal('')),
  rating: z.coerce.number().min(0).max(5).default(0),
  reviewsCount: z.coerce.number().min(0).default(0),
  labels: z.array(z.string()).default([]),
});

type ProductFormValues = z.infer<typeof productSchema>;

interface ProductFormProps {
  initialData?: Product | null;
  productId?: string;
}

export default function ProductForm({ initialData, productId }: ProductFormProps) {
  const router = useRouter();
  const { toast } = useToast();
  const isEditing = !!initialData;
  const firestore = useFirestore();
  const [importUrl, setImportUrl] = React.useState('');
  const [isImporting, setIsImporting] = React.useState(false);

  const defaultValues = initialData
    ? {
        ...initialData,
        images: initialData.images.map(img => ({ imageUrl: img.imageUrl, id: img.id, description: img.description, imageHint: img.imageHint })),
        videoUrl: initialData.videoUrl ?? '',
      }
    : {
        title: '',
        description: '',
        category: '',
        price: 0,
        originalPrice: null,
        images: [{ imageUrl: '', description: '', imageHint: '' }],
        videoUrl: '',
        rating: 0,
        reviewsCount: 0,
        labels: [],
      };

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues,
  });
  
  const { fields, append, remove, replace } = useFieldArray({
    control: form.control,
    name: 'images'
  });

  const handleImport = async () => {
    if (!importUrl) {
      toast({ title: 'Please enter a URL.', variant: 'destructive' });
      return;
    }
    setIsImporting(true);
    toast({ title: 'Importing Product...', description: 'Please wait while we fetch the details.' });
    try {
      const result = await importProductFromUrl({ url: importUrl });
      form.setValue('title', result.title);
      form.setValue('description', result.description);
      form.setValue('price', result.price);
      
      const imageFields = result.images.map(url => ({ imageUrl: url, description: '', imageHint: '' }));
      replace(imageFields.slice(0, 4)); // Replace existing fields with new ones, max 4

      toast({ title: 'Import Successful!', description: 'Product details have been populated.' });
    } catch (error) {
      console.error("Failed to import product:", error);
      toast({ title: 'Import Failed', description: 'Could not fetch details from the URL.', variant: 'destructive' });
    } finally {
      setIsImporting(false);
    }
  };

  const onSubmit = (data: ProductFormValues) => {
    if (!firestore) {
        toast({ title: 'Error', description: 'Database not available.', variant: 'destructive' });
        return;
    }
    if (isEditing && productId) {
      const productRef = doc(firestore, 'products', productId);
      setDocumentNonBlocking(productRef, data, { merge: true });
      toast({
        title: 'Product Updated!',
        description: `${data.title} has been successfully updated.`,
      });
    } else {
      const productsRef = collection(firestore, 'products');
      addDocumentNonBlocking(productsRef, data);
      toast({
        title: 'Product Added!',
        description: `${data.title} has been successfully added to your store.`,
      });
    }
    router.push('/admin/products');
  };
  
  const buttonText = isEditing ? 'Save Changes' : 'Add Product';

  return (
        <>
          {!isEditing && (
             <div className="space-y-4 mb-8">
                <h3 className="text-lg font-medium">Auto-Import from URL</h3>
                <div className="flex items-center gap-2">
                  <Input 
                    placeholder="Paste affiliate product URL (e.g., Amazon, Flipkart)"
                    value={importUrl}
                    onChange={(e) => setImportUrl(e.target.value)}
                    disabled={isImporting}
                  />
                  <Button type="button" onClick={handleImport} disabled={isImporting}>
                    <Sparkles className="mr-2 h-4 w-4" />
                    {isImporting ? 'Fetching...' : 'Fetch Details'}
                  </Button>
                </div>
                <Separator className="my-8" />
             </div>
          )}

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Title</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Aura Smartwatch" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Describe the product..." {...field} rows={5}/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                     <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {categories.map(cat => (
                           <SelectItem key={cat.id} value={cat.id}>{cat.title}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price (₹)</FormLabel>
                    <FormControl>
                      <Input type="number" step="0.01" placeholder="e.g., 799.00" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="originalPrice"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Original Price (Optional)</FormLabel>
                    <FormControl>
                      <Input type="number" step="0.01" placeholder="e.g., 999.00" {...field} value={field.value ?? ''} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <div>
              <FormLabel>Product Images</FormLabel>
              <div className="space-y-4 mt-2">
              {fields.map((field, index) => (
                <FormField
                  key={field.id}
                  control={form.control}
                  name={`images.${index}.imageUrl`}
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center gap-2">
                        <FormControl>
                          <Input placeholder={`Image URL ${index + 1}`} {...field} />
                        </FormControl>
                        {fields.length > 1 && (
                            <Button type="button" variant="destructive" size="icon" onClick={() => remove(index)}>
                                <Trash2 className="h-4 w-4" />
                            </Button>
                        )}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}
              </div>
               {fields.length < 4 && (
                <Button type="button" variant="outline" size="sm" className="mt-2" onClick={() => append({ imageUrl: '' })}>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Add Image
                </Button>
               )}
                <FormMessage>{form.formState.errors.images?.message}</FormMessage>
                {form.formState.errors.images?.root && <FormMessage>{form.formState.errors.images.root.message}</FormMessage>}
            </div>

             <FormField
              control={form.control}
              name="videoUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Video (Optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., https://youtube.com/watch?v=..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end gap-4">
               <Button type="button" variant="outline" onClick={() => router.back()}>Cancel</Button>
               <Button type="submit" disabled={isImporting}>{buttonText}</Button>
            </div>
          </form>
        </Form>
      </>
  );
}
