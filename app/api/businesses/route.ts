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
      return NextResponse.json({ success: false, message: 'Unauthorized authentication required' }, { status: 401 });
    }

    // Get user role to determine owner_id vs created_by
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', session.user.id)
      .single();

    const role = profile?.role || 'user';
    const isStaffOrAdmin = ['super_admin', 'marketing_executive'].includes(role);

    const body = await request.json();
    const { name, category, phone, location, description, cover_image } = body;

    if (!name || !category || !phone || !location) {
      return NextResponse.json({ success: false, message: 'Missing required fields' }, { status: 400 });
    }

    // Generate Slug
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + Math.random().toString(36).substring(2, 6);

    // 1. Resolve City ID (defaulting to Kozhikode for now as per frontend)
    let cityId: string;
    const { data: cityData } = await supabase.from('cities').select('id').eq('slug', 'kozhikode').single();
    if (cityData) {
      cityId = cityData.id;
    } else {
      // Fallback: create city if missing
      const { data: newCity } = await supabase.from('cities').insert({ name: 'Kozhikode', slug: 'kozhikode' }).select('id').single();
      cityId = newCity!.id;
    }

    // 2. Resolve Category ID
    let categoryId: string;
    const categorySlug = category.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const { data: categoryData } = await supabase.from('business_categories').select('id').eq('slug', categorySlug).single();
    if (categoryData) {
      categoryId = categoryData.id;
    } else {
      const { data: newCat } = await supabase.from('business_categories').insert({ name: category, slug: categorySlug }).select('id').single();
      categoryId = newCat!.id;
    }

    // Insert Business
    const { data, error } = await supabase
      .from('businesses')
      .insert({
        owner_id: isStaffOrAdmin ? null : session.user.id,
        created_by: session.user.id, // For tracking who created it (e.g. marketing staff)
        category_id: categoryId,
        city_id: cityId,
        name: name,
        slug: slug,
        description: description || name,
        phone: phone,
        short_description: location, // Using location as short_description for display since address column is missing
        verification_status: 'pending',
      })
      .select()
      .single();

    if (error) throw error;

    // Handle Cover Image
    if (cover_image) {
      await supabase.from('business_images').insert({
        business_id: data.id,
        url: cover_image,
        created_by: session.user.id
      });
    }

    return NextResponse.json({ success: true, data }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ success: false, message: err.message || 'Internal server error' }, { status: 400 });
  }
}
