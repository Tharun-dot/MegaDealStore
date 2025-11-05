'use server';
/**
 * @fileOverview Product suggestion flow based on user's viewing history and current product.
 *
 * - getProductSuggestions - A function that recommends similar products.
 * - ProductSuggestionInput - The input type for the getProductSuggestions function.
 * - ProductSuggestionOutput - The return type for the getProductSuggestions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ProductSchema = z.object({
  id: z.string(),
  category: z.string(),
  title: z.string(),
  imageUrl: z.string(),
  originalPrice: z.number().nullable(),
  price: z.number(),
  labels: z.string().array(),
  reviewsCount: z.number(),
});
export type Product = z.infer<typeof ProductSchema>;

const ProductSuggestionInputSchema = z.object({
  viewingHistory: z.array(ProductSchema).describe('The user viewing history as an array of products.'),
  currentProduct: ProductSchema.describe('The product the user is currently viewing.'),
  numberOfSuggestions: z.number().default(3).describe('The number of product suggestions to return. Defaults to 3.'),
});
export type ProductSuggestionInput = z.infer<typeof ProductSuggestionInputSchema>;

const ProductSuggestionOutputSchema = z.array(ProductSchema);
export type ProductSuggestionOutput = z.infer<typeof ProductSuggestionOutputSchema>;

export async function getProductSuggestions(input: ProductSuggestionInput): Promise<ProductSuggestionOutput> {
  return productSuggestionFlow(input);
}

const productSuggestionPrompt = ai.definePrompt({
  name: 'productSuggestionPrompt',
  input: {schema: ProductSuggestionInputSchema},
  output: {schema: ProductSuggestionOutputSchema},
  prompt: `You are an expert product recommendation engine for an online store.

  Given the user's viewing history and the product they are currently viewing, recommend {{numberOfSuggestions}} similar products that the user might be interested in.
  Return only the product, do not add any conversational text.

  User Viewing History:
  {{#each viewingHistory}}
  - Title: {{this.title}}, Category: {{this.category}}, Price: {{this.price}}
  {{/each}}

  Current Product:
  - Title: {{currentProduct.title}}, Category: {{currentProduct.category}}, Price: {{currentProduct.price}}

  Products:`, // TODO: Add a list of available products to choose from. This will require fetching products from a database or other source.
});

const productSuggestionFlow = ai.defineFlow(
  {
    name: 'productSuggestionFlow',
    inputSchema: ProductSuggestionInputSchema,
    outputSchema: ProductSuggestionOutputSchema,
  },
  async input => {
    const {output} = await productSuggestionPrompt(input);
    return output!;
  }
);
