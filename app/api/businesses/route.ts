import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { createBusinessSchema } from '@/lib/validations/business';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const categorySlug = searchParams.get('category');
  const keyword = searchParams.get('search');
  const isFeatured = searchParams.get('featured') === 'true';

  const supabase = await createClient();
  let query = supabase
    .from('businesses')
    .select('*, business_categories(name, slug), areas(name, slug)')
    .is('deleted_at', null)
    .eq('status', 'active');

  if (isFeatured) query = query.eq('is_featured', true);
  if (keyword) query = query.ilike('name', `%${keyword}%`);

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
      return NextResponse.json({ error: 'Unauthorized authentication required' }, { status: 401 });
    }

    const body = await request.json();
    const validated = createBusinessSchema.parse(body);

    const { data, error } = await supabase
      .from('businesses')
      .insert({
        owner_id: session.user.id,
        category_id: validated.categoryId,
        name: validated.name,
        slug: validated.slug,
        description: validated.description,
        short_description: validated.shortDescription,
        phone: validated.phone,
        whatsapp: validated.whatsapp,
        email: validated.email,
        website: validated.website,
        google_maps_link: validated.googleMapsLink,
        verification_status: 'pending',
      })
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({ data }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Internal server error' }, { status: 400 });
  }
}
