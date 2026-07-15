import React from 'react';
import { AdminSidebar } from '@/components/admin/admin-sidebar';
import { AdminHeader } from '@/components/admin/admin-header';
import { StatsCards } from '@/components/admin/stats-cards';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ShieldCheck, Clock, CheckCircle2, AlertTriangle, Plus, Activity, ArrowUpRight, Zap, Building2, Briefcase } from 'lucide-react';
import Link from 'next/link';

export default function AdminDashboardPage() {
  const mockMetrics = {
    totalUsers: 12480,
    activeBusinesses: 12400,
    publishedNews: 342,
    upcomingEvents: 86,
    activeJobs: 5200,
    marketplaceItems: 1420,
    activeProperties: 840,
    reportedContent: 4,
  };

  const pendingApprovals = [
    { id: '1', module: 'Business', title: 'Malabar Culinary Hub Restaurant', location: 'Mavoor Road', submitted: '2 hours ago', status: 'Pending Verification' },
    { id: '2', module: 'Cyberpark Jobs', title: 'Lead Fullstack Architect at TechSolutions', location: 'Cyberpark Phase 2', submitted: '4 hours ago', status: 'Pending Verification' },
    { id: '3', module: 'Real Estate', title: 'Luxury 3BHK Penthouse Villa', location: 'Kozhikode Beach Front', submitted: '6 hours ago', status: 'Pending Verification' },
  ];

  const recentActivities = [
    { time: '10 mins ago', action: 'New User Registered', detail: 'Faisal K. registered citizen profile in Spatial Ward 14' },
    { time: '25 mins ago', action: 'Listing Verified', detail: 'Paragon Restaurant physical ward check verified by Moderator' },
    { time: '1 hour ago', action: 'Cyberpark Job Posted', detail: 'Senior React Developer posted by Techpark Solutions' },
    { time: '3 hours ago', action: 'System Backup Complete', detail: 'Automated database snapshot generated in 24ms' },
  ];

  return (
    <div className="flex min-h-screen bg-[#F8FAFC] text-[#111827]">
      {/* Persistent SaaS Sidebar */}
      <AdminSidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <AdminHeader breadcrumbs={[{ label: 'Admin', href: '/admin' }, { label: 'Control Center' }]} />

        <main className="flex-1 p-6 lg:p-8 space-y-8 overflow-y-auto">
          {/* Header Banner & Quick Actions */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#111827] tracking-tight font-sans">
                Enterprise Operations Control Center
              </h1>
              <p className="text-sm text-[#6B7280] mt-1 font-normal">
                Real-time governance dashboard for 21 spatial wards across Kozhikode
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Link href="/admin/businesses">
                <button className="h-[40px] px-4 rounded-xl bg-white border border-[#E5E7EB] hover:border-[#2563EB] text-[#111827] text-xs font-bold transition-all shadow-xs flex items-center gap-1.5">
                  <Building2 className="w-4 h-4 text-[#2563EB]" /> Add Outlet
                </button>
              </Link>
              <Link href="/admin/jobs">
                <button className="h-[40px] px-4 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-bold transition-all shadow-md flex items-center gap-1.5">
                  <Plus className="w-4 h-4" /> Post IT Vacancy
                </button>
              </Link>
            </div>
          </div>

          {/* SaaS High-Impact Metrics Grid */}
          <StatsCards metrics={mockMetrics} />

          {/* Two-Column Grid: Approval Queue & Live Activity */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Column: Moderation Approval Queue */}
            <div className="lg:col-span-8 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-extrabold text-[#111827] flex items-center gap-2 font-sans">
                  <Clock className="w-5 h-5 text-amber-500" />
                  <span>Pending Moderation Queue</span>
                </h3>
                <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 text-xs font-bold">
                  {pendingApprovals.length} Actions Required
                </span>
              </div>

              <div className="space-y-3">
                {pendingApprovals.map((item) => (
                  <Card key={item.id} className="p-5 border border-[#E5E7EB] bg-white rounded-2xl shadow-xs flex flex-wrap items-center justify-between gap-4 hover:border-blue-200 transition-all">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-[10px] text-[#2563EB] border-blue-200 bg-blue-50 uppercase font-bold">
                          {item.module}
                        </Badge>
                        <span className="text-xs text-[#6B7280]">• {item.location}</span>
                        <span className="text-xs text-[#9CA3AF]">({item.submitted})</span>
                      </div>
                      <h4 className="text-base font-bold text-[#111827] font-sans">{item.title}</h4>
                    </div>

                    <div className="flex items-center gap-2">
                      <button className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all flex items-center gap-1 shadow-xs">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Approve
                      </button>
                      <button className="px-3.5 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 text-xs font-bold transition-all flex items-center gap-1">
                        <AlertTriangle className="w-3.5 h-3.5" /> Reject
                      </button>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Right Column: Platform Audit Feed & System Health */}
            <div className="lg:col-span-4 space-y-6">
              {/* System Health Status */}
              <Card className="p-6 border border-[#E5E7EB] bg-white rounded-3xl shadow-xs space-y-4">
                <div className="flex items-center justify-between border-b border-[#E5E7EB] pb-3">
                  <h4 className="text-sm font-extrabold text-[#111827] font-sans flex items-center gap-2">
                    <Activity className="w-4 h-4 text-emerald-600" />
                    <span>System Infrastructure</span>
                  </h4>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 text-[10px] font-bold">
                    100% Operational
                  </span>
                </div>

                <div className="space-y-3 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-[#6B7280]">Universal Search Engine Latency</span>
                    <span className="font-bold text-[#111827]">14ms</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#6B7280]">Supabase Auth Session Refresh</span>
                    <span className="font-bold text-emerald-600">Active</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#6B7280]">Active Ward Physical Verification</span>
                    <span className="font-bold text-[#2563EB]">21 / 21 Wards</span>
                  </div>
                </div>
              </Card>

              {/* Real-time Activity Audit Feed */}
              <Card className="p-6 border border-[#E5E7EB] bg-white rounded-3xl shadow-xs space-y-4">
                <div className="flex items-center justify-between border-b border-[#E5E7EB] pb-3">
                  <h4 className="text-sm font-extrabold text-[#111827] font-sans">
                    Live Audit Activity
                  </h4>
                  <Link href="/admin/audit-logs" className="text-xs text-[#2563EB] font-bold hover:underline flex items-center gap-0.5">
                    <span>View All</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

                <div className="space-y-3">
                  {recentActivities.map((act, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs">
                      <div className="w-2 h-2 rounded-full bg-[#2563EB] mt-1.5 shrink-0" />
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-[#111827]">{act.action}</span>
                          <span className="text-[10px] text-[#9CA3AF]">{act.time}</span>
                        </div>
                        <p className="text-[11px] text-[#6B7280] leading-snug">{act.detail}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
