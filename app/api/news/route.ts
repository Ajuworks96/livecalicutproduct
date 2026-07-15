import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { newsSchema } from '@/lib/validations/feed';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const categorySlug = searchParams.get('category');

  const supabase = await createClient();
  let query = supabase
    .from('news')
    .select('*, news_categories(name, slug)')
    .eq('status', 'published')
    .is('deleted_at', null)
    .order('published_at', { ascending: false });

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
    const validated = newsSchema.parse(body);

    const { data, error } = await supabase
      .from('news')
      .insert({
        title: validated.title,
        slug: validated.slug,
        summary: validated.summary,
        content: validated.content,
        category_id: validated.categoryId,
        author: validated.author,
        featured_image: validated.featuredImage,
        seo_title: validated.seoTitle,
        seo_description: validated.seoDescription,
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
