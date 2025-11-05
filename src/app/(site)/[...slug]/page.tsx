import { notFound } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const validPages = ["about-us", "gift-registry", "blog", "contact-us", "terms-and-conditions", "become-an-affiliate", "product-index", "category-index"];

export default function StaticPage({ params }: { params: { slug: string[] } }) {
  const slug = params.slug.join('/');

  if (!validPages.includes(slug)) {
    notFound();
  }

  const title = slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

  let content = <p>This is the {title} page. Content will be added here soon.</p>;

  if (slug === 'about-us') {
    content = (
      <div className="space-y-4">
        <p className="text-lg">MegaDealsStore was born with one mission — to make premium products affordable for everyone.</p>
        <p>We bring handpicked, high-quality products from verified suppliers and make them available at unbelievable prices. Our model is built on a few key principles:</p>
        <ul className="list-disc list-inside space-y-2">
          <li><strong>Direct supplier partnership:</strong> We work directly with manufacturers to cut out middlemen, passing the savings on to you.</li>
          <li><strong>Rigorous quality checks:</strong> Every product goes through a thorough quality check before it's listed on our store.</li>
          <li><strong>Unbeatable pricing:</strong> Our pricing is always below ₹599 / ₹999, guaranteed.</li>
        </ul>
        <p className="font-semibold">MegaDealsStore proves that ‘affordable’ can still mean ‘premium quality’.</p>
      </div>
    )
  } else if (slug === 'contact-us') {
    content = (
       <div className="space-y-4">
        <p>Have a question or need help with an order? We're here for you!</p>
        <p>You can reach our support team by emailing us at <a href="mailto:support@megadealsstore.com" className="text-primary hover:underline">support@megadealsstore.com</a>.</p>
        <p>We do our best to respond to all inquiries within 24 hours.</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <Card>
        <CardHeader>
          <CardTitle className="text-4xl font-headline">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="prose dark:prose-invert max-w-none">
            {content}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
