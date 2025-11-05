import { products } from "@/lib/data";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ShoppingCart, CheckCircle, Truck, Shield } from "lucide-react";
import StarRating from "@/components/products/StarRating";
import AddToCartButton from "@/components/products/AddToCartButton";
import SuggestedProducts from "@/components/products/SuggestedProducts";
import { Metadata } from "next";

type ProductPageProps = {
  params: {
    id: string;
  };
};

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const product = products.find((p) => p.id === params.id);
  if (!product) {
    return {
      title: 'Product Not Found',
    }
  }

  return {
    title: `${product.title} – YourDropshipStore`,
    description: product.description,
    openGraph: {
      title: product.title,
      description: product.description,
      images: [
        {
          url: product.image.imageUrl,
          width: 600,
          height: 600,
          alt: product.title,
        },
      ],
    },
  };
}


export default function ProductPage({ params }: ProductPageProps) {
  const product = products.find((p) => p.id === params.id);

  if (!product) {
    notFound();
  }

  return (
    <div className="bg-background">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 gap-8 lg:gap-16">
          <div className="fade-in-up">
            <div className="aspect-square relative rounded-lg overflow-hidden shadow-lg">
              <Image
                src={product.image.imageUrl}
                alt={product.title}
                fill
                className="object-cover"
                data-ai-hint={product.image.imageHint}
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
          <div className="fade-in-up [animation-delay:0.2s]">
            <h1 className="text-3xl lg:text-4xl font-bold font-headline text-foreground">{product.title}</h1>
            <div className="flex items-center my-4">
              <StarRating rating={product.rating} />
              <span className="ml-3 text-sm text-muted-foreground">{product.reviewsCount} reviews</span>
            </div>
            <p className="text-2xl lg:text-3xl font-bold text-primary my-4">
              {product.originalPrice && (
                <span className="text-xl font-normal text-muted-foreground line-through mr-3">${product.originalPrice.toFixed(2)}</span>
              )}
              ${product.price.toFixed(2)}
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
                <span>30-day return policy</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <SuggestedProducts currentProduct={product} />
    </div>
  );
}
