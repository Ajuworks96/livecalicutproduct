import type { SupabaseClient } from '@supabase/supabase-js';

/**
 * AdminService
 *
 * All methods accept a `supabase` client injected from the API route.
 * This ensures:
 * 1. Server-side client is always used (not the browser client).
 * 2. The authenticated user's RLS context is preserved.
 * 3. For privileged operations, the caller passes createAdminClient().
 */
export class AdminService {
  static async logAuditAction(
    supabase: SupabaseClient,
    adminId: string,
    action: string,
    targetEntity: string,
    targetId?: string,
    metadata: Record<string, unknown> = {}
  ) {
    const { error } = await supabase.from('audit_logs').insert({
      admin_id: adminId,
      action,
      target_entity: targetEntity,
      target_id: targetId ?? null,
      metadata,
    });
    if (error) console.error('[AdminService.logAuditAction]', error.message);
  }

  static async getUsers(
    supabase: SupabaseClient,
    filters: { search?: string; role?: string; page?: number; limit?: number } = {}
  ) {
    let query = supabase
      .from('profiles')
      .select('*, roles!role_id(name)')
      .order('created_at', { ascending: false });

    if (filters.search) {
      query = query.or(
        `full_name.ilike.%${filters.search}%,email.ilike.%${filters.search}%`
      );
    }

    const { data, error } = await query;
    if (error) throw error;
    return data ?? [];
  }

  static async updateUserStatus(
    supabase: SupabaseClient,
    adminId: string,
    userId: string,
    action: string,
    roleId?: string,
    reason?: string
  ) {
    const updatePayload: Record<string, unknown> = {};

    if (action === 'assign_role' && roleId) {
      // Upsert into user_roles linking table
      const { error: roleError } = await supabase
        .from('user_roles')
        .upsert({ user_id: userId, role_id: roleId }, { onConflict: 'user_id' });
        
      if (roleError) throw roleError;
      
      await this.logAuditAction(supabase, adminId, `user_${action}`, 'profile', userId, {
        reason,
        roleId,
      });
      return { success: true };
    }

    if (action === 'ban') {
      updatePayload.account_status = 'deactivated';
    } else if (action === 'suspend') {
      updatePayload.account_status = 'suspended';
    } else if (action === 'activate') {
      updatePayload.account_status = 'active';
    } else if (action === 'soft_delete') {
      updatePayload.deleted_at = new Date().toISOString();
    }

    if (Object.keys(updatePayload).length === 0) {
      throw new Error(`Unknown action: ${action}`);
    }

    const { data, error } = await supabase
      .from('profiles')
      .update(updatePayload)
      .eq('id', userId)
      .select()
      .single();

    if (error) throw error;

    await this.logAuditAction(supabase, adminId, `user_${action}`, 'profile', userId, {
      reason,
    });

    return data;
  }

  static async moderateEntity(
    supabase: SupabaseClient,
    adminId: string,
    entityType: string,
    entityId: string,
    action: string,
    rejectionReason?: string
  ) {
    const tableMap: Record<string, string> = {
      business: 'businesses',
      job: 'jobs',
      marketplace: 'marketplace_items',
      property: 'properties',
      news: 'news',
      event: 'events',
    };

    const tableName = tableMap[entityType];
    if (!tableName) throw new Error(`Unknown entity type: ${entityType}`);

    const updatePayload: Record<string, unknown> = {};
    if (action === 'approve') updatePayload.status = 'active';
    if (action === 'reject') {
      updatePayload.status = 'rejected';
      if (rejectionReason) updatePayload.rejection_reason = rejectionReason;
    }
    if (action === 'feature') updatePayload.is_featured = true;
    if (action === 'unfeature') updatePayload.is_featured = false;

    const { data, error } = await supabase
      .from(tableName)
      .update(updatePayload)
      .eq('id', entityId)
      .select()
      .single();

    if (error) throw error;

    await this.logAuditAction(supabase, adminId, `entity_${action}`, entityType, entityId, {
      rejectionReason,
    });

    return data;
  }

  static async getDashboardMetrics(supabase: SupabaseClient) {
    // Fetch counts directly from the actual tables — no hardcoded fallbacks
    const [
      { count: totalUsers },
      { count: activeBusinesses },
      { count: publishedJobs },
      { count: marketplaceListings },
      { count: properties },
    ] = await Promise.all([
      supabase.from('profiles').select('*', { count: 'exact', head: true }).is('deleted_at', null),
      supabase.from('businesses').select('*', { count: 'exact', head: true }).eq('status', 'active').is('deleted_at', null),
      supabase.from('jobs').select('*', { count: 'exact', head: true }).eq('status', 'published').is('deleted_at', null),
      supabase.from('marketplace_items').select('*', { count: 'exact', head: true }).eq('status', 'active').is('deleted_at', null),
      supabase.from('properties').select('*', { count: 'exact', head: true }).eq('status', 'active').is('deleted_at', null),
    ]);

    // Count pending approvals
    const { count: pendingApprovals } = await supabase
      .from('businesses')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'pending');

    return {
      totalUsers: totalUsers ?? 0,
      activeBusinesses: activeBusinesses ?? 0,
      publishedJobs: publishedJobs ?? 0,
      marketplaceListings: marketplaceListings ?? 0,
      properties: properties ?? 0,
      pendingApprovals: pendingApprovals ?? 0,
    };
  }

  static async getAuditLogs(supabase: SupabaseClient) {
    const { data, error } = await supabase
      .from('audit_logs')
      .select('*, profiles(full_name, email)')
      .order('created_at', { ascending: false })
      .limit(100);

    if (error) {
      console.error('[AdminService.getAuditLogs]', error.message);
      return [];
    }
    return data ?? [];
  }
}
