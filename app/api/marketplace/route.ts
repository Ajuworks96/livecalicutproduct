import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { createMarketplaceItemSchema } from '@/lib/validations/marketplace';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const condition = searchParams.get('condition');
  const keyword = searchParams.get('search');

  const supabase = await createClient();
  let query = supabase
    .from('marketplace_items')
    .select('*, marketplace_categories(name, slug), seller_profiles(full_name, phone, avatar)')
    .eq('status', 'active')
    .is('deleted_at', null)
    .order('created_at', { ascending: false });

  if (condition) query = query.eq('condition', condition);
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
    const validated = createMarketplaceItemSchema.parse(body);

    const { data, error } = await supabase
      .from('marketplace_items')
      .insert({
        seller_id: session.user.id,
        category_id: validated.categoryId,
        title: validated.title,
        slug: validated.slug,
        description: validated.description,
        price: validated.price,
        price_type: validated.priceType,
        is_negotiable: validated.isNegotiable,
        condition: validated.condition,
        brand: validated.brand,
        cover_image: validated.coverImage,
        status: 'active',
      })
      .select()
      .single();

    if (error) throw error;
    return NextResponse.json({ data }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}
