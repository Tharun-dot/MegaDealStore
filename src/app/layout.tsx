import type { Metadata } from 'next';
import './globals.css';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/toaster';
import { CartProvider } from '@/hooks/use-cart';

export const metadata: Metadata = {
  title: 'MegaDealsStore - India’s #1 Budget Deals Store',
  description: 'Premium products under ₹999 — COD Available | FREE delivery.',
  metadataBase: new URL('https://megadealsstore.com'),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body className={cn('font-body antialiased', 'min-h-screen bg-background font-sans')}>
        <CartProvider>
          <div className="relative flex min-h-dvh flex-col">
            {children}
          </div>
          <Toaster />
        </CartProvider>
      </body>
    </html>
  );
}
