'use client';

import { useCart } from '@/hooks/use-cart';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
  CardDescription,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Image from 'next/image';
import { X, QrCode } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import React from 'react';

const OrderSummary = () => {
  const { cartItems, cartTotal, updateQuantity, removeFromCart } = useCart();
  return (
    <Card>
      <CardHeader>
        <CardTitle>Order Summary</CardTitle>
        <CardDescription>
          Review the items in your cart before purchase.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {cartItems.length > 0 ? (
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div key={item.product.id} className="flex items-start gap-4">
                <Image
                  src={item.product.image.imageUrl}
                  alt={item.product.title}
                  width={64}
                  height={64}
                  className="rounded-md object-cover bg-muted"
                />
                <div className="flex-1">
                  <h3 className="font-semibold">{item.product.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    ${item.product.price.toFixed(2)}
                  </p>
                  <div className="flex items-center mt-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-6 w-6"
                      onClick={() =>
                        updateQuantity(item.product.id, item.quantity - 1)
                      }
                    >
                      <span className="sr-only">Decrease quantity</span>-
                    </Button>
                    <span className="w-8 text-center">{item.quantity}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-6 w-6"
                      onClick={() =>
                        updateQuantity(item.product.id, item.quantity + 1)
                      }
                    >
                      <span className="sr-only">Increase quantity</span>+
                    </Button>
                  </div>
                </div>
                <div className="text-right font-medium">
                  ${(item.product.price * item.quantity).toFixed(2)}
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-muted-foreground"
                  onClick={() => removeFromCart(item.product.id)}
                >
                  <X className="h-4 w-4" />
                  <span className="sr-only">Remove item</span>
                </Button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-muted-foreground">
            Your cart is empty.
          </p>
        )}
      </CardContent>
      {cartItems.length > 0 && (
        <>
          <Separator className="my-4" />
          <CardFooter className="flex flex-col gap-2">
            <div className="flex justify-between w-full">
              <span>Subtotal</span>
              <span>${cartTotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between w-full">
              <span>Shipping</span>
              <span>Free</span>
            </div>
            <Separator className="my-2" />
            <div className="flex justify-between w-full font-bold text-lg">
              <span>Total</span>
              <span>${cartTotal.toFixed(2)}</span>
            </div>
          </CardFooter>
        </>
      )}
    </Card>
  );
};

const checkoutSchema = z.object({
  email: z.string().email({ message: 'Invalid email address.' }),
  firstName: z.string().min(1, { message: 'First name is required.' }),
  lastName: z.string().min(1, { message: 'Last name is required.' }),
  address: z.string().min(1, { message: 'Address is required.' }),
  city: z.string().min(1, { message: 'City is required.' }),
  zip: z.string().min(5, { message: 'ZIP code must be at least 5 digits.' }),
  paymentMethod: z.enum(['card', 'upi']),
  cardNumber: z.string().optional(),
  expiryDate: z.string().optional(),
  cvc: z.string().optional(),
  upiId: z.string().optional(),
}).refine(data => {
    if (data.paymentMethod === 'card') {
        return data.cardNumber && data.cardNumber.length >= 16 && data.expiryDate && data.expiryDate.match(/^(0[1-9]|1[0-2])\/?([0-9]{2})$/) && data.cvc && data.cvc.length === 3;
    }
    return true;
}, {
    message: "Please enter valid card details.",
    path: ["cardNumber"],
}).refine(data => {
    if (data.paymentMethod === 'upi') {
        return data.upiId && data.upiId.includes('@');
    }
    return true;
}, {
    message: "Please enter a valid UPI ID.",
    path: ["upiId"],
});

type CheckoutFormValues = z.infer<typeof checkoutSchema>;

const CheckoutForm = ({ form, setFormValid }: { form: any, setFormValid: (isValid: boolean) => void }) => {
  const paymentMethod = form.watch('paymentMethod');
  
  React.useEffect(() => {
    const subscription = form.watch(() => {
      setFormValid(form.formState.isValid);
    });
    return () => subscription.unsubscribe();
  }, [form, setFormValid]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Customer Information</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form>
            <Accordion type="single" collapsible className="w-full" defaultValue="shipping">
              <AccordionItem value="shipping">
                <AccordionTrigger className="text-lg font-semibold">Shipping Address</AccordionTrigger>
                <AccordionContent>
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem className="col-span-2">
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input placeholder="you@example.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>First Name</FormLabel>
                          <FormControl>
                            <Input placeholder="John" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="lastName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Last Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Doe" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="address"
                      render={({ field }) => (
                        <FormItem className="col-span-2">
                          <FormLabel>Address</FormLabel>
                          <FormControl>
                            <Input placeholder="123 Gaming Lane" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="city"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>City</FormLabel>
                          <FormControl>
                            <Input placeholder="New York" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="zip"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>ZIP Code</FormLabel>
                          <FormControl>
                            <Input placeholder="10001" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="payment">
                <AccordionTrigger className="text-lg font-semibold">Payment Details</AccordionTrigger>
                <AccordionContent>
                  <FormField
                    control={form.control}
                    name="paymentMethod"
                    render={({ field }) => (
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex gap-4 mt-4"
                      >
                        <FormItem className="flex items-center space-x-2">
                          <FormControl>
                            <RadioGroupItem value="card" id="card" />
                          </FormControl>
                          <FormLabel htmlFor="card">Credit Card</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-2">
                          <FormControl>
                            <RadioGroupItem value="upi" id="upi" />
                          </FormControl>
                          <FormLabel htmlFor="upi">UPI</FormLabel>
                        </FormItem>
                      </RadioGroup>
                    )}
                  />
                  {paymentMethod === 'card' && (
                    <div className="space-y-4 mt-4">
                      <FormField
                        control={form.control}
                        name="cardNumber"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Card Number</FormLabel>
                            <FormControl>
                              <Input placeholder="**** **** **** 1234" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <div className="grid grid-cols-3 gap-4">
                        <FormField
                          control={form.control}
                          name="expiryDate"
                          render={({ field }) => (
                            <FormItem className="col-span-2">
                              <FormLabel>Expiry Date</FormLabel>
                              <FormControl>
                                <Input placeholder="MM/YY" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="cvc"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>CVC</FormLabel>
                              <FormControl>
                                <Input placeholder="123" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                  )}
                  {paymentMethod === 'upi' && (
                    <div className="space-y-4 mt-4">
                      <FormField
                        control={form.control}
                        name="upiId"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>UPI ID</FormLabel>
                            <FormControl>
                              <Input placeholder="yourname@bank" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <div className="flex flex-col items-center justify-center p-4 border-2 border-dashed rounded-lg">
                        <QrCode className="w-24 h-24 text-muted-foreground" />
                        <p className="mt-2 text-sm text-muted-foreground">Scan QR to pay</p>
                      </div>
                    </div>
                  )}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default function CheckoutPage() {
  const { toast } = useToast();
  const { cartItems } = useCart();
  const [isFormValid, setFormValid] = React.useState(false);

  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    mode: 'onChange',
    defaultValues: {
      email: '',
      firstName: '',
      lastName: '',
      address: '',
      city: '',
      zip: '',
      paymentMethod: 'card',
    },
  });

  const handlePlaceOrder = () => {
    // In a real app, this would process the payment and create an order.
    toast({
      title: 'Order Placed!',
      description: 'Thank you for your purchase. A confirmation has been sent to your email.',
    });
    // Maybe clear cart here or redirect to a thank you page
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold font-headline tracking-tight">
          Checkout
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          Complete your purchase by providing your details below.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12">
        <div className="space-y-8">
          <CheckoutForm form={form} setFormValid={setFormValid} />
        </div>
        <div className="space-y-8">
          <OrderSummary />
          <Button
            size="lg"
            className="w-full"
            onClick={form.handleSubmit(handlePlaceOrder)}
            disabled={cartItems.length === 0 || !isFormValid}
          >
            Place Order
          </Button>
        </div>
      </div>
    </div>
  );
}
