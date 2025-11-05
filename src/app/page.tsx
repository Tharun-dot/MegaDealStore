import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/data';
import ProductListings from '@/components/products/ProductListings';
import { ArrowRight, Gamepad2, ShieldCheck, Truck } from 'lucide-react';
import ParallaxWrapper from '@/components/shared/ParallaxWrapper';
import Link from 'next/link';

const heroImage = PlaceHolderImages.find((img) => img.id === 'hero-1');

const features = [
  {
    icon: <Truck className="h-8 w-8 text-primary" />,
    title: 'Free Shipping',
    description: 'Enjoy free shipping on all your orders, with no minimum purchase required.',
  },
  {
    icon: <Gamepad2 className="h-8 w-8 text-primary" />,
    title: 'Pro-Grade Gear',
    description: 'We guarantee top-quality, high-performance gear sourced from the best brands.',
  },
  {
    icon: <ShieldCheck className="h-8 w-8 text-primary" />,
    title: 'Secure Checkout',
    description: 'Your transactions are safe with our encrypted, secure payment gateway.',
  },
];

export default function Home() {
  return (
    <div className="flex flex-col">
      <section className="relative h-[60vh] min-h-[500px] w-full overflow-hidden">
        {heroImage && (
          <ParallaxWrapper speed={0.5}>
            <Image
              src={heroImage.imageUrl}
              alt={heroImage.description}
              fill
              className="object-cover"
              priority
              data-ai-hint={heroImage.imageHint}
            />
          </ParallaxWrapper>
        )}
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 flex h-full flex-col items-center justify-center text-center text-white p-4">
          <h1 className="text-4xl md:text-6xl font-bold font-headline tracking-tight drop-shadow-lg fade-in-up">
            Level Up Your Setup
          </h1>
          <p className="mt-4 max-w-2xl text-lg md:text-xl text-primary-foreground/90 drop-shadow-md fade-in-up [animation-delay:0.2s]">
            Discover a curated collection of high-performance gaming gear to dominate the competition.
          </p>
          <Link href="/#products">
            <Button size="lg" className="mt-8 bg-accent hover:bg-accent/90 text-accent-foreground fade-in-up [animation-delay:0.4s]">
              Shop Now <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      <section id="features" className="py-16 sm:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {features.map((feature, index) => (
              <div key={index} className="flex flex-col items-center fade-in-up" style={{ animationDelay: `${index * 0.2}s` }}>
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold font-headline text-foreground">{feature.title}</h3>
                <p className="mt-2 text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ProductListings />
    </div>
  );
}
