import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';

export async function GET(request: NextRequest) {
  try {
    const supabaseAnon = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return request.cookies.getAll();
          },
          setAll(cookiesToSet) {
            // Read-only API route
          },
        },
      }
    );

    const { data: { user }, error: authError } = await supabaseAnon.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Use Service Role to bypass RLS and fetch the complete profile with role name
    const supabaseAdmin = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      {
        cookies: {
          getAll() {
            return [];
          },
          setAll() {},
        },
      }
    );

    const { data: profile, error: profileErr } = await supabaseAdmin
      .from('profiles')
      .select('*, user_roles(roles(name))')
      .eq('id', user.id)
      .single();

    if (profileErr && profileErr.code !== 'PGRST116') {
      console.error('[API /auth/me] Profile fetch error:', profileErr);
      return NextResponse.json({ error: 'Failed to fetch profile' }, { status: 500 });
    }

    // Format response
    const rawRoles = profile?.user_roles?.[0]?.roles;
    const roleName = (Array.isArray(rawRoles) ? rawRoles[0]?.name : rawRoles?.name) || 'User';

    return NextResponse.json({
      user,
      profile,
      roleName
    });
  } catch (err: any) {
    console.error('[API /auth/me] Unexpected error:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
