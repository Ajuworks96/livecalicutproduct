import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');

  const supabase = await createClient();
  let query = supabase
    .from('places')
    .select('*, place_categories(name, slug)')
    .eq('status', 'active')
    .is('deleted_at', null)
    .order('rating_avg', { ascending: false });

  const { data, error } = await query;
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ data });
}
