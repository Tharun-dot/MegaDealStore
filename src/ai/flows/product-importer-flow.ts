'use server';
/**
 * @fileOverview An AI flow for importing product details by scraping a URL.
 *
 * - importProductFromUrl - A function that takes a URL and returns structured product data.
 * - ProductImportInput - The input type for the importProductFromUrl function.
 * - ProductImportOutput - The return type for the importProductFromUrl function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const ProductImportInputSchema = z.object({
  url: z.string().url().describe('The URL of the product page to scrape.'),
});
export type ProductImportInput = z.infer<typeof ProductImportInputSchema>;

const ProductImportOutputSchema = z.object({
  title: z.string().describe('The extracted product title.'),
  description: z.string().describe('The extracted product description, cleaned of any HTML or scripts.'),
  price: z.number().describe('The extracted product price as a number.'),
  images: z.array(z.string().url()).describe('A list of extracted product image URLs. Should be at least 3 images if available.'),
});
export type ProductImportOutput = z.infer<typeof ProductImportOutputSchema>;

export async function importProductFromUrl(input: ProductImportInput): Promise<ProductImportOutput> {
  return productImporterFlow(input);
}

const productImporterPrompt = ai.definePrompt({
  name: 'productImporterPrompt',
  input: { schema: ProductImportInputSchema },
  output: { schema: ProductImportOutputSchema },
  prompt: `You are an expert web scraping agent. Your task is to extract product information from a given URL.

  Analyze the content of the following URL: {{url}}

  Extract the following information:
  - Product Title: Look for the main product title, usually in an H1 tag.
  - Product Description: Find the detailed product description. Clean it up by removing any HTML tags, promotional text, or scripts.
  - Product Price: Find the main product price. Extract it as a number, removing any currency symbols or commas.
  - Product Images: Find the main product images. Extract the URLs of at least 3 high-quality images if available.

  Return the data in the specified JSON format.
  `,
});

const productImporterFlow = ai.defineFlow(
  {
    name: 'productImporterFlow',
    inputSchema: ProductImportInputSchema,
    outputSchema: ProductImportOutputSchema,
  },
  async (input) => {
    const { output } = await productImporterPrompt(input);
    return output!;
  }
);