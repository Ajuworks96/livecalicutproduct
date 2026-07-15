import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { eventSchema } from '@/lib/validations/feed';

export async function GET(request: Request) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('events')
    .select('*, event_categories(name, slug), organizers(name, slug, avatar)')
    .eq('status', 'published')
    .is('deleted_at', null)
    .order('start_date', { ascending: true });

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
    const validated = eventSchema.parse(body);

    const { data, error } = await supabase
      .from('events')
      .insert({
        title: validated.title,
        slug: validated.slug,
        description: validated.description,
        category_id: validated.categoryId,
        organizer_id: validated.organizerId,
        venue: validated.venue,
        start_date: validated.startDate,
        end_date: validated.endDate,
        registration_link: validated.registrationLink,
        is_ticket_required: validated.isTicketRequired,
        banner: validated.banner,
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
