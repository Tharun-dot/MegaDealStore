'use server';
/**
 * @fileOverview A Genkit tool for retrieving products from Firestore.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { initializeFirebase } from '@/firebase';

// Initialize Firebase services to access Firestore
// This is safe to call multiple times.
const { firestore } = initializeFirebase();

// Define the schema for the output of our tool. This matches the AI Product schema.
const ProductToolSchema = z.array(z.object({
  id: z.string(),
  category: z.string(),
  title: z.string(),
  imageUrl: z.string(),
  originalPrice: z.number().nullable(),
  price: z.number(),
  labels: z.string().array(),
  reviewsCount: z.number(),
}));

// Define the Genkit tool
export const getAllProductsTool = ai.defineTool(
  {
    name: 'getAllProducts',
    description: 'Returns a list of all available products from the store catalog.',
    inputSchema: z.object({}), // No input needed for this tool
    outputSchema: ProductToolSchema,
  },
  async () => {
    console.log('Fetching all products from Firestore...');
    const productsCollection = collection(firestore, 'products');
    const productSnapshot = await getDocs(productsCollection);
    
    const productList = productSnapshot.docs.map(doc => {
        const data = doc.data();
        return {
            id: doc.id,
            category: data.category || '',
            title: data.title || '',
            imageUrl: data.images?.[0]?.imageUrl || '',
            originalPrice: data.originalPrice || null,
            price: data.price || 0,
            labels: data.labels || [],
            reviewsCount: data.reviewsCount || 0,
        };
    });

    console.log(`Fetched ${productList.length} products.`);
    return productList;
  }
);
