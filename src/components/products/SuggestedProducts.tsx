"use client";

import { useEffect, useState } from "react";
import type { Product as AppProduct } from "@/app/lib/types";
import type { ProductSuggestionOutput, ProductSuggestionInput, Product as AIProduct } from "@/ai/flows/product-suggestion-based-on-view-history";
import { getProductSuggestions } from "@/ai/flows/product-suggestion-based-on-view-history";
import ProductCard from "./ProductCard";
import { PlaceHolderImages } from "@/lib/data";
import { Skeleton } from "../ui/skeleton";
import { useCollection, useFirestore } from "@/firebase";
import { collection, limit, query, where } from "firebase/firestore";

const mapAppProductToAIProduct = (product: AppProduct): AIProduct => {
  return {
    id: product.id,
    category: product.category,
    title: product.title,
    imageUrl: product.images[0].imageUrl,
    originalPrice: product.originalPrice,
    price: product.price,
    labels: product.labels,
    reviewsCount: product.reviewsCount,
  };
};

const mapAIProductToAppProduct = (aiProduct: AIProduct, allProducts: AppProduct[]): AppProduct | undefined => {
  // In a real app, you'd fetch product details from your DB using the ID.
  // Here, we'll find it in our static data.
  const fullProduct = allProducts.find(p => p.id === aiProduct.id);
  if (fullProduct) return fullProduct;

  // Fallback if not found in our main data (e.g., if AI suggests a new product)
  const image = PlaceHolderImages.find(img => img.imageUrl === aiProduct.imageUrl) ?? PlaceHolderImages[0];
  return {
    id: aiProduct.id,
    category: aiProduct.category,
    title: aiProduct.title,
    images: [image],
    originalPrice: aiProduct.originalPrice,
    price: aiProduct.price,
    labels: aiProduct.labels,
    reviewsCount: aiProduct.reviewsCount,
    rating: 0, // default value
    description: '', // default value
  }
};


const VIEWING_HISTORY_KEY = "viewingHistory";
const MAX_HISTORY_LENGTH = 5;

const SuggestedProducts = ({ currentProduct }: { currentProduct: AppProduct }) => {
  const [suggestions, setSuggestions] = useState<AppProduct[]>([]);
  const [loading, setLoading] = useState(true);

  const firestore = useFirestore();
  const productsRef = collection(firestore, 'products');
  // Fetch 4 products to have a fallback if one is the current product
  const q = query(productsRef, where('id', '!=', currentProduct.id), limit(3));
  const { data: allProducts, isLoading: productsLoading } = useCollection<AppProduct>(q);

  useEffect(() => {
    // This should only run on the client
    const updateViewingHistory = () => {
      let history: AIProduct[] = [];
      try {
        const storedHistory = localStorage.getItem(VIEWING_HISTORY_KEY);
        if (storedHistory) {
          history = JSON.parse(storedHistory);
        }
      } catch (e) {
        console.error("Failed to parse viewing history", e);
      }

      // Add current product to history, avoiding duplicates
      history = history.filter(p => p.id !== currentProduct.id);
      history.unshift(mapAppProductToAIProduct(currentProduct));

      // Limit history length
      if (history.length > MAX_HISTORY_LENGTH) {
        history = history.slice(0, MAX_HISTORY_LENGTH);
      }

      try {
        localStorage.setItem(VIEWING_HISTORY_KEY, JSON.stringify(history));
      } catch (e) {
        console.error("Failed to save viewing history", e);
      }
      
      return history;
    };

    const fetchSuggestions = async () => {
      if (!allProducts) return;

      setLoading(true);
      const viewingHistory = updateViewingHistory();
      const input: ProductSuggestionInput = {
        currentProduct: mapAppProductToAIProduct(currentProduct),
        viewingHistory: viewingHistory.filter(p => p.id !== currentProduct.id), // Exclude current from history
        numberOfSuggestions: 3,
      };

      try {
        // In a real app, you would provide the full product list for the AI to choose from.
        // For this demo, we mock the AI response since we can't provide the full list.
        // const result = await getProductSuggestions(input);
        const result = getMockSuggestions(currentProduct.id);
        const suggestedProducts = result.map(aiProd => mapAIProductToAppProduct(aiProd, allProducts)).filter((p): p is AppProduct => !!p);
        setSuggestions(suggestedProducts);
      } catch (error) {
        console.error("Error fetching product suggestions:", error);
        // Fallback to mock suggestions
        const mockResult = getMockSuggestions(currentProduct.id);
        const suggestedProducts = mockResult.map(aiProd => mapAIProductToAppProduct(aiProd, allProducts)).filter((p): p is AppProduct => !!p);
        setSuggestions(suggestedProducts);
      } finally {
        setLoading(false);
      }
    };
    
    // Mock suggestions because the AI flow needs a list of all available products to choose from,
    // which we can't provide in this context.
    const getMockSuggestions = (currentId: string): AIProduct[] => {
      if (!allProducts) return [];
      return allProducts
        .filter(p => p.id !== currentId)
        .slice(0, 3)
        .map(mapAppProductToAIProduct);
    };


    if (allProducts) {
      fetchSuggestions();
    }
  }, [currentProduct, allProducts]);

  const isLoadingSuggestions = loading || productsLoading;

  return (
    <div className="bg-card py-16 sm:py-24">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8 font-headline">You Might Also Like</h2>
        {isLoadingSuggestions ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <Skeleton className="h-96 w-full" />
            <Skeleton className="h-96 w-full" />
            <Skeleton className="h-96 w-full" />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {suggestions.map((product, index) => (
              <div key={product.id} className="fade-in-up" style={{ animationDelay: `${index * 100}ms`}}>
                <ProductCard product={product} viewMode="grid" />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SuggestedProducts;
