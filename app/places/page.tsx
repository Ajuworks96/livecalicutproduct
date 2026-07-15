import { PageHeader } from '@/components/shared/page-header';
import { PlaceCard } from '@/components/explore/place-card';
import { ResponsiveGrid } from '@/components/layout/responsive-grid';
import { Compass } from 'lucide-react';

export default function PlacesCatalogPage() {
  const places = [
    {
      title: 'Kozhikode Beach & Historical Freedom Square',
      slug: 'kozhikode-beach-freedom-square',
      category: 'Beaches & Waterfronts',
      location: 'Beach Road, Kozhikode',
      rating: 4.8,
    },
    {
      title: 'SM Street (Sweetmeat Street Heritage Bazaar)',
      slug: 'sm-street-heritage-bazaar',
      category: 'SM Street & Shopping',
      location: 'Palayam, Kozhikode',
      rating: 4.9,
    },
    {
      title: 'Mananchira Square & Historical Palace Gardens',
      slug: 'mananchira-square-palace-gardens',
      category: 'Historical Sites & Forts',
      location: 'Town Hall Junction, Kozhikode',
      rating: 4.7,
    },
  ];

  return (
    <div className="space-y-8 py-4">
      <PageHeader
        title="Places to Visit in Kozhikode"
        description="Historical heritage sites, pristine beach piers, SM Street shopping markets & nature spots."
        icon={<Compass className="w-6 h-6" />}
        breadcrumbs={[
          { label: 'Explore', href: '/explore' },
          { label: 'Places to Visit' },
        ]}
      />

      <ResponsiveGrid cols={3}>
        {places.map((p) => (
          <PlaceCard
            key={p.slug}
            title={p.title}
            slug={p.slug}
            category={p.category}
            location={p.location}
            rating={p.rating}
          />
        ))}
      </ResponsiveGrid>
    </div>
  );
}
