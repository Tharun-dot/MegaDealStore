import { notFound } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const validPages = ["about-us", "gift-registry", "blog", "contact-us", "terms-and-conditions", "become-an-affiliate", "product-index", "category-index"];

export default function StaticPage({ params }: { params: { slug: string[] } }) {
  const slug = params.slug.join('/');

  if (!validPages.includes(slug)) {
    notFound();
  }

  const title = slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

  return (
    <div className="container mx-auto px-4 py-12">
      <Card>
        <CardHeader>
          <CardTitle className="text-4xl font-headline">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="prose dark:prose-invert max-w-none">
            <p>This is the {title} page. Content will be added here soon.</p>
            <p>In a real application, you might fetch this content from a CMS based on the slug "{slug}".</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
