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
import { getAllProductsTool } from '../tools/product-retrieval';

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
  viewingHistory: z.array(ProductSchema).describe("The user's viewing history as an array of products."),
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
  tools: [getAllProductsTool],
  prompt: `You are an expert product recommendation engine for an online store.

  Your goal is to recommend {{numberOfSuggestions}} similar or complementary products to the user.

  Base your recommendations on the user's viewing history and the product they are currently viewing.
  Use the provided tool to get a list of all available products that you can recommend from.

  Do not recommend products that are already in the user's viewing history or the current product they are viewing.

  Return only an array of the recommended products in the specified format. Do not add any conversational text.

  User Viewing History:
  {{#each viewingHistory}}
  - Title: {{this.title}}, Category: {{this.category}}, Price: {{this.price}}
  {{/each}}

  Current Product:
  - Title: {{currentProduct.title}}, Category: {{currentProduct.category}}, Price: {{currentProduct.price}}
  `,
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
