"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Facebook, Instagram, Zap, Twitter } from "lucide-react";
import Link from "next/link";
import React from "react";

const footerLinks = ["Blog", "Terms and Conditions", "Become an Affiliate", "Product Index", "Category Index"];
const socialIcons = [
  { icon: <Facebook className="h-5 w-5" />, href: "#", name: "Facebook" },
  { icon: <Twitter className="h-5 w-5" />, href: "#", name: "Twitter" },
  { icon: <Instagram className="h-5 w-5" />, href: "#", name: "Instagram" },
];

function NewsletterForm() {
  const { toast } = useToast();
  const [email, setEmail] = React.useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailRegex.test(email)) {
      toast({
        title: "Subscribed!",
        description: "You subscribed successfully.",
      });
      setEmail("");
    } else {
      toast({
        title: "Invalid Email",
        description: "The email you entered isn’t valid.",
        variant: "destructive",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex w-full max-w-md items-center space-x-2">
      <Input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="flex-1 bg-background/80 border-primary/20"
        aria-label="Email for newsletter"
      />
      <Button type="submit" variant="default" className="bg-primary text-primary-foreground">Subscribe</Button>
    </form>
  );
}

export const Footer = () => {
  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          <div className="md:col-span-2">
            <h3 className="text-xl font-bold font-headline">Get the latest news, deals & special offers</h3>
            <p className="mt-2 text-muted-foreground">Sign up for our newsletter and be the first to know.</p>
          </div>
          <div className="md:col-span-1">
            <NewsletterForm />
          </div>
        </div>
        
        <div className="mt-12 border-t border-border pt-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-start">
              <Link href="/" className="flex items-center gap-2 font-bold text-xl font-headline mb-4">
                <Zap className="h-7 w-7 text-primary" />
                <span>Tech Pulse</span>
              </Link>
              <div className="flex space-x-4">
                {socialIcons.map((social) => (
                  <Link key={social.name} href={social.href} className="text-muted-foreground hover:text-primary transition-colors">
                    <span className="sr-only">{social.name}</span>
                    {social.icon}
                  </Link>
                ))}
              </div>
            </div>
            
            <div className="md:col-span-2 grid grid-cols-2 sm:grid-cols-3 gap-4">
              <div className="space-y-2">
                <h4 className="font-semibold">Shop</h4>
                <ul className="space-y-1">
                  <li><Link href="/accessories" className="text-sm text-muted-foreground hover:text-primary">Accessories</Link></li>
                </ul>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold">Information</h4>
                 <ul className="space-y-1">
                  {footerLinks.map(link => (
                     <li key={link}>
                        <Link href={`/${link.toLowerCase().replace(/\s+/g, '-')}`} className="text-sm text-muted-foreground hover:text-primary">
                          {link}
                        </Link>
                      </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-border pt-8 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Tech Pulse. All Rights Reserved</p>
        </div>
      </div>
    </footer>
  );
};
