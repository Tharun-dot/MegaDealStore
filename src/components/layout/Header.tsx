"use client";
import Link from 'next/link';
import { Gamepad2, Menu, ShoppingCart, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
  SheetClose,
} from '@/components/ui/sheet';
import { Separator } from '@/components/ui/separator';
import { useCart } from '@/hooks/use-cart';
import Image from 'next/image';
import { useState } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';


const navLinks = ["Home", "About Us", "Gift Registry", "Blog", "Contact Us"];

const CartSheet = () => {
  const { cartItems, removeFromCart, updateQuantity, cartTotal, itemCount } = useCart();

  return (
    <Sheet>
      <Popover>
        <PopoverTrigger asChild>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className="h-6 w-6" />
              {itemCount > 0 && (
                <span className="absolute top-0 right-0 flex h-5 w-5 items-center justify-center rounded-full bg-accent text-xs font-bold text-accent-foreground">
                  {itemCount}
                </span>
              )}
              <span className="sr-only">Open cart</span>
            </Button>
          </SheetTrigger>
        </PopoverTrigger>
        <PopoverContent className="w-80 mr-4">
          <CartContent />
        </PopoverContent>
      </Popover>
    </Sheet>
  );
};

const CartContent = () => {
  const { cartItems, removeFromCart, updateQuantity, cartTotal, itemCount } = useCart();

  return (
    <>
      <SheetHeader>
        <SheetTitle>Your Cart ({itemCount})</SheetTitle>
      </SheetHeader>
      <Separator className="my-4" />
      {cartItems.length > 0 ? (
        <div className="flex flex-col h-full">
          <div className="flex-1 overflow-y-auto pr-4">
            {cartItems.map(item => (
              <div key={item.product.id} className="flex items-start gap-4 mb-4">
                <Image
                  src={item.product.image.imageUrl}
                  alt={item.product.title}
                  width={64}
                  height={64}
                  className="rounded-md object-cover"
                />
                <div className="flex-1">
                  <h3 className="font-semibold">{item.product.title}</h3>
                  <p className="text-sm text-muted-foreground">${item.product.price.toFixed(2)}</p>
                  <div className="flex items-center mt-2">
                    <Button variant="outline" size="icon" className="h-6 w-6" onClick={() => updateQuantity(item.product.id, item.quantity - 1)}><span className="sr-only">Decrease quantity</span>-</Button>
                    <span className="w-8 text-center">{item.quantity}</span>
                    <Button variant="outline" size="icon" className="h-6 w-6" onClick={() => updateQuantity(item.product.id, item.quantity + 1)}><span className="sr-only">Increase quantity</span>+</Button>
                  </div>
                </div>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground" onClick={() => removeFromCart(item.product.id)}>
                  <X className="h-4 w-4" />
                  <span className="sr-only">Remove item</span>
                </Button>
              </div>
            ))}
          </div>
          <SheetFooter className="mt-auto pt-4 border-t">
            <div className="w-full">
              <div className="flex justify-between font-bold text-lg mb-4">
                <span>Subtotal</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
              <Button className="w-full bg-primary hover:bg-primary/90">Checkout</Button>
            </div>
          </SheetFooter>
        </div>
      ) : (
        <p className="text-center text-muted-foreground py-8">Your cart is empty.</p>
      )}
    </>
  )
}

const MobileNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Open navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        <nav className="flex flex-col gap-4 mt-8">
          {navLinks.map((link) => (
            <Link
              key={link}
              href={link === 'Home' ? '/' : `/${link.toLowerCase().replace(' ', '-')}`}
              className="text-lg font-medium text-foreground hover:text-primary"
              onClick={() => setIsOpen(false)}
            >
              {link}
            </Link>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
};


export const Header = () => {
  const isMobile = useIsMobile();
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          {isMobile && <MobileNav />}
          <Link href="/" className="flex items-center gap-2 font-bold text-lg font-headline">
            <Gamepad2 className="h-6 w-6 text-primary" />
            <span>Game On</span>
          </Link>
        </div>
        
        <nav className="hidden md:flex gap-6">
          {navLinks.map((link) => (
            <Link
              key={link}
              href={link === 'Home' ? '/' : `/${link.toLowerCase().replace(/\s+/g, '-')}`}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              {link}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          { isMobile ? <CartSheet /> : <CartPopover />}
        </div>
      </div>
    </header>
  );
};

const CartPopover = () => {
  const { itemCount } = useCart();
  return (
     <Popover>
        <PopoverTrigger asChild>
          <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className="h-6 w-6" />
              {itemCount > 0 && (
                <span className="absolute top-0 right-0 flex h-5 w-5 items-center justify-center rounded-full bg-accent text-xs font-bold text-accent-foreground">
                  {itemCount}
                </span>
              )}
              <span className="sr-only">Open cart</span>
            </Button>
        </PopoverTrigger>
        <PopoverContent className="w-96 mr-4 p-0">
          <CartContent />
        </PopoverContent>
      </Popover>
  )
}
