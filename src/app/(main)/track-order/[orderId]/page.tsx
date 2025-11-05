'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { PackageCheck, Truck, Home, Package } from 'lucide-react';
import React from 'react';

const trackingEvents = [
  {
    status: 'Order Confirmed',
    date: new Date(),
    icon: <Package className="h-5 w-5 text-primary" />,
    description: 'Your order has been received and is being processed.',
    isCompleted: true,
  },
  {
    status: 'Shipped',
    date: new Date(Date.now() + 1000 * 60 * 60 * 24 * 1), // 1 day later
    icon: <PackageCheck className="h-5 w-5 text-primary" />,
    description: 'Your package has left our facility.',
    isCompleted: true,
  },
  {
    status: 'Out for Delivery',
    date: new Date(Date.now() + 1000 * 60 * 60 * 24 * 2), // 2 days later
    icon: <Truck className="h-5 w-5 text-primary" />,
    description: 'The package is on its way to your address.',
    isCompleted: false,
  },
  {
    status: 'Delivered',
    date: null,
    icon: <Home className="h-5 w-5" />,
    description: 'The package has been delivered.',
    isCompleted: false,
  },
];

export default function TrackOrderPage({
  params,
}: {
  params: { orderId: string };
}) {
  // In a real app, you would use the orderId to fetch order status.
  // For this demo, we'll use a static array and simulate progress.
  const [currentStatus, setCurrentStatus] = React.useState('Shipped');

  return (
    <div className="container mx-auto px-4 py-12">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-3xl font-headline">Track Your Order</CardTitle>
          <CardDescription>
            Order ID: <span className="font-mono text-primary">{params.orderId}</span>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="font-semibold">Estimated Delivery</p>
              <p className="text-2xl font-bold text-primary">
                {new Date(
                  Date.now() + 1000 * 60 * 60 * 24 * 3
                ).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
              </p>
            </div>
            <div>
              <p className="font-semibold text-right">Current Status</p>
              <Badge variant="secondary" className="text-lg">
                {currentStatus}
              </Badge>
            </div>
          </div>
          <Separator />
          <div className="mt-6 flow-root">
            <ul className="-my-8">
              {trackingEvents.map((event, eventIdx) => (
                <li key={event.status} className="relative pb-8">
                  {eventIdx !== trackingEvents.length - 1 ? (
                    <span
                      className="absolute top-5 left-5 -ml-px h-full w-0.5 bg-border"
                      aria-hidden="true"
                    />
                  ) : null}
                  <div className="relative flex items-start space-x-3">
                    <div className="relative">
                      <span className={`h-10 w-10 rounded-full flex items-center justify-center ring-8 ring-card ${event.isCompleted ? 'bg-primary/20' : 'bg-muted'}`}>
                        {React.cloneElement(event.icon, {
                          className: `h-5 w-5 ${event.isCompleted ? 'text-primary' : 'text-muted-foreground'}`,
                        })}
                      </span>
                    </div>
                    <div className="min-w-0 flex-1 py-1.5">
                      <div className="text-sm font-semibold text-foreground">
                        {event.status}
                      </div>
                       <div className="text-xs text-muted-foreground">
                        {event.date ? event.date.toLocaleString('en-US', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' }) : 'Pending'}
                      </div>
                      <div className="mt-1 text-sm text-muted-foreground">
                        {event.description}
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
