import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { createJobSchema } from '@/lib/validations/job';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const employmentType = searchParams.get('type');
  const isUrgent = searchParams.get('urgent') === 'true';

  const supabase = await createClient();
  let query = supabase
    .from('jobs')
    .select('*, companies(name, slug, logo), job_categories(name, slug)')
    .eq('status', 'published')
    .is('deleted_at', null)
    .order('created_at', { ascending: false });

  if (employmentType) query = query.eq('employment_type', employmentType);
  if (isUrgent) query = query.eq('is_urgent', true);

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
    const validated = createJobSchema.parse(body);

    const { data, error } = await supabase
      .from('jobs')
      .insert({
        company_id: validated.companyId,
        category_id: validated.categoryId,
        title: validated.title,
        slug: validated.slug,
        description: validated.description,
        responsibilities: validated.responsibilities,
        requirements: validated.requirements,
        experience: validated.experience,
        salary: validated.salary,
        salary_type: validated.salaryType,
        employment_type: validated.employmentType,
        openings_count: validated.openingsCount,
        is_urgent: validated.isUrgent,
        is_featured: validated.isFeatured,
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
