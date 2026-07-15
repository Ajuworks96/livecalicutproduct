import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { createPropertySchema } from '@/lib/validations/property';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const listingType = searchParams.get('type');
  const keyword = searchParams.get('search');

  const supabase = await createClient();
  let query = supabase
    .from('properties')
    .select('*, property_categories(name, slug), property_agencies(name, logo)')
    .eq('status', 'published')
    .is('deleted_at', null)
    .order('created_at', { ascending: false });

  if (listingType) query = query.eq('listing_type', listingType);
  if (keyword) query = query.ilike('title', `%${keyword}%`);

  const { data, error } = await query;
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ data });
}

export async function POST(request: Request) {
  try {
    const supabase = await createClient();
    const { data: { session } } = await supabase.auth.getSession();

    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const validated = createPropertySchema.parse(body);

    const { data, error } = await supabase
      .from('properties')
      .insert({
        owner_id: session.user.id,
        category_id: validated.categoryId,
        listing_type: validated.listingType,
        title: validated.title,
        slug: validated.slug,
        description: validated.description,
        price: validated.price,
        is_negotiable: validated.isNegotiable,
        bedrooms: validated.bedrooms,
        bathrooms: validated.bathrooms,
        area_sqft: validated.areaSqft,
        built_up_sqft: validated.builtUpSqft,
        parking_spaces: validated.parkingSpaces,
        furnished_status: validated.furnishedStatus,
        address: validated.address,
        cover_image: validated.coverImage,
        status: 'published',
      })
      .select()
      .single();

    if (error) throw error;
    return NextResponse.json({ data }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}
